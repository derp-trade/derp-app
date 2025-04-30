import Navbar from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <div className="flex flex-col items-stretch justify-center min-h-screen p-4 gap-2 font-[family-name:var(--font-geist-sans)]">
      <Navbar />

      <div className="flex flex-1 flex-row justify-center items-stretch gap-2">
        <div className="flex-1 flex flex-col items-center justify-center gap-2">
          <Card className="w-full min-h-128 flex-1">
          </Card>

          <Card className="w-full h-80">
            <CardHeader>
              <CardTitle>Positions</CardTitle>
            </CardHeader>
          </Card>
        </div>

        <div className="w-96 flex flex-col items-stretch justify-center gap-2">
          <Card className="w-full min-h-128 py-4">
            <CardContent className="px-4">
              <Tabs defaultValue="long" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="long">Long</TabsTrigger>
                  <TabsTrigger value="short">Short</TabsTrigger>
                </TabsList>
                <TabsContent value="long">

                </TabsContent>
                <TabsContent value="short">

                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="w-full flex-1 min-h-64">
            <CardHeader>
              <CardTitle>Recent Trades</CardTitle>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
