import Image from "next/image";

type MediaCardProps = { title: string; label: string; variant: "large" | "small"; position?: string; src: string; unoptimized?: boolean };

const MediaCard = ({ title, label, variant, position = "center", src, unoptimized = false }: MediaCardProps) => <article className={`relative min-h-[500px] overflow-hidden text-[var(--color-ivory)] max-[760px]:min-h-[430px] ${variant === "large" ? "max-[1040px]:col-span-full max-[760px]:col-auto" : ""}`}><Image alt={title} className="object-cover" fill sizes={variant === "large" ? "(max-width: 760px) calc(100vw - 40px), 45vw" : "(max-width: 760px) calc(100vw - 40px), 28vw"} src={src} style={{ objectPosition: position }} unoptimized={unoptimized} /><div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(5,5,5,0.92),transparent_62%),linear-gradient(180deg,rgba(5,5,5,0.55),transparent_22%)]" /><p className="absolute top-[1.4rem] left-[1.4rem] m-0 text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-[var(--color-gold)]">{label}</p><div className="absolute right-[1.4rem] bottom-[1.4rem] left-[1.4rem]"><h3 className="m-0 text-[clamp(1.4rem,2vw,2rem)] font-normal tracking-[-0.025em]">{title}</h3></div></article>;

export default MediaCard;
