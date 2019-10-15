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
    name: 'Awards',
    url: '/achievements/awards',
    icon: 'fa fa-diamond',
  },
  {
    name: 'Compete',
    url: '/rpg',
    icon: 'fa fa-book',
    children: [
      {
        name: 'Leaderboard',
        url: '/rpg/leaderboard',
        icon: 'fa fa-users'
      },
      {
        name: '1:1 Challenges',
        url: '/rpg/challenges',
        icon: 'fa fa-trophy',
      },
    ]
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
    name: 'Activities',
    url: '/activities',
    icon: 'fa fa-book',
    children: [
      /*{
        name: 'Activity Tracker',
        url: '/activities/activity',
        icon: 'fa fa-percent'
      },*/
      {
        name: 'Activity Log',
        url: '/activities/log',
        icon: 'fa fa-archive'
      },
    ]
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Settings',
  },
  {
    name: 'Profile',
    url: '/setup/profile',
    icon: 'fa fa-user'
  },
  {
    name: 'Select Your Account',
    url: '/setup/oauth',
    icon: 'fa fa-user'
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Help',
  },
  {
    name: 'Patreon',
    url: '/help/patreon',
    icon: 'fa fa-user'
  },
  {
    name: 'Privacy Policy',
    url: '/help/privacy',
    icon: 'fa fa-user'
  },
  {
    name: 'Terms of Service',
    url: '/help/terms',
    icon: 'fa fa-user'
  },
  {
    divider: true
  },
  /*{
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
  },*/
];
