"use client";
import React, { useState } from "react";


type TabData = {
  id: number;
  label: string;
  content: React.ReactNode;
};

type TabComponentProps = {
  tabs: TabData[];
  title?: string; 
  no_title?: boolean; 
  buttonClass?: string
  TabClass?:string
};

const TabComponent: React.FC<TabComponentProps> = ({ tabs,no_title,title,buttonClass ,TabClass}) => {
  const [activeTab, setActiveTab] = useState<number>(tabs[0]?.id || 1); 

  const handleTabClick = (id: number) => {
    setActiveTab(id);
  };

  return (
    <div className="tabs-container dark:bg-white   dark:text-black">
     {!no_title&&
      <h1
    
      className="my-4 text-center text-3xl  font-bo "
    >
      {title}
    </h1>
     
     }

      <div className={`${TabClass ?TabClass :"tab-labels mx-auto  dark:bg-white flex justify-center md:justify-center space-x-4 overflow-x-auto hide-scrollbar"}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-label ${buttonClass ? buttonClass : "md:text-lg text-sm py-2 border-b-2 text-ellipsis whitespace-nowrap"} 
              ${activeTab === tab.id ? "border-black font-bold" : "border-transparent"} 
              ${activeTab === tab.id && buttonClass ? "bg-green-700 text-white" : ""}`
            }
            
            
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* <div className="tab-content mt-4">
        {tabs.map((tab) => (
          <div key={tab.id} className={activeTab === tab.id ? "block" : "hidden"}>
            {tab.content}
          </div>
        ))}
      </div> */}
      <div className="relative my-2 w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${
              (tabs.findIndex((tab) => tab.id === activeTab) || 0) * 100
            }%)`,
          }}
        >
          {tabs.map((tab) => (
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

      <style jsx>{`
        .tab-labels {
          -webkit-overflow-scrolling: touch;
          scroll-snap-type: x mandatory;
        }

        .tab-labels::-webkit-scrollbar {
          display: none; /* Hide scrollbar */
        }

        .hide-scrollbar {
          scrollbar-width: none; /* Hide scrollbar in Firefox */
        }

        .tab-labels .tab-label {
          scroll-snap-align: start;
        }

        @media (max-width: 600px) {
          .tab-labels {
            padding: 0 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default TabComponent;
