import { Github, Link2, MessageCircle, Newspaper, Twitter } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function MoreInfoCard() {
  return (
    <Card className="w-full flex-1 min-h-64">
      <CardHeader>
        <CardTitle>More Information</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-start justify-start gap-4 flex-1">
        <p>
          This is a demo application for DERPs, an asset class that allows
          users to create and trade synthetic assets on the Solana blockchain.
        </p>
        <div className="flex flex-row items-stretch gap-2">
          <Button variant="outline" onClick={() => window.open("https://derp.trade", "_blank")}>
            <Link2 /> Website
          </Button>
          <Button onClick={() => window.open("https://docs.derp.trade", "_blank")}>
            <Newspaper /> Read Docs
          </Button>
        </div>

        <div className="w-full mt-auto flex flex-row items-center">
          <Button
            variant="ghost"
            onClick={() => window.open("https://github.com/derp-trade", "_blank")}
            className="grow"
          >
            <Github /> GitHub
          </Button>
          <Button
            variant="ghost"
            onClick={() => window.open("https://twitter.com/derp_trade", "_blank")}
            className="grow"
          >
            <Twitter /> X
          </Button>
          <Button
            variant="ghost"
            onClick={() => window.open("https://t.me/derpstrade", "_blank")}
            className="grow"
          >
            <MessageCircle /> Telegram
          </Button>
        </div>
      </CardContent>
    </Card >
  );
}