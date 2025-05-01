"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for positions
const positionsData = [
  {
    id: 1,
    market: "SOL-PERP",
    type: "long",
    size: 0.75,
    leverage: 5,
    entryPrice: 140.25,
    markPrice: 142.87,
    liquidationPrice: 120.5,
    pnl: 1.97,
    pnlPercent: 1.4,
  },
  {
    id: 2,
    market: "BTC-PERP",
    type: "short",
    size: 0.02,
    leverage: 10,
    entryPrice: 68500,
    markPrice: 67800,
    liquidationPrice: 72300,
    pnl: 14.0,
    pnlPercent: 2.04,
  },
];

export default function PositionsList() {
  return (
    <Tabs defaultValue="positions">
      <TabsList className="grid grid-cols-2 mb-4">
        <TabsTrigger value="positions">Positions</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
      </TabsList>

      <TabsContent value="positions" className="max-h-48 min-h-48 overflow-y-auto">
        {positionsData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-white/60 border-b border-white/10">
                  <th className="text-left pb-2">Market</th>
                  <th className="text-left pb-2">Size</th>
                  <th className="text-left pb-2">Entry Price</th>
                  <th className="text-left pb-2">Mark Price</th>
                  <th className="text-left pb-2">Liq. Price</th>
                  <th className="text-left pb-2">PnL</th>
                  <th className="text-right pb-2">Close</th>
                </tr>
              </thead>
              <tbody>
                {positionsData.map((position) => (
                  <tr key={position.id} className="border-b border-white/5 text-sm">
                    <td className="py-3">
                      <div className="flex items-center">
                        <span
                          className={`inline-block w-2 h-2 rounded-full mr-2 ${position.type === "long" ? "bg-[#AAFF00]" : "bg-[#9C27FF]"}`}
                        ></span>
                        {position.market}
                      </div>
                    </td>
                    <td className="py-3">
                      {position.size} ({position.leverage}x)
                    </td>
                    <td className="py-3">
                      $
                      {position.type === "long"
                        ? position.entryPrice.toLocaleString()
                        : position.entryPrice.toLocaleString()}
                    </td>
                    <td className="py-3">${position.markPrice.toLocaleString()}</td>
                    <td className="py-3">${position.liquidationPrice.toLocaleString()}</td>
                    <td className="py-3">
                      <div className={position.pnl >= 0 ? "text-[#AAFF00]" : "text-[#9C27FF]"}>
                        ${position.pnl.toFixed(2)} ({position.pnlPercent.toFixed(2)}%)
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      <Button variant="outline" size="sm" className="h-7 text-xs border-white/20 hover:bg-white/10">
                        Close
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-white/60">No open positions</div>
        )}
      </TabsContent>

      <TabsContent value="orders" className="max-h-48 min-h-48 overflow-y-auto">
        <div className="text-center py-8 text-white/60">No active orders</div>
      </TabsContent>
    </Tabs>
  );
}
