import { Wallet } from '@coral-xyz/anchor';
import { Keypair, Transaction, VersionedTransaction } from '@solana/web3.js';

export class ReadOnlyWallet implements Wallet {
  readonly payer = Keypair.generate();

  get publicKey() {
    return this.payer.publicKey;
  }

  signTransaction<T extends Transaction | VersionedTransaction>(tx: T): Promise<T> {
    return Promise.resolve(tx);
  }

  signAllTransactions<T extends (Transaction | VersionedTransaction)[]>(txs: T): Promise<T> {
    return Promise.resolve(txs);
  }
}
