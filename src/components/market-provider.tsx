"use client";

import { MarketId } from "@/lib/const";
import { createContext, ReactNode, useContext, useState } from "react";

interface MarketContextType {
  marketId: MarketId;
  setMarketId: (id: MarketId) => void;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export function MarketProvider({ children }: { children?: ReactNode; }) {
  const [marketId, setMarketId] = useState<MarketId>(1);

  return (
    <MarketContext.Provider value={{ marketId, setMarketId }}>
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket() {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error("useMarket must be used within a MarketProvider");
  }

  return context;
}