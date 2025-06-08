
const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-lg text-muted-foreground">Loading DirectCreate data...</p>
        <p className="text-sm text-muted-foreground mt-2">Fetching materials, crafts, and techniques...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
