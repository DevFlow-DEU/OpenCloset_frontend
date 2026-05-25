import styles from "./CategoryLink.module.css";
import { Link } from "react-router-dom";
import { type ReactNode } from "react";
import TopsIcon from "../../assets/icon/Category/Tops.svg?react";
import PantsIcon from "../../assets/icon/Category/Pants.svg?react";
import OuterIcon from "../../assets/icon/Category/Outer.svg?react";
import BagIcon from "../../assets/icon/Category/Bag.svg?react";
import JewelryIcon from "../../assets/icon/Category/Jewelry.svg?react";
import OnePieceIcon from "../../assets/icon/Category/OnePiece.svg?react";
import ShoesIcon from "../../assets/icon/Category/Shoes.svg?react";
import AccessoryIcon from "../../assets/icon/Category/Accessory.svg?react";

const clothTypeIconMap = {
  top: TopsIcon,
  pants: PantsIcon,
  outer: OuterIcon,
  bag: BagIcon,
  jewerly: JewelryIcon,
  onepiece: OnePieceIcon,
  shoes: ShoesIcon,
  accessory: AccessoryIcon,
} as const;

const clothTypeLabelMap = {
  top: "상의",
  pants: "하의",
  outer: "아우터",
  bag: "가방",
  jewerly: "쥬얼리",
  onepiece: "원피스",
  shoes: "신발",
  accessory: "액세서리",
} as const;

interface Props {
  to: string;
  clothType:
    | "top"
    | "pants"
    | "outer"
    | "bag"
    | "jewerly"
    | "onepiece"
    | "shoes"
    | "accessory";
}

export default function CategoryLink({ to, clothType }: Props) {
  const icon = clothTypeIconMap[clothType]({
    width: "41.5px",
    height: "41.5px",
  });
  return (
    <Link to={to} className={styles.link}>
      <div className={styles.iconContainer}>{icon as ReactNode}</div>
      {clothTypeLabelMap[clothType]}
    </Link>
  );
}
