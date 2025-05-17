import { DerpContracts } from "@/idl/derp_contracts";
import idl from '@/idl/derp_contracts.json';
import * as anchor from '@coral-xyz/anchor';
import { Provider } from "@reown/appkit-adapter-solana/react";
import { useAppKitProvider } from "@reown/appkit/react";
import { PublicKey } from '@solana/web3.js';
import BN from "bn.js";
import { useMemo } from 'react';
import { DERP_STATE_ID, MarketId, markets } from "./const";
import { ReadOnlyWallet } from "./read-only-wallet";
import { solanaConnection } from "./solana-config";
import { useBalance } from "./useBalance";

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

interface UserStatusResponse {
  balance: BN;
  positionStatus: {
    size: BN;
    entryPrice: BN;
    currentPriceOracle: BN;
    currentPriceAmm: BN;
    unrealizedPnl: BN;
    initialMargin: BN;
    maintenanceMargin: BN;
    claimableValue: BN;
    fundingIndex: BN;
    fundingRate: BN;
    lastFundingTime: BN;
  }[];
}

export function useWallet(): {
  wallet: anchor.Wallet;
  isReadOnly: boolean;
} {
  const { walletProvider } = useAppKitProvider<Provider>("solana");

  const balance = useBalance();
  const balanceCorrect = !!balance && balance.symbol === "SOL" && !!Number(balance.balance);
  const walletExists = !!walletProvider && !!walletProvider.publicKey;

  const wallet = useMemo(() => {
    if (!balanceCorrect || !walletExists) {
      return new ReadOnlyWallet();
    }

    const wallet: anchor.Wallet = {
      publicKey: walletProvider!.publicKey!,
      signTransaction: async (transaction) => {
        if (!walletProvider) {
          throw new Error("Wallet not connected");
        }
        return walletProvider.signTransaction(transaction);
      },
      signAllTransactions: async (transactions) => {
        if (!walletProvider) {
          throw new Error("Wallet not connected");
        }
        return walletProvider.signAllTransactions(transactions);
      },
      payer: undefined as unknown as anchor.web3.Keypair,
    };

    return wallet;
  }, [walletProvider, balanceCorrect, walletExists]);

  return {
    wallet,
    isReadOnly: !balanceCorrect || !walletExists,
  };
}

export function useDerpProgram() {
  const { wallet } = useWallet();

  const provider = useMemo(
    () => new anchor.AnchorProvider(solanaConnection, wallet, { commitment: 'confirmed', preflightCommitment: 'confirmed' }),
    [wallet],
  );

  return useMemo(() => new anchor.Program<DerpContracts>(idl, provider), [provider]);
}

export function useDerpFunctions() {
  const program = useDerpProgram();
  const { wallet, isReadOnly } = useWallet();

  const createUserAccount = useMemo(() => {
    return async () => {
      if (isReadOnly) {
        throw new Error("Wallet not connected");
      }

      const tx = await program.methods.createUserAccount()
        .accounts({
          user: wallet.publicKey,
        })
        .rpc();

      return tx;
    };
  }, [program, wallet, isReadOnly]);

  const openPosition = useMemo(() => {
    return async (marketId: MarketId, size: BN, leverage: number) => {
      if (isReadOnly) {
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
  }, [program, wallet, isReadOnly]);

  const closePosition = useMemo(() => {
    return async (marketId: MarketId) => {
      if (isReadOnly) {
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
  }, [program, wallet, isReadOnly]);

  const getUserStatus = useMemo(() => {
    return async () => {
      if (isReadOnly) {
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

        if (!userStatus) {
          throw new Error("Failed to fetch user status");
        }

      return userStatus as UserStatusResponse;
    };
  }, [program, wallet, isReadOnly]);

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

  const getUserAccount = useMemo(() => {
    return async () => {
      if (isReadOnly) {
        throw new Error("Wallet not connected");
      }

      const [derpPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('user-account'), wallet.publicKey.toBuffer()],   // <-- seeds in #[account]
        program.programId,
      );

      return await program.account.userAccount.fetchNullable(derpPda);
    };
  }, [program, wallet, isReadOnly]);

  return {
    createUserAccount,
    openPosition,
    closePosition,
    getUserStatus,
    getMarketStatus,
    getUserAccount,
  };
}