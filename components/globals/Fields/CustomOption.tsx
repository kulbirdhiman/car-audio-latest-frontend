import React from "react";

const CustomOption :React.FC <any> = ({setValues,values}) => {
  return (
    <div>
      <label>Price for custom type</label>
      <input value={values.options[0].price} onChange={(e)=>{setValues({...values,options : [{...values.options[0],price:e.target.value}]})}} type="number" min={0} className="border rounded" />
    </div>
  );
};

export default CustomOption;
