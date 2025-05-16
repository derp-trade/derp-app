import { AdapterBlueprint } from "@reown/appkit/adapters";
import { useAppKitAccount, useAppKitBalance } from "@reown/appkit/react";
import { useEffect, useRef, useState } from "react";

export function useBalance() {
  const lastFetched = useRef<number>(0);

  const { fetchBalance } = useAppKitBalance();
  const [balance, setBalance] = useState<AdapterBlueprint.GetBalanceResult | undefined>(undefined);
  const { isConnected } = useAppKitAccount({ namespace: "solana" });

  useEffect(() => {
    // fetch at most once per 30 seconds
    if (lastFetched.current + 30 * 1000 > Date.now()) {
      return;
    }
    lastFetched.current = Date.now();

    if (isConnected) {
      fetchBalance().then((result) => {
        setBalance(result.data);
      });
    } else {
      setBalance(undefined);
    }
  }, [isConnected, fetchBalance]);

  return balance;
}