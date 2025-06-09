
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

  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-light text-foreground mb-6 leading-tight">
        {getPageTitle()}
      </h1>
      <p className="text-xl text-muted-foreground">
        Tell us more about your vision using DirectCreate data
      </p>
    </div>
  );
};

export default ProjectFormTitle;
