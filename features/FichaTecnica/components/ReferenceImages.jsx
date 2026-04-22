import React from 'react';
import { Upload } from 'lucide-react';

export default function ReferenceImages({ images }) {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4">Reference Images</h3>
      <div className="grid grid-cols-4 gap-4">
        {images && typeof images === 'string' && JSON.parse(images).map((img, idx) => (
          <div key={idx} className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
            <img src={img} className="w-full h-full object-cover" alt="Reference" />
          </div>
        ))}
        {images && Array.isArray(images) && images.map((img, idx) => (
          <div key={idx} className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
            <img src={img} className="w-full h-full object-cover" alt="Reference" />
          </div>
        ))}
        <button className="aspect-square border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center text-gray-400 hover:bg-gray-50 hover:text-gray-600 transition-colors">
          <Upload className="w-6 h-6 mb-2" />
          <span className="text-xs font-bold uppercase tracking-wider">Upload</span>
        </button>
      </div>
    </div>
  );
}