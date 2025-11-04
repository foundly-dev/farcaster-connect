"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useConnectStore } from "../connect/connect.store";
import { SUPPORTED_CHAINS } from "./chain.config";

export const ChainSelector = () => {
  const { currentChain, setCurrentChain } = useConnectStore();

  return (
    <Select value={currentChain} onValueChange={setCurrentChain}>
      <SelectTrigger className="w-[180px]">
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
