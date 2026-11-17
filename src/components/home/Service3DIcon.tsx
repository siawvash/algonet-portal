import React from 'react';

export type ServiceIconVariant = 'on-purple' | 'purple';

interface Service3DIconProps {
  id?: string;
  iconName?: string;
  className?: string;
  variant?: ServiceIconVariant;
}

// Eagerly import all SVG assets so Vite inlines them as base64 Data URIs in singlefile builds
const lightIcons = import.meta.glob<string>('../../assets/icons/light/*.svg', { eager: true, import: 'default' });
const darkIcons = import.meta.glob<string>('../../assets/icons/dark/*.svg', { eager: true, import: 'default' });

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
    'kubeflow': 'kubeflow',
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
    'mlflow': 'mlflow',
    'nessie': 'nessie',
    'iceberg': 'iceberg'
  };

  // Determine clean icon filename without extension
  const rawName = iconName
    ? iconName.replace(/\.(svg|png)$/i, '')
    : (id ? (iconMap[id] || id) : 'general');

  const lightKey = `../../assets/icons/light/${rawName}.svg`;
  const fallbackLightKey = '../../assets/icons/light/general.svg';
  const darkKey = `../../assets/icons/dark/${rawName}.svg`;
  const fallbackDarkKey = '../../assets/icons/dark/general.svg';

  const lightSrc = lightIcons[lightKey] || lightIcons[fallbackLightKey] || `/icons/light/${rawName}.svg?v=9`;
  const darkSrc = darkIcons[darkKey] || darkIcons[fallbackDarkKey] || `/icons/dark/${rawName}.svg?v=9`;

  return (
    <div className={`relative flex items-center justify-center ${className} select-none pointer-events-none`}>
      {/* Light Mode: #6768ff colored icon */}
      <img
        src={lightSrc}
        alt={rawName}
        className="size-full object-contain filter drop-shadow-[0_4px_12px_rgba(103,104,255,0.25)] select-none pointer-events-none transition-transform duration-300 group-hover:scale-105 dark:hidden"
        loading="lazy"
      />
      {/* Dark Mode: Pure White (#ffffff) 3D layered icon */}
      <img
        src={darkSrc}
        alt={rawName}
        className="size-full object-contain filter drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)] select-none pointer-events-none transition-transform duration-300 group-hover:scale-105 hidden dark:block"
        loading="lazy"
      />
    </div>
  );
};
