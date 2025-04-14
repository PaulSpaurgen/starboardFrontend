"use client";

import { mockPropertyData } from "./data/mockdata";
import RentEscalationChart from "./components/RentEscalationChart";
import { useRef } from "react";

export default function LeaseAbstract() {
  const data = mockPropertyData;
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    if (!contentRef.current) return;
    const html2pdf = require("html2pdf.js");
    const element = contentRef.current;
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
        <div className="flex gap-10 w-full justify-between p-4 pb-8 border-b border-gray-200 mb-8">
          <div className="">
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
          
          <div className="">
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

          <div className="">
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

        <div className="flex w-full bg-white p-6 mb-6 gap-10 justify-between">
          <div className="w-1/3">
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

          <div className="w-1/3">
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
          <div className="w-1/3">
            <RentEscalationChart
              escalations={data.lease.rent.annualEscalations}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
