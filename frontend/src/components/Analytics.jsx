import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell,
  LineChart, Line,
  Area, AreaChart
} from 'recharts';
import { mockIssues, categoryConfig, statusConfig, escalationLevels, verificationStatusConfig } from '../data/mockData';

const Analytics = () => {
  // Category data for bar chart
  const categoryData = Object.entries(categoryConfig).map(([key, config]) => ({
    name: config.name.split('/')[0].trim(), // Shorten names
    count: mockIssues.filter(issue => issue.category === key).length,
    color: config.color
  })).filter(item => item.count > 0);

  // Status data for pie chart
  const statusData = Object.entries(statusConfig).map(([key, config]) => ({
    name: config.name,
    value: mockIssues.filter(issue => issue.status === key).length,
    color: config.color
  })).filter(item => item.value > 0);

  // Time series data for line chart (last 7 days)
  const timeSeriesData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dateStr = date.toISOString().split('T')[0];
    
    // Simulate some data distribution
    const count = Math.floor(Math.random() * 5) + 1;
    
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      issues: count
    };
  });

  // Escalation data for area chart
  const escalationData = Object.entries(escalationLevels).map(([key, config]) => ({
    level: config.name,
    count: mockIssues.filter(issue => issue.escalationLevel === key).length,
    color: config.color
  }));

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Analytics Dashboard</h1>
        <p className="text-slate-600">Comprehensive analysis of civic issues and resolution patterns</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Issues by Category - Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Issues by Category</CardTitle>
            <CardDescription>Distribution of reported issues across different categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count">
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Issues by Status - Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Issues by Status</CardTitle>
            <CardDescription>Current status distribution of all reported issues</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Issues Reported Over Time - Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Issues Reported Over Time</CardTitle>
            <CardDescription>Daily trend of new issue reports (Last 7 days)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="issues" 
                  stroke="#3b82f6" 
                  strokeWidth={3}
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Escalation Levels - Area Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Issues by Escalation Level</CardTitle>
            <CardDescription>Distribution of issues across different authority levels</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={escalationData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="level" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="count">
                  {escalationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-900">{mockIssues.length}</div>
            <div className="text-sm text-blue-700">Total Issues</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-900">
              {((mockIssues.filter(i => i.status === 'resolved').length / mockIssues.length) * 100).toFixed(1)}%
            </div>
            <div className="text-sm text-green-700">Resolution Rate</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-900">
              {mockIssues.filter(i => i.priority === 'critical' || i.priority === 'high').length}
            </div>
            <div className="text-sm text-orange-700">High Priority</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-900">
              {mockIssues.filter(i => i.category === 'ai_miscellaneous').length}
            </div>
            <div className="text-sm text-purple-700">AI Categorized</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;