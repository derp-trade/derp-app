import { useAppKitAccount } from "@reown/appkit/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import BN from "bn.js";
import { MarketId } from "./const";
import { useDerpFunctions, useWallet } from "./useDerpProgram";
import { sleep } from "./sleep";

export function useUserStatus() {
  const { getUserStatus } = useDerpFunctions();
  const { isReadOnly } = useWallet();
  const { isConnected, address } = useAppKitAccount({ namespace: "solana" });

  return useQuery({
    queryKey: ["userStatus", address],
    enabled: !isReadOnly && !!address && !!isConnected,
    queryFn: async () => {
      return getUserStatus();
    },
    refetchInterval: 30 * 1000,
  });
}

export function useUserAccount() {
  const { getUserAccount } = useDerpFunctions();
  const { isReadOnly } = useWallet();
  const { isConnected, address } = useAppKitAccount({ namespace: "solana" });

  return useQuery({
    queryKey: ["userAccount", address],
    enabled: !isReadOnly && !!address && !!isConnected,
    queryFn: async () => {
      return getUserAccount();
    },
    refetchInterval: 30 * 1000,
  });
}

export function useCreateUserAccount() {
  const { createUserAccount } = useDerpFunctions();
  const { isReadOnly } = useWallet();
  const { address } = useAppKitAccount({ namespace: "solana" });
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createUserAccount", address],
    mutationFn: async () => {
      if (isReadOnly) {
        throw new Error("Wallet not connected");
      }

      return createUserAccount();
    },
    onSuccess: () => {
      console.log("User account created successfully");
      queryClient.invalidateQueries({
        queryKey: ["userAccount", address],
      });
      queryClient.invalidateQueries({
        queryKey: ["userStatus", address],
      });
    },
    onError: (error) => {
      console.error("Error creating user account:", error);
    },
  });
}

export function useOpenPosition() {
  const { openPosition } = useDerpFunctions();
  const { isReadOnly } = useWallet();
  const { address } = useAppKitAccount({ namespace: "solana" });
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["openPosition", address],
    mutationFn: async ({ marketId, size, leverage }: { marketId: MarketId, size: BN, leverage: number; }) => {
      if (isReadOnly) {
        throw new Error("Wallet not connected");
      }

      return openPosition(marketId, size, leverage)
        .then(async (r) => {
          await sleep(1000);
          return r;
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userStatus", address],
      });
      queryClient.invalidateQueries({
        queryKey: ["marketStatus"],
      });
      queryClient.invalidateQueries({
        queryKey: ["userAccount", address],
      });
    },
    onError: (error) => {
      console.error("Error opening position:", error);
    },
  });
}

export function useClosePosition() {
  const { closePosition } = useDerpFunctions();
  const { isReadOnly } = useWallet();
  const { address } = useAppKitAccount({ namespace: "solana" });
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["closePosition", address],
    mutationFn: async ({ marketId }: { marketId: MarketId; }) => {
      if (isReadOnly) {
        throw new Error("Wallet not connected");
      }

      return closePosition(marketId)
        .then(async (r) => {
          await sleep(1000);
          return r;
        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userStatus", address],
      });
      queryClient.invalidateQueries({
        queryKey: ["marketStatus"],
      });
      queryClient.invalidateQueries({
        queryKey: ["userAccount", address],
      });
    },
    onError: (error) => {
      console.error("Error closing position:", error);
    },
  });
}