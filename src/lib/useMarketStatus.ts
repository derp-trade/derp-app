import { useQuery } from "@tanstack/react-query";
import { useDerpFunctions } from "./useDerpProgram";

export function useMarketStatus() {
  const { getMarketStatus } = useDerpFunctions();
  return useQuery({
    queryKey: ["marketStatus"],
    queryFn: async () => {
      return getMarketStatus();
    },
    refetchInterval: 30 * 1000,
  });
}