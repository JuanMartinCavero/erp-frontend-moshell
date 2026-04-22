import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';

export default function SizeSpecsTab({ sizeSpecs }) {
  return (
    <Card>
      <CardContent className="pt-6">
        <h4 className="font-bold mb-4">Size Specifications</h4>
        {sizeSpecs ? (
          <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-auto">
            {typeof sizeSpecs === 'string' 
              ? JSON.stringify(JSON.parse(sizeSpecs), null, 2)
              : JSON.stringify(sizeSpecs, null, 2)}
          </pre>
        ) : (
          <p className="text-gray-500 text-center py-8">No hay especificaciones de tallas definidas</p>
        )}
      </CardContent>
    </Card>
  );
}