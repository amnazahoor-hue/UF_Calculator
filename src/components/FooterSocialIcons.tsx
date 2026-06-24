import type { IconType } from "react-icons";
import { FaFacebook, FaInstagram, FaPinterest, FaQuora, FaReddit, FaXTwitter, FaYoutube } from "react-icons/fa6";

export type SocialIconId = "x" | "reddit" | "quora" | "youtube" | "facebook" | "instagram" | "pinterest";

type FooterSocialIconProps = {
  id: SocialIconId;
  className?: string;
};

const socialIcons: Record<SocialIconId, IconType> = {
  x: FaXTwitter,
  reddit: FaReddit,
  youtube: FaYoutube,
  facebook: FaFacebook,
  instagram: FaInstagram,
  quora: FaQuora,
  pinterest: FaPinterest,
};
export function FooterSocialIcon({ id, className }: FooterSocialIconProps) {
  const Icon = socialIcons[id];
  return <Icon className={className} aria-hidden />;
}
