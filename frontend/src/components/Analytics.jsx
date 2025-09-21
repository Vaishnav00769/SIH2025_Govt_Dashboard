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

  // Verification status data for pie chart
  const verificationData = Object.entries(verificationStatusConfig).map(([key, config]) => ({
    name: config.name,
    value: mockIssues.filter(issue => issue.aiVerificationStatus === key).length,
    color: config.color
  })).filter(item => item.value > 0);

  // Frequency distribution data
  const frequencyData = [
    { range: '1 Report', count: mockIssues.filter(i => i.frequency === 1).length },
    { range: '2-5 Reports', count: mockIssues.filter(i => i.frequency >= 2 && i.frequency <= 5).length },
    { range: '6-10 Reports', count: mockIssues.filter(i => i.frequency >= 6 && i.frequency <= 10).length },
    { range: '11-15 Reports', count: mockIssues.filter(i => i.frequency >= 11 && i.frequency <= 15).length },
    { range: '15+ Reports', count: mockIssues.filter(i => i.frequency > 15).length }
  ].filter(item => item.count > 0);

  // AI Detection metrics
  const aiMetrics = {
    totalReports: mockIssues.reduce((sum, issue) => sum + issue.reportCount, 0),
    uniqueIssues: mockIssues.length,
    duplicatesDetected: mockIssues.reduce((sum, issue) => sum + (issue.reportCount - 1), 0),
    verificationRate: mockIssues.filter(i => i.aiVerificationStatus === 'verified').length / mockIssues.length,
    avgVerificationScore: mockIssues.reduce((sum, issue) => sum + issue.verificationScore, 0) / mockIssues.length
  };

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

        {/* AI Verification Status - Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>AI Verification Status</CardTitle>
            <CardDescription>Distribution of AI verification results for all issues</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={verificationData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {verificationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Report Frequency Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Report Frequency Distribution</CardTitle>
            <CardDescription>How many times issues have been reported (AI deduplication)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={frequencyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8b5cf6" />
              </BarChart>
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
      </div>

      {/* AI Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>AI Performance Metrics</CardTitle>
          <CardDescription>Insights into AI deduplication and verification performance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-900">{aiMetrics.totalReports}</div>
              <div className="text-sm text-blue-700">Total Reports Received</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-900">{aiMetrics.uniqueIssues}</div>
              <div className="text-sm text-purple-700">Unique Issues Identified</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-900">{aiMetrics.duplicatesDetected}</div>
              <div className="text-sm text-green-700">Duplicates Detected</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-3xl font-bold text-yellow-900">{(aiMetrics.verificationRate * 100).toFixed(1)}%</div>
              <div className="text-sm text-yellow-700">Verification Rate</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-3xl font-bold text-red-900">{aiMetrics.avgVerificationScore.toFixed(0)}%</div>
              <div className="text-sm text-red-700">Avg AI Confidence</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-900">{mockIssues.length}</div>
            <div className="text-sm text-blue-700">Unique Issues</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-900">
              {mockIssues.filter(i => i.aiVerificationStatus === 'verified').length}
            </div>
            <div className="text-sm text-green-700">AI Verified Issues</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-900">
              {mockIssues.reduce((sum, issue) => sum + issue.reportCount, 0)}
            </div>
            <div className="text-sm text-purple-700">Total Reports</div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-900">
              {mockIssues.filter(i => i.frequency > 10).length}
            </div>
            <div className="text-sm text-orange-700">High-Frequency Issues</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;