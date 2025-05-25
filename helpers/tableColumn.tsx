import {
  CATEGORY_TYPE,
  DEPARTMENT_VIEW,
  ORDER_STATUS,
  PAYMENT_STATUS,
} from "@/app/constants";
import Link from "next/link";

export const department_colomn = (
  toggleDrawer: (data?: Record<string, any>) => void,
  openDelModel: (data?: Record<string, any>) => void
) => {
  return [
    {
      title: "S.no ",
      key: "department_id",
      transform: (value: any, row: any, index: number) => <p>{index + 1}</p>,
    },
    {
      title: "Name",
      key: "name",
    },
    {
      title: "Slug",
      key: "slug",
    },
    {
      title: "Title",
      key: "title",
    },
    {
      title: "Menu View",
      key: "is_view",
      transform: (value: number) => {
        return <p> {value == DEPARTMENT_VIEW.YES ? "Yes" : "No"}</p>;
      },
    },
    {
      title: "Description",
      key: "description",
    },
    {
      title: "Created At",
      key: "created_at",
      transform: (value: string) => {
        const [date] = value.split("T");
        return <p>{date}</p>;
      },
    },
    {
      title: "Action",
      key: "action",
      transform: (value: any, row: any) => (
        <div className="flex gap-2">
          <button
            className="hover:text-violet-600 "
            onClick={() => {
              toggleDrawer({ ...row });
            }}
          >
            Edit
          </button>
          <button
            className="hover:text-red-400 "
            onClick={() => {
              openDelModel({ ...row });
            }}
          >
            delete
          </button>
        </div>
      ),
    },
  ];
};

export const category_colomn = (
  toggleDrawer: (data?: Record<string, any>) => void,
  openDelModel: (data?: Record<string, any>) => void
) => {
  return [
    {
      title: "S.no ",
      key: "category_id",
      transform: (value: any, row: any, index: number) => <p>{index + 1}</p>,
    },
    {
      title: "Name",
      key: "name",
    },
    {
      title: "Slug",
      key: "slug",
    },
    {
      title: "Title",
      key: "title",
    },
    {
      title: "Type",
      key: "type",
      transform: (value: number) => {
        return <p> {value == CATEGORY_TYPE.company ? "Company" : "Other"}</p>;
      },
    },
    {
      title: "Description",
      key: "description",
    },
    {
      title: "Created At",
      key: "created_at",
      transform: (value: string) => {
        const [date] = value.split("T");
        return <p>{date}</p>;
      },
    },
    {
      title: "Action",
      key: "action",
      transform: (value: any, row: any) => (
        <div className="flex gap-2">
          <button
            className="hover:text-violet-600 "
            onClick={() => {
              toggleDrawer({ ...row });
            }}
          >
            Edit
          </button>
          <button
            className="hover:text-red-400 "
            onClick={() => {
              openDelModel({ ...row });
            }}
          >
            delete
          </button>
          <Link href={`/admin/categories/${row.slug}`}>view</Link>
        </div>
      ),
    },
  ];
};

export const model_colomn = (
  toggleDrawer: (data?: Record<string, any>) => void,
  openDelModel: (data?: Record<string, any>) => void
) => {
  return [
    {
      title: "S.no ",
      key: "category_id",
      transform: (value: any, row: any, index: number) => <p>{index + 1}</p>,
    },
    {
      title: "Name",
      key: "name",
    },
    {
      title: "Slug",
      key: "slug",
    },
    {
      title: "Title",
      key: "title",
    },

    {
      title: "Description",
      key: "description",
    },
    {
      title: "Created At",
      key: "created_at",
      transform: (value: string) => {
        const [date] = value.split("T");
        return <p>{date}</p>;
      },
    },
    {
      title: "Action",
      key: "action",
      transform: (value: any, row: any) => (
        <div className="flex gap-2">
          <button
            className="hover:text-violet-600 "
            onClick={() => {
              toggleDrawer({ ...row });
            }}
          >
            Edit
          </button>
          <button
            className="hover:text-red-400 "
            onClick={() => {
              openDelModel({ ...row });
            }}
          >
            delete
          </button>
        </div>
      ),
    },
  ];
};

export const product_colomn = (
  toggleDrawer: (data?: Record<string, any>) => void,
  openDelModel: (data?: Record<string, any>) => void
) => {
  return [
    {
      title: "S.no ",
      key: "department_id",
      transform: (value: any, row: any, index: number) => <p>{index + 1}</p>,
    },
    {
      title: "Name",
      key: "name",
    },
    {
      title: "Slug",
      key: "slug",
    },
    {
      title: "Title",
      key: "title",
    },

    {
      title: "Created At",
      key: "created_at",
      transform: (value: string) => {
        const [date] = value.split("T");
        return <p>{date}</p>;
      },
    },
    {
      title: "Action",
      key: "action",
      transform: (value: any, row: any) => (
        <div className="flex gap-2">
          <Link
            href={`/admin/products/${row.slug}`}
            className="hover:text-violet-600 "
            onClick={() => {
              toggleDrawer({ ...row });
            }}
          >
            Edit
          </Link>
          <button
            className="hover:text-red-400 "
            onClick={() => {
              openDelModel({ ...row });
            }}
          >
            delete
          </button>
        </div>
      ),
    },
  ];
};

export const add_on_colomn = (
  toggleDrawer: (data?: Record<string, any>) => void,
  openDelModel: (data?: Record<string, any>) => void
) => {
  return [
    {
      title: "S.no ",
      key: "department_id",
      transform: (value: any, row: any, index: number) => <p>{index + 1}</p>,
    },
    {
      title: "Name",
      key: "name",
    },

    {
      title: "No of Extras ",
      key: "extras",
      transform: (value: any[]) => {
        return <p>{value.length}</p>;
      },
    },

    {
      title: "Created At",
      key: "created_at",
      transform: (value: string) => {
        const [date] = value.split("T");
        return <p>{date}</p>;
      },
    },
    {
      title: "Action",
      key: "action",
      transform: (value: any, row: any) => (
        <div className="flex gap-2">
          <button
            className="hover:text-violet-600 "
            onClick={() => {
              toggleDrawer({ ...row });
            }}
          >
            Edit
          </button>
          <button
            className="hover:text-red-400 "
            onClick={() => {
              openDelModel({ ...row });
            }}
          >
            delete
          </button>
        </div>
      ),
    },
  ];
};

export const variation_colomn = (
  toggleDrawer: (data?: Record<string, any>) => void,
  openDelModel: (data?: Record<string, any>) => void
) => {
  return [
    {
      title: "S.no ",
      key: "department_id",
      transform: (value: any, row: any, index: number) => <p>{index + 1}</p>,
    },
    {
      title: "Name",
      key: "name",
    },

    {
      title: "Title",
      key: "title",
    },

    {
      title: "No of Options ",
      key: "options",
      transform: (value: any[]) => {
        return <p>{value.length}</p>;
      },
    },

    {
      title: "Created At",
      key: "created_at",
      transform: (value: string) => {
        const [date] = value.split("T");
        return <p>{date}</p>;
      },
    },
    {
      title: "Action",
      key: "action",
      transform: (value: any, row: any) => (
        <div className="flex gap-2">
          <button
            className="hover:text-violet-600 "
            onClick={() => {
              toggleDrawer({ ...row });
            }}
          >
            Edit
          </button>
          <button
            className="hover:text-red-400 "
            onClick={() => {
              openDelModel({ ...row });
            }}
          >
            delete
          </button>
        </div>
      ),
    },
  ];
};

export const orders_colomn = () => {
  return [
    {
      title: "S.no ",
      key: "department_id",
      transform: (value: any, row: any, index: number) => <p>{index + 1}</p>,
    },
    {
      title: "Order ",
      key: "order_id",
      transform: (value: any, row: any, index: number) => (
        <Link href={`/admin/orders/retail/${row.id}`} className="">
          {" "}
          #{row.id + 108956} {row.user_detail.name}
        </Link>
      ),
    },
    {
      title: "Status",
      key: "status",
      transform: (value: string, row: any) => {
        const statusMap: Record<string, string> = {
          [ORDER_STATUS.processing]: "Processing",
          [ORDER_STATUS.canceled]: "Cancelled",
          [ORDER_STATUS.shipped]: "Shipped",
          [ORDER_STATUS.delivered]: "Delivered",
          [ORDER_STATUS.returned]: "Refunded",
          [ORDER_STATUS.trashed]: "Trashed",
        };
        if (row.status === ORDER_STATUS.trashed) {
          return <p>Trashed </p>;
        }
        if (row.payment_status === PAYMENT_STATUS.pending) {
          return <p>Failed Payment </p>;
        }

        return <p>{statusMap[value] || "Unknown"}</p>;
      },
    },

    {
      title: "Created At",
      key: "created_at",
      transform: (value: string) => {
        const [date] = value.split("T");
        return <p>{date}</p>;
      },
    },
    {
      title: "Billing Address",
      key: "billing_address",
      transform: (value: any) => (
        <div className="   ">
          <p className="mt-2 text-gray-700">
            {value.city}, {value.state.name} ({value.state.state_code}),
          </p>
          <p className="mt-2 text-gray-700">
            {value.country.name} ({value.country.iso2}) - {value.postcode}
          </p>
          <p className="mt-2 text-gray-700">
            <span className="font-medium">{value.street_address}, </span>
          </p>
        </div>
      ),
    },

    {
      title: "Shipping Address",
      key: "shipping_address",
      transform: (value: any) => (
        <div className="   ">
          <p className="mt-2 text-gray-700">
            {value.city}, {value.state.name} ({value.state.state_code}),
          </p>
          <p className="mt-2 text-gray-700">
            {value.country.name} ({value.country.iso2}) - {value.postcode}
          </p>
          <p className="mt-2 text-gray-700">
            <span className="font-medium">{value.street_address}, </span>
          </p>
        </div>
      ),
    },

    {
      title: "Total",
      key: "total_paid_value",
    },
  ];
};


export const address_colomn = (
 
) => {
  return [
    {
      title: "S.no ",
      key: "category_id",
      transform: (value: any, row: any, index: number) => <p>{index + 1}</p>,
    },
    {
      title: "City",
      key: "city",
    },
  
    {
      title: "State",
      key: "state",
      transform: (value: any) => {
 
        return <p>{value.name}</p>;
      },
    },
    {
      title: "Country",
      key: "country",
      transform: (value: any) => {
 
        return <p>{value.name}</p>;
      },
    },

    {
      title: "Description",
      key: "street_address",
    },
    
    {
      title: "Created At",
      key: "created_at",
      transform: (value: string) => {
        const [date] = value.split("T");
        return <p>{date}</p>;
      },
    },
    // {
    //   title: "Action",
    //   key: "action",
    //   transform: (value: any, row: any) => (
    //     <div className="flex gap-2">
    //       <button
    //         className="hover:text-violet-600 "
    //         onClick={() => {
    //           toggleDrawer({ ...row });
    //         }}
    //       >
    //         Edit
    //       </button>
    //       <button
    //         className="hover:text-red-400 "
    //         onClick={() => {
    //           openDelModel({ ...row });
    //         }}
    //       >
    //         delete
    //       </button>
    //     </div>
    //   ),
    // },
  ];
};


export const my_orders_colomn = () => {
  return [
    {
      title: "S.no ",
      key: "department_id",
      transform: (value: any, row: any, index: number) => <p>{index + 1}</p>,
    },
    {
      title: "Order ",
      key: "order_id",
      transform: (value: any, row: any, index: number) => (
        <Link href={`/admin/orders/retail/${row.id}`} className="">
          {" "}
          #{row.id + 108956} {row.user_detail.name}
        </Link>
      ),
    },
    {
      title: "Status",
      key: "status",
      transform: (value: string, row: any) => {
        const statusMap: Record<string, string> = {
          [ORDER_STATUS.processing]: "Processing",
          [ORDER_STATUS.canceled]: "Cancelled",
          [ORDER_STATUS.shipped]: "Shipped",
          [ORDER_STATUS.delivered]: "Delivered",
        };

        if (row.payment_status === PAYMENT_STATUS.pending) {
          return <p>Failed Payment </p>;
        }

        return <p>{statusMap[value] || "Unknown"}</p>;
      },
    },

    {
      title: "Created At",
      key: "created_at",
      transform: (value: string) => {
        const [date] = value.split("T");
        return <p>{date}</p>;
      },
    },
    {
      title: "Billing Address",
      key: "billing_address",
      transform: (value: any) => (
        <div className="   ">
          <p className="mt-2 text-gray-700">
            {value.city}, {value.state.name} ({value.state.state_code}),
          </p>
          <p className="mt-2 text-gray-700">
            {value.country.name} ({value.country.iso2}) - {value.postcode}
          </p>
          <p className="mt-2 text-gray-700">
            <span className="font-medium">{value.street_address}, </span>
          </p>
        </div>
      ),
    },

    {
      title: "Shipping Address",
      key: "shipping_address",
      transform: (value: any) => (
        <div className="   ">
          <p className="mt-2 text-gray-700">
            {value.city}, {value.state.name} ({value.state.state_code}),
          </p>
          <p className="mt-2 text-gray-700">
            {value.country.name} ({value.country.iso2}) - {value.postcode}
          </p>
          <p className="mt-2 text-gray-700">
            <span className="font-medium">{value.street_address}, </span>
          </p>
        </div>
      ),
    },

    {
      title: "Total",
      key: "total_paid_value",
    },
  ];
};