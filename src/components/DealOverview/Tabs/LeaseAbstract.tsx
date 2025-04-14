"use client";

import { mockPropertyData } from "./data/mockdata";
import RentEscalationChart from "./components/RentEscalationChart";
import { useRef } from "react";

export default function LeaseAbstract() {
  const data = mockPropertyData;
  const contentRef = useRef<HTMLDivElement>(null);

  const tenantInfoRef = useRef<HTMLDivElement>(null);
  const renewalOptionsRef = useRef<HTMLDivElement>(null);
  const leaseTermsRef = useRef<HTMLDivElement>(null);
  const recoveryTermsRef = useRef<HTMLDivElement>(null);
  const rentStructureRef = useRef<HTMLDivElement>(null);
  const rentStructureChartRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;
    const html2pdf = require("html2pdf.js");
    const parentElement = document.createElement("div");
    parentElement.style.height = "100%";

    // Helper function to add margin to elements
    const addElementWithSpacing = (element: Element) => {
      const wrapper = document.createElement('div');
      wrapper.style.marginBottom = '40px'; // Add 40px spacing between elements
      wrapper.appendChild(element);
      parentElement.appendChild(wrapper);
    };

    // Clone the rest of the elements
    if (tenantInfoRef.current) {
      const tenantInfoCopy = tenantInfoRef.current.cloneNode(true) as Element;
      addElementWithSpacing(tenantInfoCopy);
    }
    if (renewalOptionsRef.current) {
      const renewalOptionsCopy = renewalOptionsRef.current.cloneNode(true) as Element;
      addElementWithSpacing(renewalOptionsCopy);
    }
    if (leaseTermsRef.current) {
      const leaseTermsCopy = leaseTermsRef.current.cloneNode(true) as Element;
      addElementWithSpacing(leaseTermsCopy);
    }
    if (recoveryTermsRef.current) {
      const recoveryTermsCopy = recoveryTermsRef.current.cloneNode(true) as Element;
      addElementWithSpacing(recoveryTermsCopy);
    }
    if (rentStructureRef.current) {
      const rentStructureCopy = rentStructureRef.current.cloneNode(true) as Element;
      addElementWithSpacing(rentStructureCopy);
    }

    
    if (rentStructureChartRef.current) {
      const canvas = rentStructureChartRef.current.querySelector('canvas');
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

    const element = parentElement;

    const opt = {
      margin: 1,
      filename: "lease-abstract.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element)?.save("lease-abstract.pdf");
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

      <div ref={contentRef} >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 w-full justify-between p-4 pb-8 border-b border-gray-200 mb-8">
          <div className="" ref={tenantInfoRef} >
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
          
          <div className="" ref={leaseTermsRef} >
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

          <div className="" ref={renewalOptionsRef} >
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
          <div ref={recoveryTermsRef} >
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

          <div ref={rentStructureRef} >
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
          <div ref={rentStructureChartRef} >
            <RentEscalationChart
              escalations={data.lease.rent.annualEscalations}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
