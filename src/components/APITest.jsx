
import React, { useState, useEffect } from 'react';
import { API_CONFIG } from '../config/api';
import { mockDirectCreateAPI } from '../services/mockData';
import { directCreateAPI } from '../config/api';

const APITest = () => {
  const [materials, setMaterials] = useState([]);
  const [crafts, setCrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testAPI = async () => {
      try {
        console.log('🔄 Testing Mock DirectCreate API...');
        console.log('📍 Mock Mode - Simulating API calls');
        console.log('📍 Original API URL would be:', API_CONFIG.BASE_URL);
        
       const materialsResponse = await mockDirectCreateAPI.getMaterials();
        console.log('📦 Mock Materials Response:', materialsResponse);
        if (materialsResponse.success) {
          setMaterials(materialsResponse.data);
          console.log('✅ Mock Materials loaded:', materialsResponse.data.length);
        }

       const craftsResponse = await mockDirectCreateAPI.getCrafts();
        console.log('🎨 Mock Crafts Response:', craftsResponse);
        if (craftsResponse.success) {
          setCrafts(craftsResponse.data);
          console.log('✅ Mock Crafts loaded:', craftsResponse.data.length);
        }

      } catch (err) {
        console.log('🚨 Mock API Error (this shouldn\'t happen):', err);
        setError('Mock API Error: ' + err.message);
        console.error('❌ Mock API Error:', err);
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
        <p className="mt-2">Loading mock data...</p>
        <p className="text-sm text-gray-600">Simulating API: {API_CONFIG.BASE_URL}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="font-bold text-red-800">❌ Mock API Error</h3>
        <p className="text-red-600">{error}</p>
        <div className="mt-2 text-sm text-gray-600">
          <p>This shouldn't happen with mock data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
      <h2 className="text-xl font-bold text-green-800 mb-4">✅ Mock DirectCreate API Working!</h2>
      <div className="mb-2 p-2 bg-yellow-100 border border-yellow-300 rounded">
        <p className="text-sm text-yellow-800">
          <strong>Note:</strong> Currently using mock data. Real API at {API_CONFIG.BASE_URL} had CORS issues.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold text-green-700 mb-2">Materials ({materials.length})</h3>
          <ul className="space-y-1">
            {materials.slice(0, 5).map(material => (
              <li key={material.id} className="text-sm">
                <strong>{material.name}</strong> - {material.category}
                <div className="text-xs text-gray-600">{material.description}</div>
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
                <div className="text-xs text-gray-600">{craft.description}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default APITest;
