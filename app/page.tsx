import { FarcasterFrame } from "./_components/farcaster/farcaster.frame";
import { FarcasterWallet } from "./_components/farcaster/farcaster.wallet";
import { ConnectButton } from "./_components/connect/connect.button";
import { ConnectScan } from "./_components/connect/connect.scan";
import { ConnectConnecting } from "./_components/connect/connect.connecting";
import { ConnectInfo } from "./_components/connect/connect.info";
import { ConnectSessions } from "./_components/connect/connect.sessions";
import { Header } from "./_components/header";
import { TransactionsList } from "./_components/transactions/transactions.list";
import { Toaster } from "@/components/ui/sonner";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center  bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center  gap-4 p-8">
        <Toaster />
        <FarcasterFrame />
        <Header />
        <FarcasterWallet />
        <ConnectSessions />
        <ConnectButton />
        <ConnectInfo />
        <TransactionsList />
        <ConnectScan />
        <ConnectConnecting />
      </main>
    </div>
  );
}
