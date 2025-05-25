"use client";
import React, { useState, useEffect, useRef, ReactNode, HTMLProps } from "react";

// Define TabData type to specify the structure of a tab
interface TabData {
  id: string | number;  // Allow both string and number types for the id
  label: string;
  content: ReactNode;
  default?: boolean;
}

// Extend TabsProps to accept other props like style or className for customization
interface TabsProps extends HTMLProps<HTMLDivElement> {
  tabData: TabData[];  // Array of tabs data
  className?: string;   // Custom className for the wrapper
}

const Tabs: React.FC<TabsProps> = ({ tabData, className = '', ...props }) => {
  const [selectedId, setSelectedId] = useState<string | number | null>(
    tabData.find((tab) => tab.default)?.id || null
  );
  
  const [underlineStyle, setUnderlineStyle] = useState<{ width: number; left: number }>({
    width: 0,
    left: 0,
  });
  
  // Correct useRef to store the array of elements
  const tabRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Handle click on a tab
  const handleTabClick = (id: string | number, index: number) => {
    setSelectedId(id);
    updateUnderlinePosition(index);
  };

  // Update the position of the underline
  const updateUnderlinePosition = (index: number) => {
    const tabElement = tabRefs.current[index];
    if (tabElement) {
      setUnderlineStyle({
        width: tabElement.offsetWidth,
        left: tabElement.offsetLeft,
      });
    }
  };

  // Set the initial underline position when the component mounts
  useEffect(() => {
    const defaultIndex = tabData.findIndex((tab) => tab.id === selectedId);
    if (defaultIndex !== -1) {
      updateUnderlinePosition(defaultIndex);
    }
  }, [selectedId, tabData]);

  return (
    <div className={`relative ${className}`} {...props}>
      {/* Tab buttons */}
      <div className="border-gray-200 dark:border-gray-700 z-10 relative">
        <ul
          className="flex mb-5 gap-8 ps-[200px] md:px-0 mx-10 md:mx-auto justify-center text-sm font-medium text-center overflow-x-auto"
          role="tablist"
          style={{ scrollbarWidth: "none" }} // For Firefox
        >
          {tabData.map((tab, index) => (
            <li
              key={tab.id}
              role="presentation"
              ref={(el) => { tabRefs.current[index] = el; }}  // No return value in the callback
            >
              <button
                className={`md:text-lg rounded-t-lg font-semibold whitespace-nowrap text-ellipsis transition-all duration-300 ${
                  selectedId === tab.id ? "text-black border-b-2" : "text-gray-500"
                }`}
                id={`tab-${tab.id}`}
                type="button"
                role="tab"
                aria-controls={`content-${tab.id}`}
                aria-selected={selectedId === tab.id}
                onClick={() => handleTabClick(tab.id, index)}
              >
                {tab.label}
              </button>
            </li>
          ))}
          {/* Animated underline */}
          <div
            className="absolute md:flex hidden bottom-0 h-0.5 bg-black transition-all duration-300"
            style={underlineStyle}
          />
        </ul>
      </div>

      {/* Tab content (with sliding animation) */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(tabData.findIndex((tab) => tab.id === selectedId) || 0) * 100}%)`,
          }}
        >
          {tabData.map((tab) => (
            <div
              key={tab.id}
              className="w-full flex-shrink-0"
              id={`content-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab.id}`}
            >
              <div className="transition-opacity duration-500 ease-in-out">
                {tab.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;

