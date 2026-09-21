import Image from "next/image";

type MediaCardProps = { title: string; label: string; variant: "large" | "small"; position: string };

const MediaCard = ({ title, label, variant, position }: MediaCardProps) => <article className={`media-card media-card--${variant}`}><Image alt={title} fill sizes={variant === "large" ? "(max-width: 760px) 100vw, 50vw" : "(max-width: 760px) 50vw, 25vw"} src="/hero-detailing-v2.png" style={{ objectPosition: position }} /><div className="media-card__shade" /><div className="media-card__meta"><span>{label}</span><span>↗</span></div><h3>{title}</h3></article>;

export default MediaCard;
