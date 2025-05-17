import { useAppKitAccount, useAppKitBalance } from "@reown/appkit/react";
import { useQuery } from "@tanstack/react-query";

export function useBalance() {
  const { fetchBalance } = useAppKitBalance();
  const { isConnected, address } = useAppKitAccount({ namespace: "solana" });

  const { data } = useQuery({
    queryKey: ["balance", address],
    enabled: !!address && !!isConnected,
    queryFn: async () => {
      const balance = await fetchBalance();
      if (!balance.data) {
        throw new Error("Failed to fetch balance");
      }

      return balance.data;
    },
    refetchInterval: 30 * 1000, // 30 seconds
  });

  return data;
}