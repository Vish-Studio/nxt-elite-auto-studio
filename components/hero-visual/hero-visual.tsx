import Image from "next/image";
import { publicAsset } from "@/lib/public-asset";

const HeroVisual = () => <div className="hero-visual"><Image alt="Véhicule noir préparé avec soin par Elite Auto Studio" fill priority sizes="(max-width: 760px) 100vw, 64vw" src={publicAsset("/hero-detailing-v2.png")} /></div>;

export default HeroVisual;
