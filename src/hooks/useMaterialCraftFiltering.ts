
import { useState } from "react";

export const useMaterialCraftFiltering = (materials: any[], crafts: any[]) => {
  const [filteredMaterials, setFilteredMaterials] = useState(materials);
  const [filteredCrafts, setFilteredCrafts] = useState(crafts);
  const [loadingCompatibleCrafts, setLoadingCompatibleCrafts] = useState(false);
  const [loadingCompatibleMaterials, setLoadingCompatibleMaterials] = useState(false);
  const [materialFilterMessage, setMaterialFilterMessage] = useState("");
  const [craftFilterMessage, setCraftFilterMessage] = useState("");

  return {
    filteredMaterials,
    setFilteredMaterials,
    filteredCrafts,
    setFilteredCrafts,
    loadingCompatibleCrafts,
    setLoadingCompatibleCrafts,
    loadingCompatibleMaterials,
    setLoadingCompatibleMaterials,
    materialFilterMessage,
    setMaterialFilterMessage,
    craftFilterMessage,
    setCraftFilterMessage
  };
};
