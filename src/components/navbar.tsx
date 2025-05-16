"use client";

import { shortenIfAddress } from "@/lib/pretty";
import { useWallet } from "@/lib/useDerpProgram";
import { useAppKit, useAppKitAccount } from "@reown/appkit/react";
import { Button } from "./ui/button";
import { Logo } from "./logo";

export default function Navbar() {
  const { open } = useAppKit();
  const { isReadOnly } = useWallet();
  const { address, isConnected } = useAppKitAccount({ namespace: "solana" });

  return (
    <div className="py-2">
      <nav className="px-2 flex flex-row items-center h-8">
        <Logo />
        <div className="flex flex-row items-center ml-auto gap-4">
          {isReadOnly && (
            <Button className="text-sm" variant="ghost">
              <span className="bg-red-500 rounded-full w-2 h-2 inline-block mr-1 mb-px" />
              Read-only mode
            </Button>
          )}

          {isConnected ? (
            <Button size="sm" variant="secondary" onClick={() => open()}>
              {shortenIfAddress(address)}
            </Button>
          ) : (
            <Button size="sm" onClick={() => open()}>
              Connect Wallet
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
};