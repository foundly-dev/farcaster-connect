import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export const Header = () => {
  return (
    <div className="w-full flex flex-col items-center gap-4">
      <h1 className="text-4xl font-bold text-center">Farcaster Connect</h1>

      <Alert className="w-full">
        <InfoIcon />
        <AlertTitle>Connect Your Wallet to Any App</AlertTitle>
        <AlertDescription>
          Use your Farcaster wallet to connect to any dApp via WalletConnect.
          Scan a QR code from any WalletConnect-enabled app and securely sign
          transactions using your Farcaster wallet.
        </AlertDescription>
      </Alert>
    </div>
  );
};
