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
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  // {
  //   name: 'Inbox',
  //   url: '/inbox',
  //   icon: 'icon-speedometer',
  //   badge: {
  //     variant: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   name: 'Activities',
  //   url: '/activities',
  //   icon: 'icon-cursor',
  //   children: [
  //     {
  //       name: 'Tracker',
  //       url: '/activities/activity',
  //       icon: 'icon-cursor'
  //     },
  //     {
  //       name: 'Activity Log',
  //       url: '/activities/log',
  //       icon: 'icon-cursor'
  //     }
  //   ]
  // },
  // {
  //   name: 'Games',
  //   url: '/games',
  //   icon: 'icon-cursor',
  //   children: [
  //     {
  //       name: 'Push',
  //       url: '/games/push',
  //       icon: 'icon-cursor'
  //     },
  //     {
  //       name: 'Journey',
  //       url: '/games/journey',
  //       icon: 'icon-cursor'
  //     },
  //     {
  //       name: 'Badges',
  //       url: '/games/badges',
  //       icon: 'icon-cursor'
  //     },
  //     {
  //       name: 'Leaderboard',
  //       url: '/games/leaderboard',
  //       icon: 'icon-cursor'
  //     }
  //   ]
  // },
  // {
  //   name: 'Body',
  //   url: '/body',
  //   icon: 'icon-cursor',
  //   children: [
  //     {
  //       name: 'Body Weight',
  //       url: '/body/weight',
  //       icon: 'icon-cursor'
  //     },
  //     {
  //       name: 'Body Fat',
  //       url: '/body/fat',
  //       icon: 'icon-cursor'
  //     }
  //   ]
  // },
  // {
  //   name: 'Upload',
  //   url: '/upload',
  //   icon: 'icon-cursor',
  //   children: [
  //     {
  //       name: 'Upload Ski Track',
  //       url: '/upload/skitracks',
  //       icon: 'icon-cursor'
  //     }
  //   ]
  // },
  // {
  //   name: 'Download Core',
  //   url: 'https://git.nxfifteen.rocks/nx-health/store',
  //   icon: 'icon-cloud-download',
  //   class: 'mt-auto',
  //   variant: 'success',
  //   attributes: { target: '_blank', rel: 'noopener' }
  // },
  // {
  //   name: 'NxFIFTEEN',
  //   url: 'https://nxfifteen.me.uk',
  //   icon: 'icon-layers',
  //   variant: 'danger',
  //   attributes: { target: '_blank', rel: 'noopener' }
  // }
];
