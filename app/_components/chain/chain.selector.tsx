"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useConnectStore } from "../connect/connect.store";
import { switchChain } from "../connect/connect.service";
import { SUPPORTED_CHAINS } from "./chain.config";

export const ChainSelector = () => {
  const currentChain = useConnectStore((state) => state.currentChain);

  const handleChainChange = async (chainId: string) => {
    try {
      await switchChain(chainId);
    } catch (error) {
      console.error("Failed to switch chain:", error);
    }
  };

  return (
    <Select value={currentChain} onValueChange={handleChainChange}>
      <SelectTrigger className="min-w-fit">
        <SelectValue placeholder="Select a chain" />
      </SelectTrigger>
      <SelectContent>
        {SUPPORTED_CHAINS.map((chain) => (
          <SelectItem key={chain.id} value={chain.id}>
            {chain.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
