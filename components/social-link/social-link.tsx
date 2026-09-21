type SocialLinkProps = { href: string; label: string };

const SocialLink = ({ href, label }: SocialLinkProps) => <a className="social-link" href={href} rel="noreferrer" target="_blank"><span>{label}</span><span aria-hidden="true">↗</span></a>;

export default SocialLink;
