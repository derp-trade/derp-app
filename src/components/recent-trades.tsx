"use client";

import { ArrowDown, ArrowUp } from "lucide-react";

// Mock data for recent trades
const recentTradesData = [
  { id: 1, price: 142.87, size: 0.35, time: "12:42:15", type: "buy" },
  { id: 2, price: 142.85, size: 0.12, time: "12:42:10", type: "sell" },
  { id: 3, price: 142.9, size: 0.25, time: "12:42:05", type: "buy" },
  { id: 4, price: 142.82, size: 0.18, time: "12:41:58", type: "sell" },
  { id: 5, price: 142.8, size: 0.42, time: "12:41:45", type: "sell" },
  { id: 6, price: 142.78, size: 0.15, time: "12:41:30", type: "sell" },
  { id: 7, price: 142.85, size: 0.28, time: "12:41:22", type: "buy" },
  { id: 8, price: 142.9, size: 0.33, time: "12:41:15", type: "buy" },
  { id: 9, price: 142.88, size: 0.21, time: "12:41:08", type: "buy" },
  { id: 10, price: 142.82, size: 0.17, time: "12:41:00", type: "sell" },
];

export default function RecentTrades() {
  return (
    <div className="overflow-hidden">
      <div className="grid grid-cols-3 text-xs text-muted-foreground mb-2 px-1">
        <div>Price</div>
        <div className="text-right">Size</div>
        <div className="text-right">Time</div>
      </div>

      <div className="space-y-1 max-h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        {recentTradesData.map((trade) => (
          <div key={trade.id} className="grid grid-cols-3 text-sm py-1 px-1 hover:bg-white/5 rounded">
            <div
              className={trade.type === "buy" ? "text-primary flex items-center" : "text-secondary flex items-center"}
            >
              {trade.type === "buy" ? <ArrowUp size={12} className="mr-1" /> : <ArrowDown size={12} className="mr-1" />}
              ${trade.price.toFixed(2)}
            </div>
            <div className="text-right">{trade.size.toFixed(2)}</div>
            <div className="text-right text-muted-foreground">{trade.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
