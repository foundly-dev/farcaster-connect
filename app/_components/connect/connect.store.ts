import { create } from 'zustand';

export type ConnectStatus =
  | "idle"
  | "scanning"
  | "connecting"
  | "connected"
  | "disconnected";

export interface ConnectStore {
  status: ConnectStatus;
  connectUri: string | null;
  isReady: boolean;
  currentChain: string;
  setStatus: (status: ConnectStatus) => void;
  setConnectUri: (uri: string) => void;
  setReady: (ready: boolean) => void;
  setCurrentChain: (chain: string) => void;
}

export const useConnectStore = create<ConnectStore>((set) => ({
  status: 'idle',
  connectUri: null,
  isReady: false,
  currentChain: 'eip155:8453', // Base mainnet
  setStatus: (status) => set({ status }),
  setConnectUri: (uri) => set({ connectUri: uri }),
  setReady: (ready) => set({ isReady: ready }),
  setCurrentChain: (chain) => set({ currentChain: chain }),
}));
