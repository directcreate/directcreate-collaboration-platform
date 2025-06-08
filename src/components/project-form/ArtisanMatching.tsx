
import { Users, Loader2 } from "lucide-react";
import ArtisanCard from "./ArtisanCard";
import SelectionSummary from "./SelectionSummary";
import ArtisanLoadingState from "./ArtisanLoadingState";
import ArtisanEmptyState from "./ArtisanEmptyState";
import { useCompatibleArtisans } from "../../hooks/useCompatibleArtisans";

interface ArtisanMatchingProps {
  selectedMaterial: string;
  selectedCraft: string;
  selectedTechnique: string;
  materials: any[];
  crafts: any[];
  techniques: any[];
}

const ArtisanMatching = ({
  selectedMaterial,
  selectedCraft,
  selectedTechnique,
  materials,
  crafts,
  techniques
}: ArtisanMatchingProps) => {
  const { compatibleArtisans, loading, message } = useCompatibleArtisans(
    selectedMaterial,
    selectedCraft,
    selectedTechnique
  );

  const getSelectedMaterial = () => materials.find(m => m.id.toString() === selectedMaterial);
  const getSelectedCraft = () => crafts.find(c => c.id.toString() === selectedCraft);
  const getSelectedTechnique = () => techniques.find(t => t.id.toString() === selectedTechnique);

  if (!selectedMaterial && !selectedCraft) {
    return null;
  }

  return (
    <div className="bg-card rounded-2xl p-6 border border-border/20">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-semibold">Specialized Artisans</h2>
        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
      </div>

      <SelectionSummary
        selectedMaterial={getSelectedMaterial()}
        selectedCraft={getSelectedCraft()}
        selectedTechnique={getSelectedTechnique()}
      />

      {message && (
        <div className="text-sm text-primary p-3 bg-primary/5 border border-primary/20 rounded-lg mb-6">
          {message}
        </div>
      )}

      {/* Artisan Cards */}
      {compatibleArtisans.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {compatibleArtisans.map((artisan) => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
        </div>
      )}

      {loading && compatibleArtisans.length === 0 && <ArtisanLoadingState />}

      {!loading && compatibleArtisans.length === 0 && (selectedMaterial || selectedCraft) && (
        <ArtisanEmptyState />
      )}
    </div>
  );
};

export default ArtisanMatching;
