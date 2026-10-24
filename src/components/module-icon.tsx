import { useId } from 'react';
import {
  House,
  UserRound,
  FolderCode,
  BriefcaseBusiness,
  Layers,
  BadgeCheck,
  Mail,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const moduleIcons = {
  '00': House,
  '01': UserRound,
  '02': FolderCode,
  '03': BriefcaseBusiness,
  '04': Layers,
  '05': BadgeCheck,
  '06': Mail,
};

export type ModuleIndex = keyof typeof moduleIcons;

export function ModuleIcon({
  index,
  className,
  chrome = false,
  chromeLight = false,
  icon,
  size = 16,
}: {
  index: ModuleIndex;
  className?: string;
  chrome?: boolean;
  chromeLight?: boolean;
  icon?: LucideIcon;
  size?: number;
}) {
  const Icon = icon ?? moduleIcons[index];
  const gradientId = useId().replaceAll(':', '');
  return (
    <Icon
      className={className}
      size={size}
      strokeWidth={chrome ? 1.8 : 1.6}
      aria-hidden="true"
      focusable="false"
      style={chrome ? { '--chrome-icon-stroke': `url(#${gradientId})` } as React.CSSProperties : undefined}
    >
      {chrome && (
        <defs>
          {chromeLight ? (
            <radialGradient
              id={gradientId}
              cx="var(--pointer-x, 50%)"
              cy="var(--pointer-y, 50%)"
              r="85%"
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
              <stop offset="32%" stopColor="#ffffff" stopOpacity="0.6" />
              <stop offset="68%" stopColor="var(--jb-silver-hi)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--jb-silver-hi)" stopOpacity="0" />
            </radialGradient>
          ) : (
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--jb-silver-hi)" />
              <stop offset="18%" stopColor="#ededed" />
              <stop offset="52%" stopColor="var(--jb-silver-mid)" />
              <stop offset="76%" stopColor="#666666" />
              <stop offset="100%" stopColor="var(--jb-silver-low)" />
            </linearGradient>
          )}
        </defs>
      )}
    </Icon>
  );
}
