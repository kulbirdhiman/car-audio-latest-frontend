export const bhandleLogOutCart = (addToData:any) => {
    let localData: any[] = []; // Explicitly declare it as an array
  
    const storedData = localStorage.getItem("addToCart");
    if (storedData) {
      try {
        localData = JSON.parse(storedData) || []; // Ensure it's an array
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        localData = []; // Reset to empty array if parsing fails
      }
    }
  
    let product = localData.filter(
      (product) => product.product_id == addToData.product_id
    );
  
    if (product.length > 0) {
      addToData = {
        ...addToData,
        quantity: parseInt(product[0].quantity) + parseInt(addToData.quantity),
      };
  
      if (addToData.quantity > addToData.stock_quantity) {
        return { success: false, message: "Maximum quantity reached" };
      }
      localData = localData.filter(
        (product) => product.product_id != addToData.product_id
      );
    }
  
    localData.push(addToData);
  
    localStorage.setItem("addToCart", JSON.stringify(localData));
    return { success: true, message: "Add to cart successfully" };
  };