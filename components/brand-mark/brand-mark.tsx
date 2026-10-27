import Image from "next/image";
import { publicAsset } from "@/lib/public-asset";

type BrandMarkProps = { className?: string; priority?: boolean; variant?: "full" | "icon" };

const assets = {
  full: { height: 1086, src: "/elite-auto-studio-logo.jpeg", width: 1448 },
  icon: { height: 597, src: "/icon-square.jpeg", width: 596 },
};

const BrandMark = ({ className, priority = false, variant = "full" }: BrandMarkProps) => {
  const { height, src, width } = assets[variant];
  return (
    <Image
      alt="Elite Auto Studio"
      className={className}
      height={height}
      priority={priority}
      src={publicAsset(src)}
      width={width}
    />
  );
};

export default BrandMark;
