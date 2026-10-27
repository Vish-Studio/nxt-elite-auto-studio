import { ArrowUpRightIcon, FacebookLogoIcon, TiktokLogoIcon } from "@phosphor-icons/react/ssr";
import TrackedLink from "@/components/analytics/tracked-link";

type SocialLinkProps = { href: string; label: "Facebook" | "TikTok" };

const SocialLink = ({ href, label }: SocialLinkProps) => {
  const PlatformIcon = label === "Facebook" ? FacebookLogoIcon : TiktokLogoIcon;
  return (
    <TrackedLink
      event="social_click"
      eventParams={{ network: label.toLowerCase() }}
      className="inline-flex items-center gap-[0.55rem] bg-gold-soft px-3 py-2 text-[0.74rem] whitespace-nowrap text-ivory! uppercase [&>svg:first-child]:text-gold"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      <PlatformIcon aria-hidden="true" size={15} weight="fill" />
      <span>{label}</span>
      <ArrowUpRightIcon aria-hidden="true" className="text-fog" size={12} weight="bold" />
    </TrackedLink>
  );
};

export default SocialLink;
