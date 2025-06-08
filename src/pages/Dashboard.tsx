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
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <header className="px-4 sm:px-6 py-4 flex items-center justify-between border-b border-border/20 flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate("/")}
          className="hover:bg-accent rounded-xl"
        >
          <ArrowLeft className="w-4 h-4 mr-2 stroke-[1.5]" />
          Home
        </Button>
        
        <h1 className="text-lg font-medium">Dashboard</h1>
        
        <Button
          onClick={() => navigate("/")}
          size="sm"
          className="h-10 px-4 rounded-xl font-bold"
        >
          <Plus className="w-4 h-4 mr-2 stroke-[1.5]" />
          New Project
        </Button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 sm:px-6 py-6 sm:py-8 max-w-7xl mx-auto w-full flex flex-col min-h-0">
        <div className="mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-foreground mb-4 sm:mb-6 leading-tight">
            Your Creative
            <br />
            Collaborations
          </h1>
          <p className="text-muted-foreground text-lg sm:text-xl font-light">
            Track your projects and connect with talented makers
          </p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {stats.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <div key={i} className="bg-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-center">
                <div className="flex items-center justify-center mb-4 sm:mb-6">
                  <div className="p-3 sm:p-4 rounded-2xl bg-primary/10">
                    <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-primary stroke-[1.5]" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground font-medium text-sm sm:text-base">{stat.label}</div>
              </div>
            );
          })}
        </div>
        
        {/* Active Collaborations */}
        <div className="flex-1 min-h-0">
          <h2 className="text-2xl sm:text-3xl font-light text-foreground mb-6 sm:mb-8">Active Collaborations</h2>
          
          {activeCollaborations.length === 0 ? (
            <div className="bg-card rounded-2xl sm:rounded-3xl p-12 sm:p-16 text-center h-full flex flex-col justify-center">
              <div className="text-6xl sm:text-8xl mb-6 sm:mb-8">🎨</div>
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6">No active collaborations yet</h3>
              <p className="text-muted-foreground mb-8 sm:mb-12 text-lg sm:text-xl font-light">Start your first creative project with talented makers</p>
              <Button onClick={() => navigate("/")} size="lg" className="h-12 sm:h-14 px-8 sm:px-12 rounded-2xl font-bold text-base sm:text-lg">
                <Plus className="w-5 h-5 mr-2 stroke-[1.5]" />
                Start New Project
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {activeCollaborations.map((collaboration) => (
                <div key={collaboration.id} className="bg-card rounded-2xl sm:rounded-3xl p-8 sm:p-12">
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
