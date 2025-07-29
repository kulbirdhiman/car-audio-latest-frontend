export const getProductBySlug = async (slug: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ADDRESS}/v1/product/list/shop/${slug}`, {
      method: "GET",
      cache: "no-store", // or "force-cache" / "revalidate" depending on your needs
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
