// Mock data for the Messages tab

// Chat messages data
export const chatData = [
  {
    id: '1',
    name: 'Nike Support',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessage: 'Your order #NKE28491 has been shipped!',
    time: '10:30 AM',
    unread: 2,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Adidas Store',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    lastMessage: 'Thank you for your purchase. How can we help you today?',
    time: 'Yesterday',
    unread: 0,
    isOnline: false,
  },
  {
    id: '3',
    name: 'Puma Official',
    avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
    lastMessage: 'We have received your return request. Our team will process it shortly.',
    time: 'Yesterday',
    unread: 1,
    isOnline: true,
  },
  {
    id: '4',
    name: 'Under Armour',
    avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
    lastMessage: 'Your 20% discount code is: UA20OFF. Valid until next week!',
    time: 'Mon',
    unread: 0,
    isOnline: false,
  },
];

// Orders data
export const ordersData = [
  {
    id: 'ORD-39481',
    store: 'Nike',
    storeAvatar: 'https://cdn.iconscout.com/icon/free/png-256/free-nike-1-202653.png',
    date: '02 Apr 2025',
    items: [
      { name: 'Air Max 270', quantity: 1, price: 150 }
    ],
    status: 'Shipped',
    deliveryDate: '05 Apr 2025',
    total: 150,
  },
  {
    id: 'ORD-28371',
    store: 'Adidas',
    storeAvatar: 'https://cdn.iconscout.com/icon/free/png-256/free-adidas-282428.png',
    date: '29 Mar 2025',
    items: [
      { name: 'Ultraboost 22', quantity: 1, price: 180 },
      { name: 'Track Pants', quantity: 2, price: 45 }
    ],
    status: 'Delivered',
    deliveryDate: '01 Apr 2025',
    total: 270,
  },
  {
    id: 'ORD-19283',
    store: 'Puma',
    storeAvatar: 'https://cdn.iconscout.com/icon/free/png-256/free-puma-3421676-2855074.png',
    date: '25 Mar 2025',
    items: [
      { name: 'RS-X Sneakers', quantity: 1, price: 110 }
    ],
    status: 'Processing',
    deliveryDate: '07 Apr 2025',
    total: 110,
  },
];

// Activities data
export const activitiesData = [
  {
    id: 'ACT-1',
    type: 'price_drop',
    title: 'Price Drop Alert',
    description: 'Nike Air Force 1 is now 20% off',
    time: '2 hours ago',
    icon: 'trending-down',
    color: '#FF5722',
  },
  {
    id: 'ACT-2',
    type: 'restock',
    title: 'Back in Stock',
    description: 'Adidas Yeezy Boost 350 is now available',
    time: '5 hours ago',
    icon: 'inventory',
    color: '#4CAF50',
  },
  {
    id: 'ACT-3',
    type: 'order_update',
    title: 'Order Update',
    description: 'Your order #ORD-39481 has been shipped',
    time: 'Yesterday',
    icon: 'local-shipping',
    color: '#2196F3',
  },
  {
    id: 'ACT-4',
    type: 'wishlist',
    title: 'Wishlist Item on Sale',
    description: 'Puma Suede Classic is now on sale',
    time: '2 days ago',
    icon: 'favorite',
    color: '#E91E63',
  },
];

// Promotions data
export const promosData = [
  {
    id: 'PROMO-1',
    title: 'Summer Sale',
    description: 'Get up to 50% off on selected summer items',
    store: 'Nike',
    validUntil: 'April 15, 2025',
    code: 'SUMMER50',
    image: 'https://img.freepik.com/free-psd/summer-sale-70-discount_23-2148476960.jpg',
    color: '#FF9800',
  },
  {
    id: 'PROMO-2',
    title: 'New Member Discount',
    description: '20% off on your first purchase',
    store: 'Adidas',
    validUntil: 'April 30, 2025',
    code: 'WELCOME20',
    image: 'https://img.freepik.com/free-vector/special-offer-creative-sale-banner-design_1017-16284.jpg',
    color: '#03A9F4',
  },
  {
    id: 'PROMO-3',
    title: 'Flash Sale',
    description: '24 hours only! 30% off on all footwear',
    store: 'Puma',
    validUntil: 'April 3, 2025',
    code: 'FLASH30',
    image: 'https://img.freepik.com/free-vector/flash-sale-background-with-thunder_23-2147919877.jpg',
    color: '#673AB7',
  },
];
