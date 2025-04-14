"use client";

import Image from "next/image";
import Overview from "./Tabs/Overview";
import LeaseAbstract from "./Tabs/LeaseAbstract";
import { useState } from "react";

interface PropertyDetail {
  icon: string;
  label: string;
  value: string | number;
  unit?: string;
}

const tabs = [
    {
      id: "deal-overview",
      label: "Overview", 
      component: <Overview />
    },
    {
      id: "lease-abstract",
      label: "Lease",
      component: <LeaseAbstract />
    }

  ]



export default function DealOverview() {

    const [activeTab, setActiveTab] = useState(tabs[0].id);
 
    

  return (
    <div>
      <div className="flex justify-between items-center pb-4 border-b-[1px] border-gray-200">
        <h1 className="text-2xl font-semibold">Deal Overview</h1>

        <div className="">
          <h2 className="text-lg text-center mb-2">Underwriting Model</h2>
          <button className="text-sm px-4 py-2 rounded-md bg-gray-100 flex items-center gap-2">
            Industrial.Template.v2.4.xlsx
            <span className="text-gray-500">
              <Image src="assets/dropDown.svg" alt="download" width={16} height={16} />
            </span>
          </button>
        </div>
      </div>

      <div className="flex  py-4 gap-4 text-sm">
        {tabs.map((tab) => (
          <button key={tab.id} 
          onClick={() => setActiveTab(tab.id)}
          className={`${
            tab.id === activeTab
              ? "text-gray-900 font-medium"
              : "text-gray-500 hover:text-gray-900"
          }`}
          >{tab.label}</button>
        ))}
      </div>

      {tabs.find((tab) => tab.id === activeTab)?.component}
    </div>
  );
}
