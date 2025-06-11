
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Wifi, WifiOff, Clock } from "lucide-react";
import { checkApiHealth } from "../../config/apiConfig";

const ConnectionStatus = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  const checkConnection = async () => {
    try {
      console.log('🔍 Checking DirectCreate API connection...');
      const response = await checkApiHealth();
      
      if (response && response.success) {
        setStatus('connected');
        console.log('✅ DirectCreate API is connected');
      } else {
        setStatus('disconnected');
        console.log('❌ DirectCreate API returned unsuccessful response');
      }
    } catch (error) {
      setStatus('disconnected');
      console.error('❌ DirectCreate API connection failed:', error);
    }
    
    setLastCheck(new Date());
  };

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusProps = () => {
    switch (status) {
      case 'connected':
        return {
          variant: 'default' as const,
          className: 'bg-green-500 hover:bg-green-600',
          icon: <Wifi className="w-3 h-3" />,
          text: 'DirectCreate Connected'
        };
      case 'disconnected':
        return {
          variant: 'destructive' as const,
          className: '',
          icon: <WifiOff className="w-3 h-3" />,
          text: 'DirectCreate Offline'
        };
      default:
        return {
          variant: 'outline' as const,
          className: '',
          icon: <Clock className="w-3 h-3" />,
          text: 'Checking...'
        };
    }
  };

  const statusProps = getStatusProps();

  return (
    <div className="flex items-center gap-2">
      <Badge 
        variant={statusProps.variant} 
        className={`gap-1 ${statusProps.className}`}
      >
        {statusProps.icon}
        {statusProps.text}
      </Badge>
      {lastCheck && (
        <span className="text-xs text-muted-foreground">
          {lastCheck.toLocaleTimeString()}
        </span>
      )}
    </div>
  );
};

export default ConnectionStatus;
