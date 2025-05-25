import React from "react";

// Define the description prop type
interface DescriptionProps {
  description: string;
}

// Description component receiving 'description' as a prop
const Description: React.FC<DescriptionProps> = ({ description }) => {
  return (
    <> 
         
         {!description ?<div className="h-[300vh] w-full bg-gray-300 rounded"></div>:
         <div className="p-4 maxh-[500px] rounded-lg shadow-md">
         <h2 className="text-xl font-bold mb-4">Product Description</h2>
         {/* Render the description */}
         <div className="product-description" dangerouslySetInnerHTML={{ __html: description }} />
       </div>
         }
     
    </>
  );
};

export default Description;
