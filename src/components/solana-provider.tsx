'use client';

import { networks, projectId, solanaWeb3JsAdapter } from "@/lib/solana-config";
import { createAppKit } from '@reown/appkit/react';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { type ReactNode } from 'react';

const metadata = {
  name: 'derp.trade beta',
  description: 'derp.trade beta',
  url: 'https://app.derp.trade',
  icons: ['https://app.derp.trade/favicon.ico'],
};

export const modal = createAppKit({
  adapters: [solanaWeb3JsAdapter],
  projectId,
  networks,
  metadata,
  themeMode: 'dark',
  features: {
    analytics: false
  },
  themeVariables: {}
});

const queryClient = new QueryClient();

function SolanaProvider({ children }: { children: ReactNode; }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default SolanaProvider;