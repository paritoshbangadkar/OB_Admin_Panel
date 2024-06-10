export const OPTIONS = {
    emailPattern: '^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$',
    upiPattern: '[a-zA-Z0-9.\\-_]{2,256}@[a-zA-Z]{2,64}',
    imageInfo: '(Only *.jpeg, *.jpg and *.png files are accepted)',
    imageType: 'Please upload the file in jpg, jpeg or png format',
    fileInfo: '(Only *.xlsx files are accepted)',
    fileType: 'Please upload the file in .xlsx format',
    documentType: 'Please upload the file in jpeg, png and pdf format',
    sizeLimit: 'Please upload the file that is less then 5mb',
    maxLimit: 5,
    maxLimitForNotification: 1,
    sizeLimitForNotification: 'Please upload the file that is less then 1mb',
};

export const confirmMessages = {
    deleteTitle: 'Delete ',
    deleteDescription: 'Are you sure you want to delete',
    hideTitle: 'Request',
    hideDescription: 'Are you sure you want to ',
    stockTitle: 'Stock request',
    stockDescription: 'Are you sure you want to make this product ',
    updateTitle: 'Update ',
    updateDescription: 'Are you sure you want to update',
};
export const registrationPlatform = {
    ANDROID: 'android',
    WEB: 'WEB',
};

export const monthsName = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
export const periodType = ['weekly', 'monthly', 'yearly'];
/**
 * Payment status
 */
export const bookingStatus = {
    PENDING: 'pending',
    DELIVERED: 'delivered',
    NEW: 'new',
    REJECTED: 'rejected',
};
export const defaultStatus = {
    ACTIVE: 'active',
    ACCEPTED: 'accepted',
    CLOSED: 'closed',
    PENDING: 'pending',
    INACTIVE: 'inactive',
    UNAPPROVED: 'unapproved',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    DELETED: 'deleted',
    EXPIRED: 'expired',
    ONBOARD: 'onboard',
    PREONBOARD: 'preonboard',
};

export const porterStatus = {
    PENDING: 'pending',
    ACCEPTED: 'accepted',
};
export const kycStatus = {
    YES: 'yes',
    No: 'no',
};
export const shopType = {
    WHOLE_SELLER: 'whole_seller',
    RETAILER: 'retailer',
};
export const ROLES = {
    SUPER_ADMIN: 'SUPER_ADMIN',
    ADMIN: 'ADMIN',
    SHOP: 'SHOP',
    SUPPLIER: 'SUPPLIER',
    CUSTOMER: 'CUSTOMER',
    EMPLOYEE: 'EMPLOYEE',
};
export const getAllRolesArray = () => {
    return [
        ROLES.SUPER_ADMIN,
        ROLES.ADMIN,
        ROLES.SHOP,
        ROLES.SUPPLIER,
        ROLES.CUSTOMER,
        ROLES.EMPLOYEE,
    ];
};
export const roleType = {
    SHOP: 'SHOP',
    SUPPLIER: 'SUPPLIER',
    CUSTOMER: 'CUSTOMER',
    MARKETING: 'MARKETING',
    SALES: 'SALES',
    ADMIN: 'ADMIN',
    EMPLOYEE: 'EMPLOYEE',
};
export const getRolesArray = () => {
    return [ROLES.SHOP, ROLES.SUPPLIER, ROLES.CUSTOMER, ROLES.EMPLOYEE];
};

export const imageExtension = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/svg',
    'image/gif',
    'webp',
];

export const fileExtension = [
    'application/pdf',
    'application/octet-stream',
    'application/xls',
    'application/xlsx',
    'application/csv',
    'application/xlsm',
    'application/doc',
    'application/docx',
    'application/txt',
    'application/tex',
    'application/zip',
];

export const videoExtension = ['video/mp4', 'video/x-m4v', 'video/3gp'];

export const messageCategory = {
    NORMAL: 'normal',
    MEDIA: 'media',
    LOCATION: 'location',
};

export const subCategoryType = {
    LARGE: 'large',
    MEDIUM: 'medium',
    SMALL: 'small',
};

export const orderStatus = {
    NEW: 'new',
    ACTIVE: 'active',
    COMPLETED: 'completed',
    CANCEL: 'cancelled',
};
export const getSubCategoryTypeArray = () => {
    return [subCategoryType.LARGE, subCategoryType.MEDIUM, subCategoryType.SMALL];
};

export const planType = {
    BRONZE: 'bronze',
    SILVER: 'silver',
    GOLD: 'gold',
    FREE_PLAN: 'free_plan',
};
export const getPlanTypeArray = () => {
    return [
        planType.BRONZE,
        planType.SILVER,
        planType.GOLD,
        planType.FREE_PLAN];
};

export const duration = {
    YEAR: 'year',
    MONTH: 'month',
    WEEK: 'week',
};
export const getDurationArray = () => {
    return [duration.YEAR, duration.MONTH, duration.WEEK];
};

export const UNITS = ['clear','g', 'kg', 'ml', 'ltr', 'dz', 'pk', 'bx', 'pcs', 'nos'];
