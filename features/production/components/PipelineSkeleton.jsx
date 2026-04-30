// src/features/production/components/PipelineSkeleton.jsx

import React from 'react';

const PipelineSkeleton = () => {
    return (
        <div className="flex gap-8 overflow-x-auto pb-4">
            {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-[360px] flex-shrink-0">
                    {/* Skeleton de cabecera */}
                    <div className="flex items-center justify-between mb-4 px-1">
                        <div className="flex items-center gap-2">
                            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
                            <div className="h-5 w-8 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    
                    {/* Skeleton de tarjetas */}
                    <div className="space-y-4">
                        {[1, 2, 3].map((j) => (
                            <div key={j} className="bg-white p-5 rounded-xl border border-gray-200">
                                <div className="flex justify-between mb-4">
                                    <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                                <div className="h-4 w-full bg-gray-200 rounded animate-pulse mb-4"></div>
                                <div className="h-2 w-full bg-gray-200 rounded animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PipelineSkeleton;