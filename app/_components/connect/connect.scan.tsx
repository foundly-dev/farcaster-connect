"use client";

import { useEffect, useRef } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { sdk } from "@farcaster/miniapp-sdk";
import { useConnectStore } from "./connect.store";
import { Button } from "@/components/ui/button";

export const ConnectScan = () => {
  const { status, setConnectUri, setStatus } = useConnectStore();
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const isScanning = useRef(false);

  useEffect(() => {
    if (status !== "scanning") {
      // Stop scanning if status changes away from scanning
      if (scannerRef.current && isScanning.current) {
        scannerRef.current.stop().catch(console.error);
        isScanning.current = false;
      }
      return;
    }

    const startScanning = async () => {
      try {
        // Request camera access via Farcaster SDK
        await sdk.actions.requestCameraAndMicrophoneAccess();

        // Initialize QR scanner
        const scanner = new Html5Qrcode("qr-reader");
        scannerRef.current = scanner;

        // Start scanning
        await scanner.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText) => {
            // When QR code is detected, store the URI
            if (decodedText.startsWith("wc:")) {
              setConnectUri(decodedText);
              setStatus("connecting");
              scanner.stop().catch(console.error);
              isScanning.current = false;
            }
          },
          (error) => {
            // Ignore scanning errors (no QR code in frame)
            console.debug("QR scanning:", error);
          }
        );

        isScanning.current = true;
      } catch (error) {
        console.error("Failed to start QR scanner:", error);
        setStatus("idle");
      }
    };

    startScanning();

    return () => {
      if (scannerRef.current && isScanning.current) {
        scannerRef.current.stop().catch(console.error);
        isScanning.current = false;
      }
    };
  }, [status, setConnectUri, setStatus]);

  if (status !== "scanning") {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95">
      <div className="flex flex-col items-center gap-4 w-full max-w-md px-4">
        <h2 className="text-xl font-semibold text-white">Scan WalletConnect QR Code</h2>
        <div id="qr-reader" className="w-full aspect-square" />
        <Button variant="outline" onClick={() => setStatus("idle")}>
          Cancel
        </Button>
      </div>
    </div>
  );
};
