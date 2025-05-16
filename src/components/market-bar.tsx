"use client";

import { useMarketStatus } from "@/lib/useMarketStatus";
import { ReactNode } from "react";
import { Card, CardContent } from "./ui/card";

export default function MarketBar() {
  const { status, data } = useMarketStatus();
  const lastFundingTime = data?.marketSnapshots?.[0]?.lastFundingTime.toNumber();

  return (
    <Card className="py-2">
      <CardContent className="px-2 flex flex-row items-center gap-2">
        <MarketStatistic title="Market Status">
          {status === "success" && <span className="text-green-500">Open</span>}
          {status === "pending" && <span className="text-yellow-500">Loading...</span>}
          {status === "error" && <span className="text-red-500">Error</span>}
        </MarketStatistic>
        <MarketStatistic title="AMM Price">
          <span className="text-muted-foreground">$</span>{((data?.marketSnapshots?.[0]?.currentPriceAmm.toNumber() ?? 0) / 1_000_000) || "N/A"}
        </MarketStatistic>
        <MarketStatistic title="Oracle Price">
          <span className="text-muted-foreground">$</span>{((data?.marketSnapshots?.[0]?.currentPriceOracle.toNumber() ?? 0) / 1_000_000) || "N/A"}
        </MarketStatistic>
        <MarketStatistic title="Funding Rate">
          {data?.marketSnapshots?.[0]?.fundingRate.toNumber() ?? "N/A"}%
        </MarketStatistic>
        <MarketStatistic title="Last Funding Time">
          {lastFundingTime ? new Date(lastFundingTime * 1000).toISOString().replace("T", " ").replace(".000Z", " UTC") : "N/A"}
        </MarketStatistic>
      </CardContent>
    </Card>
  );
}

interface MarketStatisticProps {
  title?: ReactNode;
  children?: ReactNode;
}

function MarketStatistic({ title, children }: MarketStatisticProps) {
  return (
    <div className="flex flex-col items-start justify-center py-1 gap-1 min-w-36">
      <span className="text-sm text-muted-foreground leading-none">{title}</span>
      <span className="text-lg font-bold leading-none">{children}</span>
    </div>
  );
}