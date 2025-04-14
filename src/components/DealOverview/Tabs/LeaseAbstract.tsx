"use client";

import { mockPropertyData } from "./data/mockdata";
import RentEscalationChart from "./components/RentEscalationChart";
import { useRef } from "react";

// Define section types for better type safety
type SectionType = 'tenantInfo' | 'renewalOptions' | 'leaseTerms' | 'recoveryTerms' | 'rentStructure' | 'rentStructureChart';

export default function LeaseAbstract() {
  const data = mockPropertyData;

  // Create a refs map for better type safety and organization
  const sectionRefs = useRef<Record<SectionType, HTMLDivElement | null>>({
    tenantInfo: null,
    renewalOptions: null,
    leaseTerms: null,
    recoveryTerms: null,
    rentStructure: null,
    rentStructureChart: null
  });

  const handleDownloadPDF = async () => {
    const html2pdf = require("html2pdf.js");
    const parentElement = document.createElement("div");
    const title = document.createElement("h1");
    title.className = "text-2xlfont-bold mb-6";
    title.textContent = "Lease Abstract";
    parentElement.appendChild(title);

    // Helper function to add margin to elements
    const addElementWithSpacing = (element: Element) => {
      const wrapper = document.createElement('div');
      wrapper.style.marginBottom = '40px'; 
      wrapper.appendChild(element);
      parentElement.appendChild(wrapper);
    };

    // Clone all sections except chart
    Object.entries(sectionRefs.current).forEach(([key, ref]) => {
      if (ref && key !== 'rentStructureChart') {
        const elementCopy = ref.cloneNode(true) as Element;
        addElementWithSpacing(elementCopy);
      }
    });

    // Handle chart separately due to canvas
    const chartRef = sectionRefs.current.rentStructureChart;
    if (chartRef) {
      const canvas = chartRef.querySelector('canvas');
      if (canvas) {
        const chartImage = document.createElement('img');
        chartImage.src = canvas.toDataURL('image/png');
        chartImage.style.width = '100%';
        chartImage.style.height = 'auto';
        const chartContainer = document.createElement('div');
        chartContainer.appendChild(chartImage);
        parentElement.appendChild(chartContainer);
      }
    }

    const opt = {
      margin: 1,
      filename: "lease-abstract.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(parentElement)?.save("lease-abstract.pdf");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold mb-6">Lease Abstract</h1>
        <button
          onClick={handleDownloadPDF}
          className="bg-black text-white px-4 py-2 rounded-md text-sm"
        >
          Download PDF
        </button>
      </div>

      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 w-full justify-between p-4 pb-8 border-b border-gray-200 mb-8">
          <div className="" ref={el => { sectionRefs.current.tenantInfo = el }}>
            <h2 className="text-lg font-semibold mb-4">Tenant Information</h2>
            <div className="flex flex-wrap gap-8">
              <div>
                <p className="text-gray-600">Tenant Name</p>
                <p className="font-medium">{data.lease.tenant.name}</p>
              </div>
              <div>
                <p className="text-gray-600">Industry</p>
                <p className="font-medium">{data.lease.tenant.industry}</p>
              </div>
            </div>
          </div>
          
          <div className="" ref={el => { sectionRefs.current.leaseTerms = el }}>
            <h2 className="text-lg font-semibold mb-4">Lease Terms</h2>
            <div className="flex flex-wrap gap-8">
              <div>
                <p className="text-gray-600">Start Date</p>
                <p className="font-medium">{data.lease.terms.startDate}</p>
              </div>
              <div>
                <p className="text-gray-600">Expiry Date</p>
                <p className="font-medium">{data.lease.terms.expiryDate}</p>
              </div>
              <div>
                <p className="text-gray-600">Lease Type</p>
                <p className="font-medium">{data.lease.terms.type}</p>
              </div>
            </div>
          </div>

          <div className="" ref={el => { sectionRefs.current.renewalOptions = el }}>
            <h2 className="text-lg font-semibold mb-4">Renewal Options</h2>
            <div className="space-y-4">
              {data.lease.renewalOptions.map((option, index) => (
                <div
                  key={index}
                  className="flex flex-wrap gap-8 p-4 bg-gray-50 rounded"
                >
                  <div>
                    <p className="text-gray-600">Term</p>
                    <p className="font-medium">{option.term}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Type</p>
                    <p className="font-medium">{option.type}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Notice Period</p>
                    <p className="font-medium">{option.notice}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Escalation</p>
                    <p className="font-medium">{option.escalation}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full bg-white p-6 mb-6 gap-10 justify-between">
          <div ref={el => { sectionRefs.current.recoveryTerms = el }}>
            <h2 className="text-lg font-semibold mb-4">Recovery Terms</h2>
            <div className="flex flex-wrap gap-8 flex-col">
              <div>
                <p className="text-gray-600">CAM</p>
                <p className="font-medium">{data.lease.recoveryTerms.cam}</p>
              </div>
              <div>
                <p className="text-gray-600">Insurance</p>
                <p className="font-medium">
                  {data.lease.recoveryTerms.insurance}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Taxes</p>
                <p className="font-medium">{data.lease.recoveryTerms.taxes}</p>
              </div>
              <div>
                <p className="text-gray-600">Utilities</p>
                <p className="font-medium">
                  {data.lease.recoveryTerms.utilities}
                </p>
              </div>
            </div>
          </div>

          <div ref={el => { sectionRefs.current.rentStructure = el }}>
            <h2 className="text-lg font-semibold mb-4">Rent Structure</h2>
            <div className="flex flex-wrap gap-8 mb-6">
              <div>
                <p className="text-gray-600">Base Rent PSF</p>
                <p className="font-medium">
                  ${data.lease.rent.baseRentPSF.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Annual Rent</p>
                <p className="font-medium">
                  ${data.lease.rent.annualRent.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          
          <div ref={el => { sectionRefs.current.rentStructureChart = el }}>
            <RentEscalationChart
              escalations={data.lease.rent.annualEscalations}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
