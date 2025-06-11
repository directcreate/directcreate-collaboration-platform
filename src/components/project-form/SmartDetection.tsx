
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, CheckCircle, Edit3, Loader2 } from "lucide-react";
import { DetectedElements } from "../../services/descriptionAnalysisService";

interface SmartDetectionProps {
  detected: DetectedElements;
  onProceed: () => void;
  onEditDetected: (type: string, item: any) => void;
  onAddMoreDetails: () => void;
  loading?: boolean;
}

const SmartDetection = ({ 
  detected, 
  onProceed, 
  onEditDetected, 
  onAddMoreDetails,
  loading = false 
}: SmartDetectionProps) => {
  const hasDetectedElements = detected.materials.length > 0 || 
                             detected.crafts.length > 0 || 
                             detected.techniques.length > 0;

  if (!hasDetectedElements && !loading) {
    return null;
  }

  return (
    <div className="bg-card rounded-3xl p-8 border border-border/20 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
          {loading ? (
            <Loader2 className="w-6 h-6 text-primary animate-spin" />
          ) : (
            <Brain className="w-6 h-6 text-primary" />
          )}
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground">
            {loading ? 'Analyzing your description...' : 'Smart Detection Results'}
          </h3>
          <p className="text-muted-foreground">
            {loading ? 'Our AI is understanding your project requirements' : 'We detected the following from your description:'}
          </p>
        </div>
      </div>

      {!loading && hasDetectedElements && (
        <>
          <div className="space-y-6 mb-6">
            {detected.materials.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="font-medium">Materials Detected:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {detected.materials.map((material, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                        {material.name}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditDetected('material', material)}
                        className="h-6 w-6 p-0"
                      >
                        <Edit3 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {detected.crafts.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  <span className="font-medium">Crafts Detected:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {detected.crafts.map((craft, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
                        {craft.name}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditDetected('craft', craft)}
                        className="h-6 w-6 p-0"
                      >
                        <Edit3 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {detected.techniques.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-4 h-4 text-purple-600" />
                  <span className="font-medium">Techniques Detected:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {detected.techniques.map((technique, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200">
                        {technique.name}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditDetected('technique', technique)}
                        className="h-6 w-6 p-0"
                      >
                        <Edit3 className="w-3 h-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(detected.style || detected.colors || detected.use) && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle className="w-4 h-4 text-orange-600" />
                  <span className="font-medium">Additional Details:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {detected.style && (
                    <Badge variant="outline">Style: {detected.style}</Badge>
                  )}
                  {detected.colors && (
                    <Badge variant="outline">Colors: {detected.colors}</Badge>
                  )}
                  {detected.use && (
                    <Badge variant="outline">Use: {detected.use}</Badge>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-6 border-t border-border/20">
            <Button
              onClick={onProceed}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8"
            >
              Proceed to Find Makers
            </Button>
            <Button
              onClick={onAddMoreDetails}
              variant="outline"
              className="px-6"
            >
              Add More Details
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default SmartDetection;
