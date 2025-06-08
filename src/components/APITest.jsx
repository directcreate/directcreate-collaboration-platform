import React, { useState, useEffect } from 'react';
import { directCreateAPI } from '../config/api';

const APITest = () => {
  const [materials, setMaterials] = useState([]);
  const [crafts, setCrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testAPI = async () => {
      try {
        console.log('🔄 Testing DirectCreate API...');
        
        const materialsResponse = await directCreateAPI.getMaterials();
        if (materialsResponse.success) {
          setMaterials(materialsResponse.data);
          console.log('✅ Materials loaded:', materialsResponse.data.length);
        }

        const craftsResponse = await directCreateAPI.getCrafts();
        if (craftsResponse.success) {
          setCrafts(craftsResponse.data);
          console.log('✅ Crafts loaded:', craftsResponse.data.length);
        }

      } catch (err) {
        setError('API Connection Failed: ' + err.message);
        console.error('❌ API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    testAPI();
  }, []);

  if (loading) {
    return (
      <div className="p-6 bg-blue-50 rounded-lg">
        <div className="animate-spin w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full"></div>
        <p className="mt-2">Testing DirectCreate API connection...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="font-bold text-red-800">❌ API Connection Error</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
      <h2 className="text-xl font-bold text-green-800 mb-4">✅ DirectCreate API Connected!</h2>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold text-green-700 mb-2">Materials ({materials.length})</h3>
          <ul className="space-y-1">
            {materials.slice(0, 5).map(material => (
              <li key={material.id} className="text-sm">
                <strong>{material.name}</strong> - {material.category}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-green-700 mb-2">Crafts ({crafts.length})</h3>
          <ul className="space-y-1">
            {crafts.slice(0, 3).map(craft => (
              <li key={craft.id} className="text-sm">
                <strong>{craft.name}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default APITest;