import Image from "next/image";

type BrandMarkProps = { priority?: boolean; variant?: "full" | "icon" };

const BrandMark = ({ priority = false, variant = "full" }: BrandMarkProps) => <Image alt="Elite Auto Studio" className={`brand-mark brand-mark--${variant}`} height={variant === "icon" ? 597 : 1086} priority={priority} src={variant === "icon" ? "/icon-square.jpeg" : "/elite-auto-studio-logo.jpeg"} width={variant === "icon" ? 596 : 1448} />;

export default BrandMark;
