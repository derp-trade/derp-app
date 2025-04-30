import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export default function Navbar() {
  return (
    <Card className="py-2">
      <CardContent className="px-2 flex flex-row items-center">
        <Button className="ml-auto" size="sm">
          Connect Wallet
        </Button>
      </CardContent>
    </Card>
  );
};