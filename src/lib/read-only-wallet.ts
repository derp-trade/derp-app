import { Wallet } from '@coral-xyz/anchor';
import { Keypair, Transaction, VersionedTransaction } from '@solana/web3.js';

const privateKey = new Uint8Array([178, 60, 120, 249, 242, 131, 137, 116, 234, 27, 44, 101, 16, 121, 221, 132, 176, 252, 208, 31, 106, 102, 202, 235, 62, 173, 168, 101, 196, 113, 43, 198, 221, 179, 14, 84, 159, 36, 182, 128, 24, 63, 162, 112, 203, 143, 236, 235, 125, 43, 138, 45, 216, 220, 252, 172, 4, 147, 208, 155, 249, 205, 142, 159]);

export class ReadOnlyWallet implements Wallet {
  readonly payer = Keypair.fromSecretKey(privateKey);

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
