import * as anchor from '@coral-xyz/anchor';

export const DERP_STATE_ID = new anchor.web3.PublicKey("Chwajw4G3gszCPqEE29qZGdRkGyLT4WnqpK2qp7TGrdU");

interface Market {
  id: number;
  name: string;
  pythAddress: anchor.web3.PublicKey;
}

export const markets = [
  {
    id: 0,
    name: "GOLD-DERP",
    pythAddress: new anchor.web3.PublicKey("2uPQGpm8X4ZkxMHxrAW1QuhXcse1AHEgPih6Xp9NuEWW"),
  },
  {
    id: 1,
    name: "SOL-DERP",
    pythAddress: new anchor.web3.PublicKey("7UVimffxr9ow1uXYxsr4LHAcV58mLzhmwaeKvJ1pjLiE"),
  },
  {
    id: 2,
    name: "FARTCOIN-DERP",
    pythAddress: new anchor.web3.PublicKey("2t8eUbYKjidMs3uSeYM9jXM9uudYZwGkSeTB4TKjmvnC"),
  },
] as const satisfies Market[];

export type MarketId = typeof markets[number]["id"];