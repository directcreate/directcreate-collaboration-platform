import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMaterials } from "../hooks/useMaterials";
import { useIsMobile } from "../hooks/use-mobile";
import MaterialFirstHeader from "../components/material-first/MaterialFirstHeader";
import MaterialLoadingScreen from "../components/material-first/MaterialLoadingScreen";
import MaterialErrorDisplay from "../components/material-first/MaterialErrorDisplay";
import MaterialSearch from "../components/material-first/MaterialSearch";
import MaterialGrid from "../components/material-first/MaterialGrid";
import MaterialActions from "../components/material-first/MaterialActions";
import MaterialStickyActions from "../components/material-first/MaterialStickyActions";
import MaterialEmptyState from "../components/material-first/MaterialEmptyState";

const MaterialFirst = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { materials, loading, error, retryLoading } = useMaterials();
  const [selectedMaterial, setSelectedMaterial] = useState("");
  const [showAllMaterials, setShowAllMaterials] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Show first 12 materials initially, all materials when expanded
  const initialMaterials = materials.slice(0, 12);
  const allMaterials = materials;

  const filteredMaterials = (showAllMaterials ? allMaterials : initialMaterials).filter(material =>
    material.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    material.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContinue = () => {
    if (selectedMaterial) {
      const material = allMaterials.find(m => m.id === selectedMaterial);
      navigate('/collaborate/form', { 
        state: { selectedMaterial: material } 
      });
    }
  };

  if (loading) {
    return <MaterialLoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MaterialFirstHeader onBack={() => navigate("/")} />

      <main className={`flex-1 px-4 sm:px-6 py-6 sm:py-8 max-w-6xl mx-auto w-full ${isMobile ? 'pb-32' : ''}`}>
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light text-foreground mb-4 sm:mb-6 leading-tight px-2">
            Choose Your
            <br />
            Material
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground font-light mb-6 sm:mb-8 px-4">
            Real materials from DirectCreate database
          </p>
          
          <MaterialErrorDisplay error={error} onRetry={retryLoading} />
          <MaterialSearch 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            materialsCount={materials.length}
          />
        </div>
        
        {!loading && materials.length === 0 && !error ? (
          <MaterialEmptyState onRetry={retryLoading} />
        ) : (
          materials.length > 0 && (
            <>
              <MaterialGrid
                materials={filteredMaterials}
                selectedMaterialId={selectedMaterial}
                onMaterialSelect={setSelectedMaterial}
                showAllMaterials={showAllMaterials}
              />
              
              {/* Keep original actions for desktop when no material is selected */}
              {!isMobile && !selectedMaterial && (
                <MaterialActions
                  selectedMaterialId={selectedMaterial}
                  allMaterials={allMaterials}
                  showAllMaterials={showAllMaterials}
                  totalMaterialsCount={materials.length}
                  onShowAll={() => setShowAllMaterials(true)}
                  onContinue={handleContinue}
                />
              )}
            </>
          )
        )}
      </main>

      {/* Sticky Actions for both mobile and desktop */}
      {materials.length > 0 && (
        <MaterialStickyActions
          selectedMaterialId={selectedMaterial}
          allMaterials={allMaterials}
          showAllMaterials={showAllMaterials}
          totalMaterialsCount={materials.length}
          onShowAll={() => setShowAllMaterials(true)}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
};

export default MaterialFirst;
