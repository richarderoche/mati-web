import { SocialLink } from '@/sanity.types'
import SocialIcon from './SocialIcon'

export interface SocialIconListProps {
  socialIcons: SocialLink[]
}

export default function SocialIconList({ socialIcons }: SocialIconListProps) {
  return (
    <div className="flex gap-gut lg:gap-gut-50">
      {socialIcons.map((link, key) => {
        return (
          <a
            key={key}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-24 hover:text-body-subtle transition-colors"
            aria-label={link.icon}
          >
            <SocialIcon name={link.icon} />
          </a>
        )
      })}
    </div>
  )
}
