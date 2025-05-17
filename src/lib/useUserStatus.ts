import { useAppKitAccount } from "@reown/appkit/react";
import { useQuery } from "@tanstack/react-query";
import { useDerpFunctions, useWallet } from "./useDerpProgram";

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