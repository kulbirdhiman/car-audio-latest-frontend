// components/ProductCardSkeleton.tsx

const ProductCardSkeleton = () => {
    return (
      <div className="border border-gray-200 h-[450px] shadow-sm animate-pulse">
        <div className="w-full h-[250px] bg-gray-200 rounded-md" />
        <div className="p-3 space-y-2">
          <div className="h-3 w-24 bg-gray-300 rounded" />
          <div className="h-4 w-3/4 bg-gray-300 rounded" />
          <div className="h-5 w-1/4 bg-gray-300 rounded" />
          <div className="h-4 w-20 bg-gray-300 rounded" />
          <div className="h-8 w-24 bg-gray-300 rounded-full" />
        </div>
      </div>
    );
  };
  
  export default ProductCardSkeleton;
  