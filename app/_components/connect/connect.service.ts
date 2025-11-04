import { WalletKit } from "@reown/walletkit";
import { Core } from "@walletconnect/core";
import { buildApprovedNamespaces, getSdkError } from "@walletconnect/utils";
import { sdk } from "@farcaster/miniapp-sdk";
import { useConnectStore } from "./connect.store";
import { useTransactionsStore } from "../transactions/transactions.store";
import { SUPPORTED_CHAINS } from "../chain/chain.config";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;

export const core = new Core({
  projectId,
});

let _walletKit: Awaited<ReturnType<typeof WalletKit.init>>;
let _isListenersSetup = false;

export const walletKit = async () => {
  if (_walletKit) return _walletKit;

  _walletKit = await WalletKit.init({
    core,
    metadata: {
      name: "Farcaster Connect",
      description: "Farcaster Connect",
      url: window.location.href,
      icons: [],
    },
  });

  await setupListeners(_walletKit);

  return _walletKit;
};

export const connect = async () => {
  const kit = await walletKit();
  const { connectUri, setStatus } = useConnectStore.getState();

  if (!connectUri) {
    throw new Error("No connect URI");
  }

  try {
    await kit.pair({ uri: connectUri });
    // Status will be set to "connected" by the session_proposal listener
  } catch (error) {
    console.error("Failed to connect:", error);
    setStatus("idle");
    throw error;
  }
};

const setupListeners = async (
  kit: Awaited<ReturnType<typeof WalletKit.init>>
) => {
  if (_isListenersSetup) return;
  _isListenersSetup = true;

  const provider = sdk.wallet.ethProvider;
  if (!provider) {
    throw new Error("Farcaster provider not found");
  }

  const accounts = await provider.request({ method: "eth_accounts" });
  if (!accounts || accounts.length === 0) {
    throw new Error("Could not get Farcaster account");
  }
  const address = accounts[0];

  // Listen for session proposal from dApp
  kit.on("session_proposal", async (proposal) => {
    const { id, params } = proposal;

    try {
      const supportedChainIds = SUPPORTED_CHAINS.map((chain) => chain.id);
      const accounts = supportedChainIds.map(
        (chainId) => `${chainId}:${address}`
      );

      const approvedNamespaces = buildApprovedNamespaces({
        proposal: params,
        supportedNamespaces: {
          eip155: {
            chains: supportedChainIds,
            methods: [
              "personal_sign",
              "eth_signTransaction",
              "eth_sendTransaction",
              "eth_signTypedData_v4",
            ],
            events: ["chainChanged", "accountsChanged"],
            accounts,
          },
        },
      });

      await kit.approveSession({
        id,
        namespaces: approvedNamespaces,
      });

      useConnectStore.getState().setStatus("connected");
    } catch (error) {
      console.error("Failed to approve session:", error);
      await kit.rejectSession({
        id,
        reason: getSdkError("USER_REJECTED_METHODS"),
      });
      useConnectStore.getState().setStatus("idle");
    }
  });

  // Listen for session requests (signing, transactions, etc)
  kit.on("session_request", async (requestEvent) => {
    const { id, topic, params } = requestEvent;
    const { request } = params;

    // Add transaction to store
    useTransactionsStore.getState().addTransaction({
      id: String(id),
      topic,
      method: request.method,
      params: request.params,
    });

    try {
      // Proxy the request directly to the Farcaster wallet
      const result = await provider.request(request);

      // Update transaction status
      useTransactionsStore
        .getState()
        .updateTransactionStatus(String(id), "approved", result);

      await kit.respondSessionRequest({
        topic,
        response: {
          id,
          jsonrpc: "2.0",
          result,
        },
      });
    } catch (error: any) {
      // Update transaction status
      useTransactionsStore
        .getState()
        .updateTransactionStatus(
          String(id),
          "rejected",
          undefined,
          error.message || "User rejected"
        );

      await kit.respondSessionRequest({
        topic,
        response: {
          id,
          jsonrpc: "2.0",
          error: { code: 5000, message: error.message || "User rejected." },
        },
      });
    }
  });

  // Listen for disconnect
  kit.on("session_delete", () => {
    useConnectStore.getState().setStatus("disconnected");
  });
};
