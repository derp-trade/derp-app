import { MarketId } from "@/lib/const";
import { useWallet } from "@/lib/useDerpProgram";
import { useClosePosition, useCreateUserAccount, useOpenPosition, useUserAccount } from "@/lib/useUser";
import { solanaDevnet } from "@reown/appkit/networks";
import { useAppKit, useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react";
import BN from "bn.js";
import { Button } from "./ui/button";

interface TradeButtonProps {
  type: "long" | "short";
  marketId: MarketId;
  size: number;
  leverage: number;
}

export default function TradeButton({ type, marketId, size, leverage }: TradeButtonProps) {
  const { isReadOnly } = useWallet();
  const { isConnected } = useAppKitAccount({ namespace: "solana" });
  const { chainId, switchNetwork } = useAppKitNetwork();
  const { open } = useAppKit();
  const { data: userAccount } = useUserAccount();
  const createAccount = useCreateUserAccount();
  const openPosition = useOpenPosition();
  const closePosition = useClosePosition();

  const className = `w-full font-bold ${type === "long" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`;

  if (!isConnected) {
    return (
      <Button className={className} onClick={() => open()}>
        Connect Wallet
      </Button>
    );
  }

  if (chainId !== "EtWTRABZaYq6iMfeYKouRu166VU2xqa1") {
    return (
      <Button
        className={className}
        onClick={() => switchNetwork(solanaDevnet)}
      >
        Switch to Solana Devnet
      </Button>
    );
  }

  if (isReadOnly) {
    return (
      <Button
        className={className}
        onClick={() => window.open("https://faucet.solana.com", "_blank")}
      >
        Fund Wallet
      </Button>
    );
  }

  if (!userAccount) {
    return (
      <Button
        className={className}
        onClick={() => createAccount.mutate()}
        disabled={createAccount.isPending}
      >
        {createAccount.isPending ? "Creating Account..." : "Create Account"}
      </Button>
    );
  }

  if (!userAccount.positions[marketId].size.eqn(0)) {
    return (
      <Button
        className={className}
        onClick={() => closePosition.mutate({ marketId })}
        disabled={closePosition.isPending}
      >
        {closePosition.isPending ? "Closing Position..." : "Close Existing Position"}
      </Button>
    );
  }

  return (
    <Button
      className={className}
      onClick={() => {
        const multiplier = new BN(1_000_000);
        const bnSize = new BN(type === "long" ? size : -size).mul(multiplier);

        console.log(marketId, bnSize.toString(), leverage);

        openPosition.mutate({
          marketId,
          size: bnSize,
          leverage,
        });
      }}
      disabled={openPosition.isPending}
    >
      {openPosition.isPending ? "Placing Order..." : `${type === "long" ? "Long" : "Short"} SOL`}
    </Button>

  );
}