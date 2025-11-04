import { WalletKit } from "@reown/walletkit";
import { Core } from "@walletconnect/core";
import { buildApprovedNamespaces, getSdkError } from "@walletconnect/utils";
import { sdk } from "@farcaster/miniapp-sdk";
import { toast } from "sonner";
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
    toast.error("No connection URI provided");
    throw new Error("No connect URI");
  }

  return toast.promise(kit.pair({ uri: connectUri }), {
    loading: "Connecting to dApp...",
    error: () => {
      setStatus("idle");
      return "Failed to connect to dApp";
    },
  });
};

export const getSessions = async () => {
  const kit = await walletKit();
  return kit.getActiveSessions();
};

export const disconnectSession = async (topic: string) => {
  const kit = await walletKit();
  try {
    await kit.disconnectSession({
      topic,
      reason: getSdkError("USER_DISCONNECTED"),
    });
    toast.success("Session disconnected");
  } catch (error) {
    console.error("Failed to disconnect session:", error);
    toast.error("Failed to disconnect session");
    throw error;
  }
};

export const switchChain = async (chainId: string) => {
  const provider = sdk.wallet.ethProvider;
  if (!provider) {
    toast.error("Farcaster provider not found");
    throw new Error("Farcaster provider not found");
  }

  try {
    // Get the numeric chain ID from the CAIP-2 format (eip155:1 -> 1)
    const numericChainId = parseInt(chainId.split(":")[1]);
    const hexChainId = `0x${numericChainId.toString(16)}`;

    // Request chain switch from the Farcaster wallet
    // This will automatically emit the chainChanged event to all connected dApps
    await provider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: hexChainId }],
    });

    toast.success("Chain switched");
    useConnectStore.getState().setCurrentChain(chainId);
  } catch (error: any) {
    console.error("Failed to switch chain:", error);

    // If the chain is not added to the wallet, try adding it
    if (error.code === 4902) {
      toast.error("Chain not available in Farcaster wallet");
    } else {
      toast.error("Failed to switch chain");
    }
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

      const dAppName = params.proposer.metadata.name || "dApp";
      toast.success(`Connected to ${dAppName}`);
      useConnectStore.getState().setStatus("connected");
    } catch (error) {
      console.error("Failed to approve session:", error);
      toast.error("Failed to approve session");
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

    // Show toast for new transaction request
    const methodLabel =
      request.method === "eth_sendTransaction"
        ? "transaction"
        : request.method === "personal_sign"
        ? "signature"
        : "request";
    toast.info(`New ${methodLabel} request`);

    try {
      // Proxy the request directly to the Farcaster wallet
      const result = await provider.request(request);

      // Update transaction status
      useTransactionsStore
        .getState()
        .updateTransactionStatus(String(id), "approved", result);

      toast.success(
        `${methodLabel.charAt(0).toUpperCase() + methodLabel.slice(1)} approved`
      );

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

      toast.error(
        `${methodLabel.charAt(0).toUpperCase() + methodLabel.slice(1)} rejected`
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
    toast.info("Session disconnected");
    useConnectStore.getState().setStatus("disconnected");
  });
};
