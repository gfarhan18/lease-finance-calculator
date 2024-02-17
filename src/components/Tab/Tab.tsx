// components/Tab.tsx
import React from 'react';

interface TabProps {
  tabs: string[];
  onSelectTab: (tabIndex: number) => void;
  activeTab: number;
}

const Tab: React.FC<TabProps> = ({ tabs, onSelectTab, activeTab }) => {
  return (
    <div className="grid grid-flow-col text-center text-gray-500 bg-gray-100 rounded-full p-1 mb-2">
      {tabs.map((tab, index) => (
        <button
          key={index}
          className={`flex justify-center py-2 font-semibold
          ${index === activeTab ? 'bg-yellow-500 rounded-full shadow text-white' : ''}`}
          onClick={() => onSelectTab(index)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tab;
