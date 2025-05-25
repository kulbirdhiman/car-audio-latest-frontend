import React from 'react';

interface SpecificationsComponentProps {
  Specification: string; 
}

const SpecificationsComponent: React.FC<SpecificationsComponentProps> = ({ Specification }) => {
  return (
    <div className="p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Product Specifications</h2>
      {/* Render product specifications dynamically */}
      <div dangerouslySetInnerHTML={{ __html: Specification }} />
      {/* <h1>{Specification}</h1> */}
    </div>
  );
};

export default SpecificationsComponent;
