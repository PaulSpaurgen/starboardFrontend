import React from 'react';

export default function Overview() {
    return (
        <div className="flex gap-10 p-4 pb-8 border-b border-gray-200">
                <div className="">
                    <div className="w-[333px] h-[187px] bg-gray-200 rounded-lg overflow-hidden">
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                            Property Image Placeholder
                        </div>
                    </div>
                    <button className="w-full mt-2 text-sm text-gray-500 text-center hover:text-blue-600">
                        Click for Google Street View
                    </button>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h1 className="text-xl font-bold">280 Richards, Brooklyn, NY</h1>
                            <div className="text-gray-600 text-sm mt-1">
                                <p>Date Updated: 11/08/2024</p>
                                <p>Warehouse</p>
                            </div>
                        </div>
                        <div className="flex gap-2 flex-col">
                            <button className="bg-black text-white px-4 py-2 rounded-md text-sm">
                                Export to Excel
                            </button>
                            <button className="bg-black text-white px-4 py-2 rounded-md text-sm">
                                Generate PowerPoint
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-4 justify-between">
                        {/* Seller */}
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-sm mb-1">Seller</span>
                            <span className="font-medium">Thor Equities</span>
                        </div>

                        {/* Guidance Price */}
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-sm mb-1">Guidance Price</span>
                            <span className="font-medium">$143,000,000</span>
                        </div>

                        {/* Guidance Price PSF */}
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-sm mb-1">Guidance Price PSF</span>
                            <span className="font-medium">$23.92</span>
                        </div>

                        {/* Cap Rate */}
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-sm mb-1">Cap Rate</span>
                            <span className="font-medium">5.0%</span>
                        </div>

                        {/* Property Size */}
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-sm mb-1">Property Size</span>
                            <span className="font-medium">312,000 sqft</span>
                        </div>

                        {/* Land Area */}
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-sm mb-1">Land Area</span>
                            <span className="font-medium">16 acres</span>
                        </div>

                        {/* Zoning */}
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-sm mb-1">Zoning</span>
                            <span className="font-medium">M-2</span>
                        </div>
                    </div>
                </div>
            </div>
    );
}
