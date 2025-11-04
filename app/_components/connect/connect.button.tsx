"use client";

import { Button } from "@/components/ui/button";
import { useConnectStore } from "./connect.store";

export const ConnectButton = () => {
  const { status, isReady, setStatus } = useConnectStore();

  const onConnect = () => {
    setStatus("scanning");
  };

  if (!isReady || status === "connected") {
    return null;
  }

  return (
    <Button
      onClick={onConnect}
      disabled={status === "scanning" || status === "connecting"}
      size="lg"
    >
      {status === "scanning"
        ? "Scanning..."
        : status === "connecting"
        ? "Connecting..."
        : "Connect to App"}
    </Button>
  );
};
