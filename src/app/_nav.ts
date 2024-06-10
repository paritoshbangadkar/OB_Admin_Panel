import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'App Update',
    url: '/in-app-update',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW',
    },
  },
  {
    name: 'Bharat Online',
    title: true,
  },
  {
    name: 'Onboard Business',
    url: '/onboard-shop',
    icon: 'cil-child-friendly',
  },
  {
    name: 'Business',
    url: '/shop/shop-list',
    icon: 'cil-cart',
  },

  {
    name: 'Customer',
    url: '/customer/customer-list',
    icon: 'icon-user',
  },
  {
    name: 'Business Type',
    url: '/businessType/business-list',
    icon: 'cil-map',
  },
  {
    name: 'Subscription Plan',
    url: '/plan/plan',
    icon: 'cil-image-plus',
  },
  {
    name: 'Purchased Plan',
    url: '/transaction/transaction-list',
    icon: 'cil-image-plus',
  },
  {
    name: 'Category Management',
    icon: 'cil-layers',
    url: '/users',
    children: [
      {
        name: 'Category',
        url: '/category/category-list',
        icon: 'cil-window-maximize',
      },
      {
        name: 'Category Advertise',
        url: '/category/advertise',
        icon: 'cil-image-plus',
      },
      {
        name: 'Category Offer',
        url: '/category/offers',
        icon: 'cil-image-plus',
      },
      {
        name: 'Category Deals',
        url: '/category/deals',
        icon: 'cil-image-plus',
      },
    ],
  },
  {
    name: ' Sub Category',
    url: '/subCategory/subCategory-list',
    icon: 'cil-window-maximize',
  },
  {
    name: 'Advertise',
    url: '/advertise/advertise-list',
    icon: 'cil-image-plus',
  },
  {
    name: 'Offer',
    url: '/offer/offer-list',
    icon: 'cil-image-plus',
  },
  {
    // name: 'Seasonal Offer',
    name: 'Deals',
    url: '/seasonal-offer/list',
    icon: 'cil-image-plus',
  },
  {
    // name: 'Seasonal Offer',
    name: 'Event-Popup',
    url: '/in-app-ad-modal/in-app-ad-modal-list',
    icon: 'cil-image-plus',
  },
  {
    name: 'User Analytics',
    url: '/user-analytics/user-analytics-list',
    icon: 'cil-map',
  },
  {
    name: 'Porter',
    url: '/porter/porter-list',
    icon: 'cil-bike',
  },
  {
    name: 'Exotel Calling',
    url: '/exotel-call/call-list',
    icon: 'cil-phone',
  },
  {
    name: 'Miscellaneous',
    icon: 'cil-layers',
    url: '/users',
    children: [
      {
        name: 'Support',
        url: '/support/list',
        icon: 'cid-settings',
      },
      {
        name: 'Report',
        url: '/report/list',
        icon: 'cis-report',
      },
      {
        name: 'Deleted Business',
        url: '/deleted-business/list',
        icon: 'cil-cart',
      },
      {
        name: 'Coin Management',
        url: '/coin-management/list',
        icon: 'cil-money',
      },
    ],
  },
  {
    name: 'Events',
    url: '/event/list',
    icon: 'cil-calendar',
  },
  {
    name: 'Notification',
    url: '/notification/notification-list',
    icon: 'cil-bell',
  },
  {
    name: 'Account Setting',
    url: '/users/users',
    icon: 'cil-settings',
  },
];
export const navItemsMarketing: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW',
    },
  },
  {
    name: 'Bharat Online',
    title: true,
  },
  {
    name: 'Offer',
    url: '/offer/offer-list',
    icon: 'cil-image-plus',
  },
  {
    name: 'Advertise',
    url: '/advertise/advertise-list',
    icon: 'cil-image-plus',
  },
];

export const navItemsSales: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW',
    },
  },
  {
    name: 'Bharat Online',
    title: true,
  },
  {
    name: 'Users Management',
    icon: 'icon-user',
    url: '/users',
    children: [
      {
        name: 'Shop',
        url: '/shop/shop-list',
        icon: 'icon-user',
      },
    ],
  },

];

export const navItemsAdmin: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW',
    },
  },
  {
    name: 'Bharat Online',
    title: true,
  },
  {
    name: 'Users Management',
    icon: 'icon-user',
    url: '/users',
    children: [
      {
        name: 'Shop',
        url: '/shop/shop-list',
        icon: 'icon-user',
      },
      {
        name: 'Customer',
        url: '/customer/customer-list',
        icon: 'icon-user',
      },
    ],
  },
  {
    name: ' Sub Category',
    url: '/subCategory/subCategory-list',
    icon: 'cil-window-maximize',
  },
];
