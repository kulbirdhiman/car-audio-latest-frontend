import { LOCAL_PICKUP, STANDARD_DELIVERY } from "@/app/constants";
import { getShipping } from "@/store/actions/checkOut";
import { AppDispatch, RootState } from "@/store/store";
import toast from "react-hot-toast";
import { FaTruck, FaShippingFast } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as yup from "yup";


const ShippingOptions: React.FC<any> = ({
  selectedAddress,
  selectedShipping,
  setSelectedShipping,
  sameAsBilling,
  selectedMethod,
  setSelectedMethod,
  setShippingErrors,
  shippingErrors,
  shippingAddress,
  setShippingAddress,
  setBillingAddress,
  billingAddress,
  setBillingErrors,
  billingErrors,
  setShippingPrice,
  productData,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, user } = useSelector((state: RootState) => state.auth);

  const options = [
    {
      icon: FaTruck,
      title: "Standard Delivery",
      description: "4-7 days",
      iconColor: "text-blue-600",
      option_id: STANDARD_DELIVERY,
    },
    {
      icon: FaShippingFast,
      title: "Local Pickup",
      description: "1-2 days",
      iconColor: "text-red-600",
      option_id: LOCAL_PICKUP,
    },
  ];

  const billingSchema = yup.object().shape({
    city: yup.string().required("City is required"),
    phone: yup.number().required("Phone is required"),
    name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    country: yup.object().required("Country is required"),

    state: yup.object().required("State is required"),
    street_address: yup.string().required("Street address is required"),
    postcode: yup.string().required("Zip code is required"),
  });
  const shippingSchema = yup.object().shape({
    city: yup.string().required("City is required"),
    phone: yup.number().required("Phone is required"),
    name: yup.string().required("First name is required"),
    last_name: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    country: yup.object().required("Country is required"),

    state: yup.object().required("State is required"),
    street_address: yup.string().required("Street address is required"),
    postcode: yup.string().required("Zip code is required"),
  });

  const handleShippingOption = async (option:any) => {
    let billingErrorss = [];
    let shippingErrorss = [];
    if (!user) {
      try {
        await billingSchema.validate(billingAddress, { abortEarly: false });
      } catch (error) {
        billingErrorss = (error as any).inner.reduce(
          (acc:any, err:any) => ({ ...acc, [err.path]: err.message }),
          {}
        );

        console.log("nnn", error);
      }
    }

    if (!sameAsBilling && option.option_id == STANDARD_DELIVERY) {
      try {
        await shippingSchema.validate(shippingAddress, { abortEarly: false });
      } catch (error) {
        shippingErrorss = (error as any).inner.reduce(
          (acc:any, err:any) => ({ ...acc, [err.path]: err.message }),
          {}
        );
      }
    }

    if (
      Object.keys(billingErrorss).length ||
      Object.keys(shippingErrorss).length
    ) {
      setBillingErrors(billingErrorss);
      setShippingErrors(shippingErrorss);
      return;
    }

    setBillingErrors({});
    setShippingErrors({});

    try {
      let address;
      if (user) {
        if(selectedAddress?.id){
        //  if()
          address = sameAsBilling? selectedAddress:shippingAddress;
        }else{
          toast.error("Please select a billing address");
          return ;
        }
    
      } else {
        address = sameAsBilling ? billingAddress : shippingAddress;
      }
      if (option.option_id == STANDARD_DELIVERY) {
        const res = await dispatch(
          getShipping({
            products: productData,
            shipping_address: address,
          })
        ).unwrap();
        console.log(res, "ll");
        if (res.data.data >= 0) {
          setShippingPrice(res.data.data);
          setSelectedShipping(option.option_id);
        } else {
          toast.error(
            "Shipping is not possible for this order select local pickup"
          );
        }
      } else {
        setShippingPrice(0);
        setSelectedShipping(option.option_id);
      }
    } catch (error) {
      console.log("erorr", error);
    }
  };

  return (
    <div className="py-6 border-b">
      <h2 className="text-xl font-semibold mb-3">Select Ship Option</h2>
      <div className="grid grid-cols-1 gap-4">
        {options.map((option) => (
          <div
            key={option.option_id}
            className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer 
              hover:bg-gray-100 transition-all duration-300 
              ${
                selectedShipping === option.option_id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              }`}
            onClick={() => handleShippingOption(option)}
          >
            <option.icon className={`text-2xl ${option.iconColor}`} />
            <div>
              <h3 className="font-medium text-lg">{option.title}</h3>
              <p className="text-sm text-gray-600">{option.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShippingOptions;
