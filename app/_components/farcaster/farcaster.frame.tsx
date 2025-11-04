"use client";

import { sdk } from "@farcaster/miniapp-sdk";
import { useEffect, useState } from "react";

export const FarcasterFrame = () => {
  const [isFrameSetup, setIsFrameSetup] = useState(false);

  useEffect(() => {
    if (!isFrameSetup) {
      void sdk.actions.ready({ disableNativeGestures: false }).then(() => {
        setIsFrameSetup(true);
      });
      void sdk.wallet.ethProvider;
    }
  }, [isFrameSetup]);

  return null;
};
