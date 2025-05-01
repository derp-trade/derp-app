"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface TradeFormProps {
  type: "long" | "short";
}

export default function TradeForm({ type }: TradeFormProps) {
  const [size, setSize] = useState("0");
  const [leverage, setLeverage] = useState(5);

  const maxLeverage = 20;
  const balance = 1000;

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <span className="text-white/60">Available Balance</span>
        <span>${balance.toFixed(2)} USDC</span>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <label htmlFor="size" className="text-white/60">
            Size (USDC)
          </label>
          <div className="flex gap-2">
            <button
              className="text-xs px-1 border border-white/20 rounded hover:border-white/40"
              onClick={() => setSize((balance * 0.25).toFixed(2))}
            >
              25%
            </button>
            <button
              className="text-xs px-1 border border-white/20 rounded hover:border-white/40"
              onClick={() => setSize((balance * 0.5).toFixed(2))}
            >
              50%
            </button>
            <button
              className="text-xs px-1 border border-white/20 rounded hover:border-white/40"
              onClick={() => setSize((balance * 0.75).toFixed(2))}
            >
              75%
            </button>
            <button
              className="text-xs px-1 border border-white/20 rounded hover:border-white/40"
              onClick={() => setSize(balance.toFixed(2))}
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
          <span>${(Number.parseFloat(size || "0") * leverage).toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Entry Price</span>
          <span>$Market</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-white/60">Fees</span>
          <span>${(Number.parseFloat(size || "0") * 0.0005).toFixed(2)}</span>
        </div>
      </div>

      <Button
        className={`w-full font-bold ${type === "long" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}
      >
        {type === "long" ? "Long" : "Short"} SOL
      </Button>
    </div>
  );
}
