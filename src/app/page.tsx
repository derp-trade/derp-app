"use client";

import MarketBar from "@/components/market-bar";
import Navbar from "@/components/navbar";
import PositionsList from "@/components/positions-list";
import RecentTrades from "@/components/recent-trades";
import TradeForm from "@/components/trade-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="flex flex-col items-stretch justify-center min-h-screen p-4 gap-2 font-[family-name:var(--font-geist-sans)]">
      <Navbar />

      <MarketBar />

      <div className="flex flex-1 flex-row justify-center items-stretch gap-2">
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <Card className="w-full min-h-128 flex-1">
          </Card>

          <Card className="w-full">
            <CardContent>
              <PositionsList />
            </CardContent>
          </Card>
        </div>

        <div className="w-96 flex flex-col items-stretch justify-center gap-2">
          <Card className="w-full py-4">
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

          <Card className="w-full flex-1 min-h-64">
            <CardHeader>
              <CardTitle>Recent Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentTrades />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
