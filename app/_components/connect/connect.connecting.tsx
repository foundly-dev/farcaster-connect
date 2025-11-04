"use client";

import { useEffect } from "react";
import { useConnectStore } from "./connect.store";
import { Button } from "@/components/ui/button";
import { connect } from "./connect.service";

export const ConnectConnecting = () => {
  const { status, connectUri, setStatus } = useConnectStore();

  useEffect(() => {
    if (status === "connecting") {
      connect().catch((error) => {
        console.error("Connection failed:", error);
        setStatus("idle");
      });
    }
  }, [status, setStatus]);

  if (status !== "connecting") {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95">
      <div className="flex flex-col items-center gap-4 w-full max-w-md px-4">
        <h2 className="text-xl font-semibold text-white">Connecting...</h2>
        <div className="w-full p-4 bg-zinc-900 rounded-lg">
          <p className="text-xs text-zinc-400 break-all font-mono">{connectUri}</p>
        </div>
        <Button variant="outline" onClick={() => setStatus("idle")}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
