import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { 
  Search, 
  Download, 
  Eye, 
  TrendingUp, 
  RefreshCw,
  Filter,
  X
} from 'lucide-react';
import { mockIssues, categoryConfig, statusConfig, priorityConfig, escalationLevels, verificationStatusConfig } from '../data/mockData';
import { useToast } from '../hooks/use-toast';

const IssuesTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: 'all',
    status: 'all',
    priority: 'all',
    escalationLevel: 'all'
  });
  const [sortBy, setSortBy] = useState('dateReported');
  const [sortOrder, setSortOrder] = useState('desc');
  const { toast } = useToast();

  const filteredAndSortedIssues = useMemo(() => {
    let filtered = mockIssues.filter(issue => {
      const matchesSearch = issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           issue.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           issue.location.address.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilters = (filters.category === 'all' || issue.category === filters.category) &&
                            (filters.status === 'all' || issue.status === filters.status) &&
                            (filters.priority === 'all' || issue.priority === filters.priority) &&
                            (filters.escalationLevel === 'all' || issue.escalationLevel === filters.escalationLevel);
      
      return matchesSearch && matchesFilters;
    });

    // Sort
    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (sortBy === 'dateReported') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [searchTerm, filters, sortBy, sortOrder]);

  const handleStatusUpdate = (issueId, newStatus) => {
    toast({
      title: "Status Updated",
      description: `Issue #${issueId} status changed to ${statusConfig[newStatus]?.name}`,
    });
  };

  const handleEscalate = (issueId) => {
    toast({
      title: "Issue Escalated",
      description: `Issue #${issueId} has been escalated to the next authority level`,
    });
  };

  const exportToCSV = () => {
    const csvContent = [
      ['ID', 'Title', 'Category', 'Status', 'Priority', 'Location', 'Date Reported', 'Reporter', 'Escalation Level'],
      ...filteredAndSortedIssues.map(issue => [
        issue.id,
        issue.title,
        categoryConfig[issue.category]?.name,
        statusConfig[issue.status]?.name,
        priorityConfig[issue.priority]?.name,
        issue.location.address,
        new Date(issue.dateReported).toLocaleDateString(),
        issue.reporter.name,
        escalationLevels[issue.escalationLevel]?.name
      ])
    ].map(row => row.map(field => `"${field}"`).join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'civic_issues_export.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
    
    toast({
      title: "Export Complete",
      description: `${filteredAndSortedIssues.length} issues exported to CSV`,
    });
  };

  const clearFilters = () => {
    setFilters({
      category: 'all',
      status: 'all',
      priority: 'all',
      escalationLevel: 'all'
    });
    setSearchTerm('');
  };

  const hasActiveFilters = Object.values(filters).some(filter => filter !== 'all') || searchTerm !== '';

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Issues Table</h1>
          <p className="text-slate-600">Manage and track all civic issues in tabular format</p>
        </div>
        <Button onClick={exportToCSV} className="bg-green-600 hover:bg-green-700">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Search & Filter
            </CardTitle>
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={clearFilters}>
                <X className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search issues by title, description, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {Object.entries(categoryConfig).map(([key, config]) => (
                  <SelectItem key={key} value={key}>{config.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                {Object.entries(statusConfig).map(([key, config]) => (
                  <SelectItem key={key} value={key}>{config.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.priority} onValueChange={(value) => setFilters({...filters, priority: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                {Object.entries(priorityConfig).map(([key, config]) => (
                  <SelectItem key={key} value={key}>{config.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.escalationLevel} onValueChange={(value) => setFilters({...filters, escalationLevel: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Escalation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                {Object.entries(escalationLevels).map(([key, config]) => (
                  <SelectItem key={key} value={key}>{config.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dateReported">Date Reported</SelectItem>
                <SelectItem value="priority">Priority</SelectItem>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="title">Title</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between text-sm text-slate-600">
        <span>Showing {filteredAndSortedIssues.length} of {mockIssues.length} issues</span>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">ID</TableHead>
                  <TableHead className="min-w-48">Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Reporter</TableHead>
                  <TableHead>Escalation</TableHead>
                  <TableHead className="w-32">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAndSortedIssues.map((issue) => (
                  <TableRow key={issue.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium">#{issue.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-sm">{issue.title}</div>
                        <div className="text-xs text-slate-500 truncate max-w-xs">
                          {issue.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {categoryConfig[issue.category]?.name.split('/')[0]}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        style={{ 
                          backgroundColor: statusConfig[issue.status]?.color + '20',
                          borderColor: statusConfig[issue.status]?.color,
                          color: statusConfig[issue.status]?.color
                        }}
                        className="text-xs"
                      >
                        {statusConfig[issue.status]?.name}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        style={{ 
                          backgroundColor: priorityConfig[issue.priority]?.color + '20',
                          borderColor: priorityConfig[issue.priority]?.color,
                          color: priorityConfig[issue.priority]?.color
                        }}
                        className="text-xs"
                      >
                        {priorityConfig[issue.priority]?.name}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs max-w-32 truncate">
                      {issue.location.address}
                    </TableCell>
                    <TableCell className="text-xs">
                      {new Date(issue.dateReported).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-xs">{issue.reporter.name}</TableCell>
                    <TableCell>
                      <Badge 
                        style={{ 
                          backgroundColor: escalationLevels[issue.escalationLevel]?.color + '20',
                          borderColor: escalationLevels[issue.escalationLevel]?.color,
                          color: escalationLevels[issue.escalationLevel]?.color
                        }}
                        className="text-xs"
                      >
                        {escalationLevels[issue.escalationLevel]?.name}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {issue.status === 'pending' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-xs px-2 py-1 h-7"
                            onClick={() => handleStatusUpdate(issue.id, 'in_progress')}
                          >
                            Start
                          </Button>
                        )}
                        {issue.status === 'in_progress' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-xs px-2 py-1 h-7"
                            onClick={() => handleStatusUpdate(issue.id, 'resolved')}
                          >
                            Resolve
                          </Button>
                        )}
                        {issue.status !== 'escalated' && issue.escalationLevel !== 'central' && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="text-xs px-2 py-1 h-7"
                            onClick={() => handleEscalate(issue.id)}
                          >
                            <TrendingUp className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IssuesTable;