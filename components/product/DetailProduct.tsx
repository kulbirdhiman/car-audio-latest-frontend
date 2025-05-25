"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";

import {
  GiShoppingCart
} from "react-icons/gi";
import {
  HeartIcon,
  ClipboardIcon
} from "@heroicons/react/24/outline";
import {
  Share2
} from "lucide-react";

import { ProductForShop } from "@/store/actions/admin/product";
import { addToCart } from "@/store/actions/cart";
import { IN_STOCK } from "@/app/constants";
import { AppDispatch, RootState } from "@/store/store";

import ImageGallery from "./ImageGallary";
import ImageGalleryMobile from "./ImageGallaryMobile";
import AddOn from "./AddOn";
import Variations from "./Variation";
import { ProductDetailSkeleton } from "./ProductDetailSkeleton";
import Description from "@/components/product/Description";

const TabComponent = dynamic(() => import("@/components/globals/TabComponent"), { ssr: false });
const Demmovideo = dynamic(() => import("@/components/product/DemmoVideo"), { ssr: false });
const SpecificationsComponent = dynamic(() => import("@/components/product/Specifications"), { ssr: false });
const ReviewForm = dynamic(() => import("@/components/product/ReviewForm"), { ssr: false });
// const RelatedProduct = dynamic(() => import("../home/RelatedProduct"), { ssr: false });

const FacebookIcon = dynamic(() => import("react-share").then(mod => mod.FacebookIcon));
const TwitterIcon = dynamic(() => import("react-share").then(mod => mod.TwitterIcon));
const WhatsappIcon = dynamic(() => import("react-share").then(mod => mod.WhatsappIcon));

const Detail = () => {
  const { slug } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { cartCount } = useSelector((state: any) => state.cart);
  const { user } = useSelector((state: RootState) => state.auth);

  const [product, setProduct] = useState<any>({});
  const [variationData, setVariationData] = useState([]);
  const [variation, setVariation] = useState([]);
  const [extras, setExtras] = useState([]);
  const [addOns, setAddOns] = useState<any[]>([]);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState<any>(false);
  const [addToData, setAddToData] = useState({ product_id: null, quantity: 1 });
  const [apiHit, setApiHit] = useState(false);

  const debouncedFetchProduct = useDebouncedCallback(async () => {
    try {
      const res = await dispatch(ProductForShop({ slug })).unwrap();
      if (res.success) {
        const data = res.data.result;
        console.log(`this is product data ${data}`)
        setProduct(data);
        setAddToData((prev) => ({ ...prev, product_id: (data as any).id }));
        setExtras(res.data.extras || []);
        setVariationData(res.data.variation || []);
        setRelatedProduct(res.data.relatedProduct || []);
        setApiHit(true);
      }
    } catch (error) {
      console.error("Failed to fetch product:", error);
    }
  }, 300);

  useEffect(() => {
    if (slug) debouncedFetchProduct();
  }, [slug]);

  const increaseQuantity = () =>
    setAddToData((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  const decreaseQuantity = () =>
    setAddToData((prev) =>
      prev.quantity > 1 ? { ...prev, quantity: prev.quantity - 1 } : prev
    );

  const findMissingRequiredVariations = () => {
    const selectedIds = new Set(variation.map((v) => (v as any).id));
    return variationData
      .filter((v: any) => v.is_required && !selectedIds.has(v.id))
      .reduce((acc, v: any) => {
        acc[v.id] = `${v.name} is required`;
        return acc;
      }, {} as Record<string, string>);
  };

  const handleCart = async (buyNow: boolean) => {
    if (variationData.length > 0) {
      const error = findMissingRequiredVariations();
      if (Object.keys(error).length > 0) {
        setErrors(error);
        toast.error("Please select required variations.");
        return;
      }
    }

    const res = await dispatch(
      addToCart({
        user_id: user?.id,
        cartCount,
        stock_quantity: product.quantity,
        ...product,
        ...addToData,
        addOns,
        variations: variation,
      })
    );

    if (buyNow && res?.payload?.success) {
      router.push("/checkout");
    }
  };

  const copyLinkToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsLinkCopied(true);
    setTimeout(() => setIsLinkCopied(false), 2000);
  };

  const tabData = [
    { id: 1, label: "Descriptions", content: <Description description={product.description} /> },
    { id: 2, label: "Specifications", content: <SpecificationsComponent Specification={product?.specification} /> },
    { id: 3, label: "Demo Video", content: <Demmovideo demovideo={product?.demo_video} installationVideo={product?.installation_video} /> },
    { id: 4, label: "Review", content: <ReviewForm /> },
  ];

  if (!apiHit) return <ProductDetailSkeleton />;

  return (
    <div className="w-11/12 mx-auto px-4 pb-3 ">
      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        {/* Gallery */}
        <div className="lg:col-span-3">
          <ImageGallery product={product} images={product?.images}/>
          {/* <ImageGalleryMobile images={product?.images} /> */}
        </div>

        {/* Product Info */}
        <div className="lg:col-span-4 space-y-6">
          <h1 className="text-2xl  font-sans font-medium">{product?.name}</h1>

          {/* <p className="text-xl font-bold text-gray-900">
            {product?.wholesale_price ? `$${product?.wholesale_price}` : "--"}
          </p> */}

          <div className="flex items-center gap-4 text-sm">
            <button className="flex items-center gap-2" onClick={() => toast("Added to Wishlist!")}>
              <HeartIcon className="h-5" /> Add to Wishlist
            </button>

            <button onClick={() => setIsSharePopupOpen(true)} className="flex items-center gap-2">
              <Share2 size={20} /> Share
            </button>
          </div>

          {variationData.length > 0 && (
            <Variations errors={errors} setVariation={setVariation} variation={variation} variationData={variationData} />
          )}

          {extras.length > 0 && (
            <AddOn setAddOns={setAddOns} addOns={addOns} extras={extras} />
          )}

          {/* Quantity & Cart */}
          <div className="gap-4 mt-4">
            {(product?.in_stock === IN_STOCK) ? (
              <>
               <div className="flex justify-between">
               <p className="text-xl font-medium text-gray-900">
             ${product.discount_price <=0 ? product.regular_price : product.discount_price}
          </p>
               <div className="flex items-center border border-gray-200  overflow-hidden">
                  <button onClick={decreaseQuantity} className="w-10 h-10 bg-gray-100 text-lg font-bold">−</button>
                  <div className="w-12 h-10  flex justify-center items-center text-lg font-semibold">{addToData.quantity}</div>
                  <button onClick={increaseQuantity} className="w-10 h-10 bg-gray-100 text-lg font-bold">+</button>
                </div>

               </div>
               <div className="flex gap-2 p-3" >
               <button onClick={() => handleCart(false)} className="bg-blue-800 text-white w-[50%] px-4 py-2 rounded hover:scale-105 transition flex items-center gap-2">
                  <GiShoppingCart /> Add to Cart
                </button>

                <button onClick={() => handleCart(true)} className="bg-green-600 w-[50%] text-white px-4 py-2 rounded hover:scale-105 transition  items-center gap-2 hidden md:flex">
                  Buy Now
                </button>
               </div>
              </>
            ) : (
              <span className="text-red-500 font-bold">Out of Stock</span>
            )}
          </div>

          <p className="text-sm mt-2"><span className="font-bold">SKU:</span> {product?.sku || "N/A"}</p>
        </div>
      </div>

      {/* Share Modal */}
      {isSharePopupOpen && (
        <div className="fixed inset-0 z-[900] bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setIsSharePopupOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >✖</button>
            <h3 className="text-lg font-bold mb-4">Share this Product</h3>
            <div className="flex gap-4">
              <FacebookIcon size={32} round />
              <TwitterIcon size={32} round />
              <WhatsappIcon size={32} round />
              <button
                onClick={copyLinkToClipboard}
                className="flex items-center gap-2 py-2 px-4 bg-gray-200 rounded hover:bg-gray-300"
              >
                <ClipboardIcon className="h-5" />
                {isLinkCopied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Section */}
      <Suspense fallback={<div>Loading...</div>}>
        <div className="mt-10">
          <TabComponent no_title={true} tabs={tabData} />
        </div>

        {/* <RelatedProduct title="Related Products" data={relatedProduct} /> */}
      </Suspense>
    </div>
  );
};

export default Detail;
