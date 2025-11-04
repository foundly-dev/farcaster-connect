"use client";

import { useEffect, useState } from "react";
import { sdk } from "@farcaster/miniapp-sdk";
import { Card, CardContent } from "@/components/ui/card";
import { useConnectStore } from "../connect/connect.store";
import { ChainSelector } from "../chain/chain.selector";

export const FarcasterWallet = () => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [userContext, setUserContext] = useState<{
    username?: string;
    displayName?: string;
    pfpUrl?: string;
  } | null>(null);
  const setReady = useConnectStore((state) => state.setReady);

  useEffect(() => {
    const loadWalletAndContext = async () => {
      try {
        // Get Ethereum provider
        const provider = sdk.wallet.ethProvider;
        if (provider) {
          const accounts = await provider.request({ method: "eth_accounts" });
          if (accounts && accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        }

        // Get user context
        const context = await sdk.context;
        if (context.user) {
          setUserContext({
            username: context.user.username,
            displayName: context.user.displayName,
            pfpUrl: context.user.pfpUrl,
          });
        }
      } catch (error) {
        console.error("Failed to load wallet and context:", error);
      } finally {
        setReady(true);
      }
    };

    loadWalletAndContext();
  }, [setReady]);

  if (!walletAddress && !userContext) {
    return null;
  }

  return (
    <div className="flex items-center justify-between gap-3 w-full">
      <div className="flex items-center gap-3">
        {userContext?.pfpUrl && (
          <img
            src={userContext.pfpUrl}
            alt={userContext.username || "User"}
            className="size-12 rounded-full"
          />
        )}
        <div className="flex flex-col">
          {userContext?.displayName && (
            <p className="font-semibold text-sm">{userContext.displayName}</p>
          )}
          {userContext?.username && (
            <p className="text-xs text-muted-foreground">
              @{userContext.username}
            </p>
          )}
          {walletAddress && (
            <p className="text-xs text-muted-foreground font-mono">
              {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
            </p>
          )}
        </div>
      </div>
      <ChainSelector />
    </div>
  );
};
