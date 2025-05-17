import { SolanaAdapter } from '@reown/appkit-adapter-solana/react';
import type { AppKitNetwork } from '@reown/appkit/networks';
import { solanaDevnet } from '@reown/appkit/networks';
import { PhantomWalletAdapter, SolflareWalletAdapter } from '@solana/wallet-adapter-wallets';
import { Connection } from "@solana/web3.js";

export const projectId = "eb227fc0e8aef5300e1402d4ba9dc589";

if (!projectId) {
	throw new Error('Project ID is not defined');
}

export const networks = [solanaDevnet] as [AppKitNetwork, ...AppKitNetwork[]];

// Set up Solana Adapter
export const solanaWeb3JsAdapter = new SolanaAdapter({
	wallets: [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
});

export const solanaConnection = new Connection(
	"https://api.devnet.solana.com",
	"finalized"
);