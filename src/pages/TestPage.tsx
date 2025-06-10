
import APITester from "@/components/debug/APITester";
import ConnectionStatus from "@/components/debug/ConnectionStatus";
import APIDiagnostics from "@/components/debug/APIDiagnostics";
import APIIntegrationTest from "../components/debug/APIIntegrationTest";

const TestPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <header className="px-4 sm:px-6 py-4 flex items-center justify-between border-b border-border/20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">API Testing & Diagnostics</h1>
          <ConnectionStatus />
        </div>
      </header>

      {/* API Diagnostics section - priority debugging tool */}
      <section className="py-16 px-4 sm:px-6 bg-red-50/50 border-b">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-red-800">🚨 API Connection Diagnostics</h2>
            <p className="text-lg text-red-600">
              Diagnose and identify the exact DirectCreate API connection issue
            </p>
          </div>
          <APIDiagnostics />
        </div>
      </section>

      {/* API Tester section */}
      <section className="py-16 px-4 sm:px-6 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">API Connection Testing</h2>
            <p className="text-lg text-muted-foreground">
              Test and verify DirectCreate API connectivity
            </p>
          </div>
          <APITester />
        </div>
      </section>

      {/* API Integration Test Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">API Integration Status</h2>
            <p className="text-muted-foreground">
              Testing DirectCreate Enhanced ML API integration
            </p>
          </div>
          <APIIntegrationTest />
        </div>
      </section>
    </div>
  );
};

export default TestPage;
