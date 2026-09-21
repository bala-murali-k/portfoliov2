import { faEnvelope, faCalendar, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { ContactChannel } from '@content/contact';

interface ChannelsProps {
  channels: ContactChannel[];
}

const ICONS: Record<string, IconProp> = {
  email: faEnvelope,
  mail: faEnvelope,
  github: faGithub,
  linkedin: faLinkedin,
  calendar: faCalendar,
  cal: faCalendar,
};

const FALLBACK_ICON = faArrowUpRightFromSquare;

const getIcon = (platform: string): IconProp => {
  return ICONS[platform.toLowerCase().trim()] ?? FALLBACK_ICON;
};

export default function Channels({ channels }: ChannelsProps) {
  return (
    <div data-component="contact-channels">
      <ul data-channels-list>
        {channels.map(({ platform, value, href }) => (
          <li key={platform} data-channel-item>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              data-icon-link
              aria-label={value || platform}
            >
              <div data-channel-icon-wrap>
                <FontAwesomeIcon icon={getIcon(platform)} aria-hidden="true" />
              </div>
              <div data-channel-text>
                <span data-platform-name>{platform}</span>
                <span data-platform-value>{value}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
