interface NavAttributes {
  [propName: string]: any;
}

interface NavWrapper {
  attributes: NavAttributes;
  element: string;
}

interface NavBadge {
  text: string;
  variant: string;
}

interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  children?: NavData[];
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: NavLabel;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'fa fa-dashboard'
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Fun',
  },
  {
    name: 'Leaderboard',
    url: '/rpg/leaderboard',
    icon: 'fa fa-users'
  },
  {
    name: '1:1 Challenges',
    url: '/rpg/challenges',
    icon: 'fa fa-trophy',
    badge: {
      variant: 'info',
      text: 'NEW'
    },
  },
  {
    name: 'Awards',
    url: '/achivements/awards',
    icon: 'fa fa-diamond',
    badge: {
      variant: 'info',
      text: 'NEW'
    },
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Stats',
  },
  {
    name: 'Body',
    url: '/body',
    icon: 'fa fa-balance-scale',
    children: [
      {
        name: 'Weight',
        url: '/body/weight',
        icon: 'medicalIcons-scale-tool-to-control-body-weight-standing-on-it'
      },
    ]
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Profile',
  },
  {
    name: 'Setup',
    url: '/setup',
    icon: 'fa fa-cogs',
    children: [
      {
        name: 'Profile',
        url: '/setup/profile',
        icon: 'fa fa-user'
      },
    ],
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Dev Panel',
  },
  {
    name: 'Theme',
    url: '/icons',
    icon: 'fa fa-code',
    badge: {
      variant: 'warning',
      text: 'DEV'
    },
    children: [
      {
        name: 'Colours',
        url: '/icons/colors',
        icon: 'fa fa-eyedropper'
      },
      {
        name: 'BucketISO',
        url: '/icons/bucketiso',
        icon: 'fa fa-file-image-o'
      },
      {
        name: 'Fontawsome',
        url: '/icons/fontawsome',
        icon: 'fa fa-file-image-o'
      },
      {
        name: 'Nomie',
        url: '/icons/nomie',
        icon: 'fa fa-file-image-o'
      },
      {
        name: 'Simple Line Icons',
        url: '/icons/simple-line-icons',
        icon: 'fa fa-file-image-o'
      },
    ]
  },
];
