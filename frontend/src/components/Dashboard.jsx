import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Button } from './ui/button';
import { 
  MapPin, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Filter,
  X,
  Shield,
  Users,
  Eye,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import IssueMap from './IssueMap';
import { mockIssues, categoryConfig, statusConfig, priorityConfig, escalationLevels, verificationStatusConfig } from '../data/mockData';

const Dashboard = () => {
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    priority: 'all',
    escalationLevel: 'all',
    verificationStatus: 'all'
  });

  const filteredIssues = useMemo(() => {
    return mockIssues.filter(issue => {
      return (filters.category === 'all' || issue.category === filters.category) &&
             (filters.status === 'all' || issue.status === filters.status) &&
             (filters.priority === 'all' || issue.priority === filters.priority) &&
             (filters.escalationLevel === 'all' || issue.escalationLevel === filters.escalationLevel) &&
             (filters.verificationStatus === 'all' || issue.aiVerificationStatus === filters.verificationStatus);
    });
  }, [filters]);

  const stats = useMemo(() => {
    const total = filteredIssues.length;
    const resolved = filteredIssues.filter(issue => issue.status === 'resolved').length;
    const pending = filteredIssues.filter(issue => issue.status === 'pending').length;
    const critical = filteredIssues.filter(issue => issue.priority === 'critical').length;
    const escalated = filteredIssues.filter(issue => issue.status === 'escalated').length;
    const verified = filteredIssues.filter(issue => issue.aiVerificationStatus === 'verified').length;
    const highFrequency = filteredIssues.filter(issue => issue.frequency > 10).length;
    const totalReports = filteredIssues.reduce((sum, issue) => sum + issue.reportCount, 0);
    
    return { total, resolved, pending, critical, escalated, verified, highFrequency, totalReports };
  }, [filteredIssues]);

  const clearFilters = () => {
    setFilters({
      category: 'all',
      status: 'all', 
      priority: 'all',
      escalationLevel: 'all'
    });
  };

  const hasActiveFilters = Object.values(filters).some(filter => filter !== 'all');

  return (
    <div className="p-6 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Total Issues</p>
                <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
              </div>
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Resolved</p>
                <p className="text-2xl font-bold text-green-900">{stats.resolved}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Pending</p>
                <p className="text-2xl font-bold text-red-900">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Critical</p>
                <p className="text-2xl font-bold text-orange-900">{stats.critical}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Escalated</p>
                <p className="text-2xl font-bold text-purple-900">{stats.escalated}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Category</label>
              <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.entries(categoryConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>{config.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Status</label>
              <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>{config.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Priority</label>
              <Select value={filters.priority} onValueChange={(value) => setFilters({...filters, priority: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  {Object.entries(priorityConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>{config.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Escalation Level</label>
              <Select value={filters.escalationLevel} onValueChange={(value) => setFilters({...filters, escalationLevel: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="All Levels" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {Object.entries(escalationLevels).map(([key, config]) => (
                    <SelectItem key={key} value={key}>{config.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Map */}
      <Card>
        <CardHeader>
          <CardTitle>Issue Location Map</CardTitle>
          <CardDescription>
            Interactive map showing civic issues across Jharkhand. Click markers for details.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="h-96 rounded-lg overflow-hidden">
            <IssueMap issues={filteredIssues} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;