
interface ProjectFormTitleProps {
  contextData?: any;
}

const ProjectFormTitle = ({ contextData }: ProjectFormTitleProps) => {
  // Get dynamic title based on selection
  const getPageTitle = () => {
    if (contextData?.selectedCraft) {
      return `${contextData.selectedCraft.name} Project Details`;
    }
    if (contextData?.selectedMaterial) {
      return `${contextData.selectedMaterial.name} Project Details`;
    }
    if (contextData?.selectedTechnique) {
      return `${contextData.selectedTechnique.name} Project Details`;
    }
    return "Project Details";
  };

  // Get contextual description
  const getContextualDescription = () => {
    if (contextData?.selectedCraft) {
      return `Define your ${contextData.selectedCraft.name} project vision and let our AI suggest compatible materials and expert artisans.`;
    }
    if (contextData?.selectedMaterial) {
      return `Define your ${contextData.selectedMaterial.name} project vision and let our AI suggest compatible crafts and expert artisans.`;
    }
    if (contextData?.selectedTechnique) {
      return `Define your ${contextData.selectedTechnique.name} project vision and let our AI suggest compatible materials and expert artisans.`;
    }
    return "Tell us more about your vision using DirectCreate data";
  };

  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-light text-foreground mb-6 leading-tight">
        {getPageTitle()}
      </h1>
      <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
        {getContextualDescription()}
      </p>
    </div>
  );
};

export default ProjectFormTitle;
