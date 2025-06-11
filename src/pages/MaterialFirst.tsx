
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useMaterials } from "../hooks/useMaterials";
import { useIsMobile } from "../hooks/use-mobile";
import MaterialFirstHeader from "../components/material-first/MaterialFirstHeader";
import MaterialLoadingScreen from "../components/material-first/MaterialLoadingScreen";
import MaterialErrorDisplay from "../components/material-first/MaterialErrorDisplay";
import MaterialEmptyState from "../components/material-first/MaterialEmptyState";
import SmartFiltering from "../components/project-form/SmartFiltering";
import MaterialStickyActions from "../components/material-first/MaterialStickyActions";

const MaterialFirst = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isMobile = useIsMobile();
  const { materials, loading, error, retryLoading } = useMaterials();
  const [selectedMaterial, setSelectedMaterial] = useState("");

  // Get the project description from URL params
  const projectDescription = searchParams.get('description') || '';

  const handleContinue = () => {
    if (selectedMaterial) {
      const material = materials.find(m => m.id === selectedMaterial);
      navigate('/collaborate/form', { 
        state: { selectedMaterial: material } 
      });
    }
  };

  const renderMaterial = (material, isRecommended = false, reason = '') => (
    <div
      className={`bg-card rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg border-2 ${
        selectedMaterial === material.id
          ? 'border-primary shadow-lg'
          : isRecommended
            ? 'border-primary/30 hover:border-primary/50'
            : 'border-transparent hover:border-border'
      }`}
    >
      <div className="text-center">
        <div className="text-4xl sm:text-5xl mb-3 sm:mb-4">{material.icon}</div>
        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
          {material.name}
        </h3>
        {isRecommended && reason && (
          <p className="text-xs text-primary font-medium mb-2">
            {reason}
          </p>
        )}
        <div className="text-muted-foreground text-xs sm:text-sm font-medium mb-3">
          <p className="leading-relaxed">{material.description}</p>
        </div>
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex justify-between">
            <span>Category:</span>
            <span className="font-medium">{material.category}</span>
          </div>
          <div className="flex justify-between">
            <span>Sustainability:</span>
            <span className="font-medium">{material.sustainability_rating}/10</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <MaterialLoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MaterialFirstHeader onBack={() => navigate("/")} />

      <main className={`flex-1 px-4 sm:px-6 py-6 sm:py-8 max-w-6xl mx-auto w-full ${isMobile ? 'pb-32' : ''}`}>
        <MaterialErrorDisplay error={error} onRetry={retryLoading} />
        
        {!loading && materials.length === 0 && !error ? (
          <MaterialEmptyState onRetry={retryLoading} />
        ) : (
          materials.length > 0 && (
            <SmartFiltering
              title="Choose Your Material"
              description="Real materials from DirectCreate database"
              allItems={materials}
              selectedItem={selectedMaterial}
              onItemSelect={setSelectedMaterial}
              projectDescription={projectDescription}
              itemType="materials"
              renderItem={renderMaterial}
            />
          )
        )}
      </main>

      {/* Sticky Actions */}
      {materials.length > 0 && (
        <MaterialStickyActions
          selectedMaterialId={selectedMaterial}
          allMaterials={materials}
          showAllMaterials={true}
          totalMaterialsCount={materials.length}
          onShowAll={() => {}}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
};

export default MaterialFirst;
