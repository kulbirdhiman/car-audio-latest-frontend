export const getProductBySlug = async (slug: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ADDRESS}/v1/product/list/shop/${slug}`, {
      method: "GET",
    });
    if (!res.ok) {
      console.error("Failed to fetch product:", res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
