
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { API_CONFIG, directCreateAPI } from '@/config/api.js';

const APITest = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const testAPIConnection = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      // Test basic API connection
      const testResponse = await fetch(API_CONFIG.BASE_URL);
      const result = await testResponse.text();
      setResponse(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testMaterials = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const materials = await directCreateAPI.getMaterials();
      setResponse(materials);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testCrafts = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const crafts = await directCreateAPI.getCrafts();
      setResponse(crafts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const testTechniques = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const techniques = await directCreateAPI.getTechniques();
      setResponse(techniques);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-foreground">API Test Component</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button 
          onClick={testAPIConnection}
          disabled={loading}
          variant="outline"
        >
          Test Connection
        </Button>
        
        <Button 
          onClick={testMaterials}
          disabled={loading}
          variant="outline"
        >
          Test Materials
        </Button>
        
        <Button 
          onClick={testCrafts}
          disabled={loading}
          variant="outline"
        >
          Test Crafts
        </Button>
        
        <Button 
          onClick={testTechniques}
          disabled={loading}
          variant="outline"
        >
          Test Techniques
        </Button>
      </div>

      <Card className="p-4">
        <h3 className="text-lg font-semibold mb-3">API Configuration</h3>
        <p className="text-sm text-muted-foreground">
          Base URL: {API_CONFIG.BASE_URL}
        </p>
      </Card>

      {loading && (
        <Card className="p-4">
          <p className="text-primary">Loading...</p>
        </Card>
      )}

      {error && (
        <Card className="p-4 border-destructive">
          <h3 className="text-lg font-semibold text-destructive mb-2">Error</h3>
          <p className="text-destructive">{error}</p>
        </Card>
      )}

      {response && (
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2">Response</h3>
          <pre className="bg-muted p-3 rounded text-sm overflow-auto max-h-96">
            {typeof response === 'string' ? response : JSON.stringify(response, null, 2)}
          </pre>
        </Card>
      )}
    </div>
  );
};

export default APITest;
