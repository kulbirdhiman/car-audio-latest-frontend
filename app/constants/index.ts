export const USER_ROLE = {
  admin: 1,
  frontend_user: 2,
} as const;

export const ACCOUNT_STATUS = {
  SUSPEND: 0,
  VERIFIED: 1,
  DELETED: 2,
} as const;

export const DEPARTMENT_VIEW = {
  YES: 1,
  NO: 0,
};
export const is_car_product = {
  YES: true,
  NO: false,
};
export const CATEGORY_TYPE = {
  company: 1,
  other: 2,
};

export const IN_STOCK = 1;

export const IS_MULTY = 1;

export const STANDARD_DELIVERY = 1;
export const LOCAL_PICKUP = 2;

export const IS_MULTY_PRICE = 1;

export const PAYMENT_METHODS = {
  square_card: 1,
};

export const ORDER_STATUS = {
  processing: 1,
  shipped: 2,
  delivered: 3,
  canceled: 4,
  returned: 5,
  failed_payment: 6,
  trashed: 7,
};

export const SHIPPMENT_METHOD = {
  australia_post: 1,
  direct_freight_express: 2,
};

export const SHIP_TYPE = {
  manual: 1,
  automatice: 2,
};

export const PAYMENT_STATUS = {
  pending: 0,
  paid: 1,
};
export const COUPEN_TYPE = {
  product: 1,
  discount: 2,
  free_shiipping :3
};

export const COUPEN_DISCOUNT_TYPE = {
  parcentage: 1,
  value: 2,
};
export const COUPEN_PRICE_VALIDATION = {
  all: 1,
  based_on_price: 2,
};
export const COUPEN_CATEGORY_VALIDATION = {
  all: 1,
  department: 2,
  category: 3,
  product: 4,
};


export const COUPEN_APPLY_WITH_OTHER_COUPONS = {
  YES:1,
  NO : 0
}
export const COUPEN_APPLY_ON_DISCOUNTED_PRODUCT = {
  YES:1,
  NO : 0
}

export const COUPEN_APPLY_FOR_ALL_TIME = {
  YES:1,
  NO : 0
}

export const COUPEN_ACTIVATE = {
  YES:1,
  NO : 0
}



export const SHIPPMENT_TYPE = {
  manual : 1,
  automatic : 2
}

export const USER_MANUALS =[
  {
label:"Horizontal",
value :"user_manual/User_Manual_V6_Horizontal.pdf"
  },
  {
    label:"Vertical",
    value :"user_manual/User_Manual_V6_Vertical.pdf"
      }
] 
  
export const   OPTION_TYPE = {
custom :1,
checkbox : 0
}