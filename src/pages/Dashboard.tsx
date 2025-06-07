
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, MessageCircle, Clock, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: "Active Projects", value: "3", color: "blue", icon: Clock },
    { label: "Pending Responses", value: "1", color: "orange", icon: MessageCircle },
    { label: "Completed", value: "12", color: "green", icon: CheckCircle },
    { label: "Messages", value: "5", color: "purple", icon: MessageCircle }
  ];

  const activeCollaborations = [
    {
      id: 1,
      title: "Custom Traditional Table",
      category: "Traditional Woodworking",
      status: "Awaiting Response",
      maker: {
        name: "Rajesh Kumar",
        location: "Jodhpur, Rajasthan",
        avatar: "👨‍🎨"
      },
      timeline: "15-25 days",
      sentTime: "2 hours ago",
      statusColor: "orange"
    }
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border/50 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="hover:bg-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Home
          </Button>
          
          <h1 className="text-lg font-semibold">Dashboard</h1>
          
          <Button
            onClick={() => navigate("/")}
            size="sm"
            className="rounded-xl"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-16">
          <h1 className="text-4xl font-light text-foreground mb-4">
            Your Collaborations
          </h1>
          <p className="text-muted-foreground">
            Track your creative projects and connect with talented makers
          </p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <div key={i} className="bg-card rounded-3xl p-6 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className={`p-3 rounded-2xl bg-${stat.color}-100 dark:bg-${stat.color}-900/20`}>
                    <IconComponent className={`w-6 h-6 text-${stat.color}-600`} />
                  </div>
                </div>
                <div className={`text-3xl font-bold text-${stat.color}-600 mb-2`}>{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>
        
        {/* Active Collaborations */}
        <div className="space-y-6">
          <h2 className="text-2xl font-light text-foreground">Active Collaborations</h2>
          
          {activeCollaborations.length === 0 ? (
            <div className="bg-card rounded-3xl p-12 text-center">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-foreground mb-3">No active collaborations yet</h3>
              <p className="text-muted-foreground mb-6">Start your first creative project with talented makers</p>
              <Button onClick={() => navigate("/")} size="lg" className="rounded-2xl">
                <Plus className="w-5 h-5 mr-2" />
                Start New Project
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {activeCollaborations.map((collaboration) => (
                <div key={collaboration.id} className="bg-card rounded-3xl p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{collaboration.title}</h3>
                      <div className="flex items-center gap-4 text-muted-foreground">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                          {collaboration.category}
                        </span>
                        <span className={`bg-${collaboration.statusColor}-100 dark:bg-${collaboration.statusColor}-900/20 text-${collaboration.statusColor}-800 dark:text-${collaboration.statusColor}-400 px-3 py-1 rounded-full text-sm`}>
                          {collaboration.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Sent {collaboration.sentTime}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Maker</h4>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                          {collaboration.maker.avatar}
                        </div>
                        <div>
                          <p className="font-medium">{collaboration.maker.name}</p>
                          <p className="text-sm text-muted-foreground">{collaboration.maker.location}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Timeline</h4>
                      <p className="text-foreground">{collaboration.timeline}</p>
                      <p className="text-sm text-muted-foreground">Estimated collaboration period</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Status</h4>
                      <p className={`text-${collaboration.statusColor}-600 font-medium`}>
                        Response expected within 24-48 hours
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <Button variant="outline" className="rounded-xl">
                      View Details
                    </Button>
                    <Button variant="outline" className="rounded-xl">
                      Send Follow-up
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
