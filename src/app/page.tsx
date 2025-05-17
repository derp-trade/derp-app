"use client";

import TradingViewChart from "@/components/chart/trading-view";
import MarketBar from "@/components/market-bar";
import MoreInfoCard from "@/components/more-info-card";
import Navbar from "@/components/navbar";
import PositionsList from "@/components/positions-list";
import TradeForm from "@/components/trade-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="flex flex-col items-stretch justify-center min-h-screen p-4 gap-2">
      <Navbar />

      <MarketBar />

      <div className="flex flex-1 flex-row justify-center items-stretch gap-2">
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <Card className="w-full min-h-128 flex-1 py-0 overflow-hidden">
            <TradingViewChart />
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>
                Positions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PositionsList />
            </CardContent>
          </Card>
        </div>

        <div className="w-96 flex flex-col items-stretch justify-center gap-2">
          <Card className="w-full py-4 relative">
            <CardContent className="px-4">
              <Tabs defaultValue="long" className="w-full">
                <TabsList className="w-full mb-2">
                  <TabsTrigger value="long" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Long</TabsTrigger>
                  <TabsTrigger value="short" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">Short</TabsTrigger>
                </TabsList>
                <TabsContent value="long">
                  <TradeForm type="long" />
                </TabsContent>
                <TabsContent value="short">
                  <TradeForm type="short" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <MoreInfoCard />
        </div>
      </div>
    </div>
  );
}
