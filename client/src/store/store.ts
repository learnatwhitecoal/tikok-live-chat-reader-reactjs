import { Socket } from "socket.io-client";
import create from "zustand";
export interface SocketStore {
  socket: Socket | null;
  setSocket: (initializedSocket: Socket) => void;
}

export const useSocketStore = create<SocketStore>((set) => ({
  socket: null,
  setSocket: (socketInstance) =>
    set((state) => ({
      socket: socketInstance,
    })),
}));
