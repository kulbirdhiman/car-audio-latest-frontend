import ListCards from "@/components/product/ListCards";
import { Suspense } from "react";
const Page = () => {
  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ListCards />
    </Suspense>
  );
};

export default Page;
