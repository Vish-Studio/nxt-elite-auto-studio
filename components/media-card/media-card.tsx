import { ArrowUpRightIcon } from "@phosphor-icons/react/ssr";
import Image from "next/image";

type MediaCardProps = { title: string; label: string; variant: "large" | "small"; position?: string; src: string; credit: string; creditHref: string; unoptimized?: boolean };

const MediaCard = ({ title, label, variant, position = "center", src, credit, creditHref, unoptimized = false }: MediaCardProps) => <article className={`media-card media-card--${variant}`}><Image alt={title} fill sizes={variant === "large" ? "(max-width: 760px) calc(100vw - 40px), 45vw" : "(max-width: 760px) calc(100vw - 40px), 28vw"} src={src} style={{ objectPosition: position }} unoptimized={unoptimized} /><div className="media-card__shade" /><p className="media-card__label">{label}</p><div className="media-card__footer"><h3>{title}</h3><a className="media-card__credit" href={creditHref} rel="noreferrer" target="_blank">Photo: {credit} / Unsplash <ArrowUpRightIcon aria-hidden="true" size={12} weight="bold" /></a></div></article>;

export default MediaCard;
