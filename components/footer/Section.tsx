import React, { ReactNode } from "react";

interface SectionProps {
  title: string;
  children: ReactNode;
}

const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-5 space-y-3 transition-transform duration-300 hover:scale-[1.03] hover:shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <div className="text-gray-700">{children}</div>
    </div>
  );
};

export default Section;
