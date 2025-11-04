"use client";

import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { InfoIcon, X } from "lucide-react";

export const Header = () => {
  const [showInfo, setShowInfo] = useState(true);

  const handleClose = () => {
    setShowInfo(false);
  };

  return (
    <div className="w-full flex flex-col items-center gap-4">
      {/* <h1 className="text-4xl font-bold text-center">Farcaster Connect</h1> */}

      {showInfo && (
        <Alert className="w-full relative">
          <InfoIcon />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
          </Button>
          <AlertTitle className="font-extrabold">How to Connect</AlertTitle>
          <AlertDescription>
            <h3 className="font-bold text-foreground">On Desktop</h3>
            <ol className="list-decimal list-inside space-y-1">
              <li>
                Open a dApp (like OpenSea) on your desktop{" "}
                <span className="text-muted-foreground">
                  (recommended in incognito mode)
                </span>
                <li>Select “Wallet Connect” as sign in option</li>
              </li>
            </ol>

            <h3 className="font-bold text-foreground">In Mini App</h3>
            <ol className="list-decimal list-inside space-y-1">
              <li>Click &quot;Connect to App&quot;</li>
              <li>Scan QR Code</li>
              <li>Sign &amp; Transact</li>
            </ol>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};
