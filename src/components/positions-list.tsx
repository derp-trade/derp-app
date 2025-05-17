"use client";

import { Button } from "@/components/ui/button";
import { MarketId, markets } from "@/lib/const";
import { useClosePosition, useUserStatus } from "@/lib/useUser";
import { BN } from "bn.js";

export default function PositionsList() {
  const { data: userStatus } = useUserStatus();
  const closePosition = useClosePosition();

  return (
    <div className="max-h-48 min-h-48 overflow-y-auto">
      {userStatus?.positionStatus ? (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-white/60 border-b border-white/10">
                <th className="text-left pb-2">Market</th>
                <th className="text-left pb-2">Size</th>
                <th className="text-left pb-2">Entry Price</th>
                <th className="text-left pb-2">Mark Price</th>
                <th className="text-left pb-2">Liq. Margin</th>
                <th className="text-left pb-2">PnL</th>
                <th className="text-right pb-2">Close</th>
              </tr>
            </thead>
            <tbody>
              {userStatus.positionStatus.map((position, idx) => {
                if (position.size.isZero()) {
                  return null;
                }

                const type = position.size.gt(new BN(0)) ? "long" : "short";
                const size = position.size.abs().toNumber() / 1_000_000;
                const markPrice = position.currentPriceAmm.toNumber() / 1_000_000;
                const liquidationMargin = position.maintenanceMargin.toNumber() / 1_000_000;
                const pnl = position.unrealizedPnl.toNumber() / 1_000_000;
                const entryPrice = position.entryPrice.toNumber() / 1_000_000;

                const market = markets[idx as MarketId];

                return (
                  <tr key={idx} className="border-b border-white/5 text-sm">
                    <td className="py-3">
                      <div className="flex items-center">
                        <span
                          className={`inline-block w-2 h-2 rounded-full mr-2 ${type === "long" ? "bg-[#AAFF00]" : "bg-[#9C27FF]"}`}
                        ></span>
                        {market.name}
                      </div>
                    </td>
                    <td className="py-3">
                      {size} {market.underlyingName} ({position.leverage}x)
                    </td>
                    <td className="py-3">
                      ${entryPrice.toFixed(2)}
                    </td>
                    <td className="py-3">${markPrice.toFixed(2)}</td>
                    <td className="py-3">${liquidationMargin.toFixed(2)}</td>
                    <td className="py-3">
                      <div className={pnl >= 0 ? "text-[#AAFF00]" : "text-[#9C27FF]"}>
                        ${pnl.toFixed(2)} ({(pnl / size).toFixed(2)}%)
                      </div>
                    </td>
                    <td className="py-3 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs border-white/20 hover:bg-white/10"
                        disabled={closePosition.isPending}
                        onClick={() => closePosition.mutate({ marketId: market.id })}
                      >
                        Close
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-white/60">No open positions</div>
      )}
    </div>
  );
}
