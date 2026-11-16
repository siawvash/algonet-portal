import React from 'react';

export type ServiceIconVariant = 'on-purple' | 'purple';

interface Service3DIconProps {
  id?: string;
  iconName?: string;
  className?: string;
  variant?: ServiceIconVariant;
}

export const Service3DIcon: React.FC<Service3DIconProps> = ({
  id,
  iconName,
  className = 'size-[88px]',
  variant = 'on-purple'
}) => {
  // Normalize legacy IDs or direct icon names
  const iconMap: Record<string, string> = {
    'codal-price': 'general',
    'pmo': 'general',
    'sanjeh': 'general',
    'bazafarini': 'bazafarini',
    'leili': 'leili',
    'asr-datalake': 'general',
    'arzyab': 'general',
    'annotopia': 'general',
    'algoagent': 'general',
    'asr-service': 'general',
    'word-monitor': 'general',
    'nextcloud': 'nextcloud',
    'spark': 'spark',
    'kubeflow': 'general',
    'meet': 'jitsi',
    'wiki': 'wikijs',
    'time-sheet': 'time',
    'algodesk': 'desk',
    'chat': 'mattermost',
    'git': 'gitlab',
    'timesheet': 'time',
    'pm': 'openproject',
    'airflow': 'airflow',
    'openmetadata': 'openmetadata',
    'lakefs': 'lakefs',
    'mlflow': 'general',
    'nessie': 'general'
  };

  // Determine clean icon filename without extension
  const rawName = iconName
    ? iconName.replace(/\.(svg|png)$/i, '')
    : (id ? (iconMap[id] || id) : 'general');

  return (
    <div className={`relative flex items-center justify-center ${className} select-none pointer-events-none`}>
      {/* Light Mode: #6768ff colored icon */}
      <img
        src={`/icons/light/${rawName}.svg?v=8`}
        alt={rawName}
        className="size-full object-contain filter drop-shadow-[0_4px_12px_rgba(103,104,255,0.25)] select-none pointer-events-none transition-transform duration-300 group-hover:scale-105 dark:hidden"
        loading="lazy"
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          if (!target.src.includes('.png')) {
            target.src = `/icons/light/${rawName}.png`;
          } else if (!target.src.includes('/assets/icons/services/')) {
            target.src = `/assets/icons/services/light/${rawName}.svg?v=8`;
          }
        }}
      />
      {/* Dark Mode: Pure White (#ffffff) 3D layered icon */}
      <img
        src={`/icons/dark/${rawName}.svg?v=8`}
        alt={rawName}
        className="size-full object-contain filter drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)] select-none pointer-events-none transition-transform duration-300 group-hover:scale-105 hidden dark:block"
        loading="lazy"
        onError={(e) => {
          const target = e.currentTarget as HTMLImageElement;
          if (!target.src.includes('.png')) {
            target.src = `/icons/dark/${rawName}.png`;
          } else if (!target.src.includes('/assets/icons/services/')) {
            target.src = `/assets/icons/services/dark/${rawName}.svg?v=8`;
          }
        }}
      />
    </div>
  );
};
