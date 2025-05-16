"use client";

import { MarketId, markets } from "@/lib/const";
import { useMarketStatus } from "@/lib/useMarketStatus";
import Image from "next/image";
import { ReactNode } from "react";
import { useMarket } from "./market-provider";
import { Card, CardContent } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function MarketBar() {
  const { status, data } = useMarketStatus();
  const { marketId, setMarketId } = useMarket();

  const snapshot = data?.marketSnapshots?.[marketId];
  const lastFundingTime = snapshot?.lastFundingTime.toNumber();

  return (
    <Card className="py-2">
      <CardContent className="px-4 flex flex-row items-center gap-4">
        <Select
          value={marketId.toString()}
          onValueChange={(value) => setMarketId(parseInt(value) as MarketId)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select a market" />
          </SelectTrigger>
          <SelectContent>
            {markets.map((market) => (
              <SelectItem key={market.id} value={market.id.toString()}>
                <Image alt="" src={market.icon} width={16} height={16} /> <p><span className="font-bold">{market.underlyingName}</span><span className="font-light">-DERP</span></p>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <MarketStatistic title="Market Status">
          {status === "success" && <span className="text-green-500">Open</span>}
          {status === "pending" && <span className="text-yellow-500">Loading...</span>}
          {status === "error" && <span className="text-red-500">Error</span>}
        </MarketStatistic>
        <MarketStatistic title="AMM Price">
          <span className="text-muted-foreground">$</span>{((snapshot?.currentPriceAmm.toNumber() ?? 0) / 1_000_000) || "N/A"}
        </MarketStatistic>
        <MarketStatistic title="Oracle Price">
          <span className="text-muted-foreground">$</span>{((snapshot?.currentPriceOracle.toNumber() ?? 0) / 1_000_000) || "N/A"}
        </MarketStatistic>
        <MarketStatistic title="Funding Rate">
          {snapshot?.fundingRate.toNumber() ?? "N/A"}%
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
      <span className="text-xs text-muted-foreground font-spline leading-none">{title}</span>
      <span className="text-base font-semibold leading-none">{children}</span>
    </div>
  );
}