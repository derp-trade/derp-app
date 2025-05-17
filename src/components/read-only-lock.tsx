import { useWallet } from "@/lib/useDerpProgram";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { HandCoins, Link2 } from "lucide-react";
import { Button } from "./ui/button";

export default function ReadOnlyLock() {
  const { isReadOnly } = useWallet();
  const { isConnected } = useAppKitAccount({ namespace: "solana" });
  const { open } = useAppKit();

  if (isConnected && !isReadOnly) {
    return null;
  }

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-md">
      <div className="flex flex-col items-center justify-center text-white p-6">
        <div className="text-lg font-semibold">
          {isConnected ? "Read-Only Mode" : "Wallet Not Connected"}
        </div>
        <div className="text-sm text-gray-400">
          {isConnected
            ? "You are in read-only mode. Please fund your wallet to trade."
            : "Please connect your wallet to trade."}
        </div>

        {isConnected ? (
          <Button
            variant="outline"
            onClick={() => window.open("https://faucet.solana.com", "_blank")}
          >
            <HandCoins /> Solana Faucet
          </Button>
        ) : (
          <Button
            variant="outline"
            onClick={() => open()}
          >
            <Link2 /> Connect Wallet
          </Button>
        )}
      </div>
    </div>
  );
};