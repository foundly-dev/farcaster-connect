"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useConnectStore } from "./connect.store";
import { walletKit } from "./connect.service";
import { getSdkError } from "@walletconnect/utils";
import type { SessionTypes } from "@walletconnect/types";

export const ConnectInfo = () => {
  const { status, setStatus } = useConnectStore();
  const [session, setSession] = useState<SessionTypes.Struct | null>(null);

  useEffect(() => {
    const loadSession = async () => {
      if (status === "connected") {
        try {
          const kit = await walletKit();
          const sessions = kit.getActiveSessions();
          const sessionList = Object.values(sessions);
          if (sessionList.length > 0) {
            setSession(sessionList[0]);
          }
        } catch (error) {
          console.error("Failed to load session:", error);
        }
      }
    };

    loadSession();
  }, [status]);

  const disconnect = async () => {
    if (!session) return;

    try {
      const kit = await walletKit();
      await kit.disconnectSession({
        topic: session.topic,
        reason: getSdkError("USER_DISCONNECTED"),
      });
      setStatus("idle");
      setSession(null);
    } catch (error) {
      console.error("Failed to disconnect:", error);
    }
  };

  if (status !== "connected" || !session) {
    return null;
  }

  const { peer } = session;

  return (
    <Card className="w-full ">
      <CardHeader>
        <CardTitle className="text-green-600 dark:text-green-400">
          Connected
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-3">
        {peer.metadata.icons && peer.metadata.icons.length > 0 && (
          <img
            src={peer.metadata.icons[0]}
            alt={peer.metadata.name}
            className="w-16 h-16 rounded-full"
          />
        )}

        <div className="text-center">
          <p className="font-semibold text-lg">{peer.metadata.name}</p>
          {peer.metadata.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {peer.metadata.description}
            </p>
          )}
          <a
            href={peer.metadata.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline break-all mt-2 block"
          >
            {peer.metadata.url}
          </a>
        </div>
      </CardContent>

      <CardFooter>
        <Button variant="destructive" onClick={disconnect} className="w-full">
          Disconnect
        </Button>
      </CardFooter>
    </Card>
  );
};
