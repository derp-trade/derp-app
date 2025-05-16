import * as anchor from '@coral-xyz/anchor';
import GoldIcon from "../../public/images/gold.png";
import SolIcon from "../../public/images/solana.png";
import FartcoinIcon from "../../public/images/fartcoin.png";
import { StaticImageData } from "next/image";

export const DERP_STATE_ID = new anchor.web3.PublicKey("Chwajw4G3gszCPqEE29qZGdRkGyLT4WnqpK2qp7TGrdU");

interface Market {
  id: number;
  name: string;
  underlyingName: string;
  pythAddress: anchor.web3.PublicKey;
  icon: StaticImageData;
}

export const markets = [
  {
    id: 0,
    name: "GOLD-DERP",
    underlyingName: "GOLD",
    pythAddress: new anchor.web3.PublicKey("2uPQGpm8X4ZkxMHxrAW1QuhXcse1AHEgPih6Xp9NuEWW"),
    icon: GoldIcon,
  },
  {
    id: 1,
    name: "SOL-DERP",
    underlyingName: "SOL",
    pythAddress: new anchor.web3.PublicKey("7UVimffxr9ow1uXYxsr4LHAcV58mLzhmwaeKvJ1pjLiE"),
    icon: SolIcon,
  },
  {
    id: 2,
    name: "FARTCOIN-DERP",
    underlyingName: "FARTCOIN",
    pythAddress: new anchor.web3.PublicKey("2t8eUbYKjidMs3uSeYM9jXM9uudYZwGkSeTB4TKjmvnC"),
    icon: FartcoinIcon,
  },
] as const satisfies Market[];

export type MarketId = typeof markets[number]["id"];