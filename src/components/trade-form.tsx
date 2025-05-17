"use client";

import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useMarketStatus } from "@/lib/useMarketStatus";
import { useUserStatus } from "@/lib/useUser";
import { useState } from "react";
import { useMarket } from "./market-provider";
import TradeButton from "./trade-button";

interface TradeFormProps {
  type: "long" | "short";
}

export default function TradeForm({ type }: TradeFormProps) {
  const [size, setSize] = useState("0");
  const [leverage, setLeverage] = useState(5);

  const { marketId } = useMarket();
  const { data: userStatus } = useUserStatus();
  const { data: marketStatus } = useMarketStatus();

  const balance = userStatus?.balance ? (userStatus.balance.toNumber() / 1_000_000) : undefined;
  const marketPrice = (marketStatus?.marketSnapshots?.[marketId].currentPriceAmm.toNumber() ?? 0) / 1_000_000;

  const sizeNumber = Number.parseFloat(size || "0");
  const sizeWithLeverage = sizeNumber * leverage;

  const maxLeverage = 10;

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <span className="text-white/60">Available Balance</span>
        {typeof balance === "number" ? <span>${balance.toFixed(2)}</span> : <></>}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <label htmlFor="size" className="text-white/60">
            Size (USD)
          </label>
          <div className="flex gap-2">
            <button
              className="text-xs px-1 border border-white/20 rounded hover:border-white/40"
              onClick={() => setSize(((balance ?? 0) * 0.25).toFixed(2))}
            >
              25%
            </button>
            <button
              className="text-xs px-1 border border-white/20 rounded hover:border-white/40"
              onClick={() => setSize(((balance ?? 0) * 0.5).toFixed(2))}
            >
              50%
            </button>
            <button
              className="text-xs px-1 border border-white/20 rounded hover:border-white/40"
              onClick={() => setSize(((balance ?? 0) * 0.75).toFixed(2))}
            >
              75%
            </button>
            <button
              className="text-xs px-1 border border-white/20 rounded hover:border-white/40"
              onClick={() => setSize((balance ?? 0).toFixed(2))}
            >
              100%
            </button>
          </div>
        </div>
        <Input
          id="size"
          type="text"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="bg-[#0B100F] border-white/20 focus-visible:ring-[#AAFF00]"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <label className="text-white/60">Order Type</label>
          <div className="flex gap-2">
            <button
              className={`text-xs px-2 py-1 rounded ${type === "long" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
            >
              Market
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <label className="text-white/60">Leverage: {leverage}x</label>
          <span>{leverage}x</span>
        </div>
        <Slider
          value={[leverage]}
          min={1}
          max={maxLeverage}
          step={1}
          onValueChange={(value) => setLeverage(value[0])}
          className="py-2"
          rangeClassName={type === "long" ? "" : "bg-secondary"}
          thumbClassName={type === "long" ? "" : "border-secondary"}
        />
        <div className="flex justify-between text-xs text-white/60">
          <span>1x</span>
          <span>{maxLeverage}x</span>
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Position Size</span>
          <span>${sizeWithLeverage.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Entry Price</span>
          <span>${marketPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Fees</span>
          <span>${(sizeWithLeverage * 0.0005).toFixed(2)}</span>
        </div>
      </div>

      <TradeButton
        type={type}
        leverage={leverage}
        size={(sizeNumber / marketPrice) * 0.99}
        marketId={marketId}
      />
    </div>
  );
}
