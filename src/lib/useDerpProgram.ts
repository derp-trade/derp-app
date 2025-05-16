import { DerpContracts } from "@/idl/derp_contracts";
import idl from '@/idl/derp_contracts.json';
import * as anchor from '@coral-xyz/anchor';
import { PublicKey } from '@solana/web3.js';
import BN from "bn.js";
import { useMemo } from 'react';
import { DERP_STATE_ID, MarketId, markets } from "./const";
import { ReadOnlyWallet } from "./read-only-wallet";
import { solanaConnection } from "./solana-config";

export const DERP_PROGRAM_ID = new PublicKey(idl.address);

interface MarketStatusResponse {
  marketSnapshots?: {
    currentPriceOracle: BN;
    currentPriceAmm: BN;
    fundingIndex: BN;
    fundingRate: BN;
    lastFundingTime: BN;
  }[];
}

export function useDerpProgram() {
  // const { walletProvider } = useAppKitProvider<Provider>("solana");

  const provider = useMemo(
    () => new anchor.AnchorProvider(solanaConnection, new ReadOnlyWallet(), { commitment: 'confirmed', preflightCommitment: 'confirmed' }),
    [],
  );

  return useMemo(() => new anchor.Program<DerpContracts>(idl, provider), [provider]);
}

export function useDerpFunctions() {
  const program = useDerpProgram();
  const wallet = new ReadOnlyWallet();

  const createUserAccount = useMemo(() => {
    return async () => {
      if (!wallet) {
        throw new Error("Wallet not connected");
      }

      const tx = await program.methods.createUserAccount()
        .accounts({
          user: wallet.publicKey,
        })
        .rpc();

      return tx;
    };
  }, [program, wallet]);

  const openPosition = useMemo(() => {
    return async (marketId: MarketId, size: BN, leverage: number) => {
      if (!wallet) {
        throw new Error("Wallet not connected");
      }

      const market = markets[marketId];

      const tx = await program.methods.openPosition(marketId, size, leverage)
        .accounts({
          derpState: DERP_STATE_ID,
          user: wallet.publicKey,
          pythPriceAccount: market.pythAddress,
        })
        .rpc();

      return tx;
    };
  }, [program, wallet]);

  const closePosition = useMemo(() => {
    return async (marketId: MarketId) => {
      if (!wallet) {
        throw new Error("Wallet not connected");
      }

      const market = markets[marketId];

      const tx = await program.methods.closePosition(marketId)
        .accounts({
          derpState: DERP_STATE_ID,
          user: wallet.publicKey,
          pythPriceAccount: market.pythAddress,
        })
        .rpc();

      return tx;
    };
  }, [program, wallet]);

  const getUserStatus = useMemo(() => {
    return async () => {
      if (!wallet) {
        throw new Error("Wallet not connected");
      }

      const userStatus = await program.methods.getUserStatus()
        .accounts({
          derpState: DERP_STATE_ID,
          pythPriceAccountGold: markets[0].pythAddress,
          pythPriceAccountSol: markets[1].pythAddress,
          pythPriceAccountFartcoin: markets[2].pythAddress,
          user: wallet.publicKey,
        })
        .view();

      console.log("user status:", userStatus);

      return "";
    };
  }, [program, wallet]);

  const getMarketStatus = useMemo(() => {
    return async () => {
      const marketStatus = await program.methods.getMarketStatus()
        .accounts({
          derpState: DERP_STATE_ID,
          pythPriceAccountGold: markets[0].pythAddress,
          pythPriceAccountSol: markets[1].pythAddress,
          pythPriceAccountFartcoin: markets[2].pythAddress,
        })
        .view();

      if (!marketStatus) {
        throw new Error("Failed to fetch market status");
      }

      return marketStatus as MarketStatusResponse;
    };
  }, [program]);

  return {
    createUserAccount,
    openPosition,
    closePosition,
    getUserStatus,
    getMarketStatus,
  };
}