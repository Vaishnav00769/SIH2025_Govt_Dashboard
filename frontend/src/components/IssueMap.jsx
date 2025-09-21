import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, MapPin, User, TrendingUp, Clock, Users, Shield, AlertTriangle } from 'lucide-react';
import { categoryConfig, statusConfig, priorityConfig, escalationLevels, verificationStatusConfig } from '../data/mockData';
import L from 'leaflet';

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons for different categories with frequency indication
const createCustomIcon = (category, frequency) => {
  const config = categoryConfig[category];
  const color = config?.color || '#3b82f6';
  
  // Size based on frequency
  let size = 25;
  if (frequency > 15) size = 35;
  else if (frequency > 10) size = 30;
  else if (frequency > 5) size = 28;
  
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="
      background-color: ${color};
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: ${frequency > 10 ? '10px' : '8px'};
    ">${frequency}</div>`,
    iconSize: [size, size],
    iconAnchor: [size/2, size/2]
  });
};

const IssueMap = ({ issues }) => {
  const [selectedIssue, setSelectedIssue] = useState(null);

  // Default center on Ranchi, Jharkhand
  const defaultCenter = [23.3441, 85.3096];

  const handleStatusUpdate = (issueId, newStatus) => {
    // In real app, this would update via API
    console.log(`Updating issue ${issueId} to status: ${newStatus}`);
  };

  const handleEscalate = (issueId) => {
    // In real app, this would escalate via API
    console.log(`Escalating issue ${issueId}`);
  };

  return (
    <MapContainer
      center={defaultCenter}
      zoom={12}
      style={{ height: '100%', width: '100%', minHeight: '400px' }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {issues.map((issue) => (
        <Marker
          key={issue.id}
          position={[issue.location.lat, issue.location.lng]}
          icon={createCustomIcon(issue.category)}
        >
          <Popup maxWidth={400} className="custom-popup">
            <div className="p-2 max-w-sm">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-slate-800 text-sm leading-tight pr-2">
                  {issue.title}
                </h3>
                <Badge 
                  variant="outline" 
                  style={{ 
                    backgroundColor: statusConfig[issue.status]?.color + '20',
                    borderColor: statusConfig[issue.status]?.color,
                    color: statusConfig[issue.status]?.color
                  }}
                  className="text-xs whitespace-nowrap"
                >
                  {statusConfig[issue.status]?.name}
                </Badge>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 mb-3 line-clamp-2">
                {issue.description}
              </p>

              {/* Info Grid */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{issue.location.address}</span>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-slate-500" />
                    <span>{new Date(issue.dateReported).toLocaleDateString()}</span>
                  </div>
                  <Badge 
                    variant="outline" 
                    style={{ 
                      backgroundColor: priorityConfig[issue.priority]?.color + '20',
                      borderColor: priorityConfig[issue.priority]?.color,
                      color: priorityConfig[issue.priority]?.color
                    }}
                    className="text-xs"
                  >
                    {priorityConfig[issue.priority]?.name}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3 text-slate-500" />
                    <span>{issue.reporter.name}</span>
                  </div>
                  <Badge 
                    variant="outline" 
                    style={{ 
                      backgroundColor: escalationLevels[issue.escalationLevel]?.color + '20',
                      borderColor: escalationLevels[issue.escalationLevel]?.color,
                      color: escalationLevels[issue.escalationLevel]?.color
                    }}
                    className="text-xs"
                  >
                    {escalationLevels[issue.escalationLevel]?.name}
                  </Badge>
                </div>

                <div className="flex items-center gap-1 text-xs">
                  <span className="font-medium text-slate-700">Category:</span>
                  <span className="text-slate-600">{categoryConfig[issue.category]?.name}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-2 border-t border-slate-200">
                {issue.status === 'pending' && (
                  <Button 
                    size="sm" 
                    className="text-xs bg-blue-600 hover:bg-blue-700"
                    onClick={() => handleStatusUpdate(issue.id, 'in_progress')}
                  >
                    Start Work
                  </Button>
                )}
                {issue.status === 'in_progress' && (
                  <Button 
                    size="sm" 
                    className="text-xs bg-green-600 hover:bg-green-700"
                    onClick={() => handleStatusUpdate(issue.id, 'resolved')}
                  >
                    Mark Resolved
                  </Button>
                )}
                {issue.status !== 'escalated' && issue.escalationLevel !== 'central' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => handleEscalate(issue.id)}
                  >
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Escalate
                  </Button>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default IssueMap;