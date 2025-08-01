
import React, { useState, useEffect, useMemo } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart, Legend } from 'recharts';
import { Search, Download, FileText, Users, TrendingUp, DollarSign, BarChart3, Moon, Sun, Menu, X, Filter, RefreshCw, Eye, TrendingDown } from 'lucide-react';
import './App.css';

const ADmyBRANDDashboard = () => {
  // State Management
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [selectedDateRange, setSelectedDateRange] = useState('30d');
  const [selectedCampaignType, setSelectedCampaignType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [realTimeData, setRealTimeData] = useState({
    revenue: 124563,
    users: 45123,
    conversions: 2847,
    growth: 6.3
  });
  const [loading, setLoading] = useState(false);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  // Mock Data
  const campaignData = [
    { id: 1, name: 'Summer Sale 2024', type: 'Social Media', status: 'active', impressions: 45000, clicks: 1250, ctr: 2.78, conversions: 89, revenue: 8950, date: '2024-01-15' },
    { id: 2, name: 'Holiday Promotion', type: 'Search Ads', status: 'active', impressions: 32000, clicks: 980, ctr: 3.06, conversions: 67, revenue: 6700, date: '2024-01-10' },
    { id: 3, name: 'Brand Awareness', type: 'Display Ads', status: 'pending', impressions: 28000, clicks: 420, ctr: 1.5, conversions: 24, revenue: 2400, date: '2024-01-08' },
    { id: 4, name: 'Product Launch', type: 'Social Media', status: 'active', impressions: 52000, clicks: 1560, ctr: 3.0, conversions: 124, revenue: 12400, date: '2024-01-20' },
    { id: 5, name: 'Retargeting Campaign', type: 'Display Ads', status: 'active', impressions: 18000, clicks: 720, ctr: 4.0, conversions: 86, revenue: 8600, date: '2024-01-12' },
    { id: 6, name: 'Email Newsletter', type: 'Email', status: 'inactive', impressions: 15000, clicks: 300, ctr: 2.0, conversions: 18, revenue: 1800, date: '2024-01-05' },
    { id: 7, name: 'Video Campaign', type: 'YouTube', status: 'active', impressions: 75000, clicks: 2250, ctr: 3.0, conversions: 180, revenue: 18000, date: '2024-01-25' },
    { id: 8, name: 'Mobile App Promo', type: 'Mobile', status: 'pending', impressions: 40000, clicks: 1200, ctr: 3.0, conversions: 96, revenue: 9600, date: '2024-01-18' },
    { id: 9, name: 'Local Business', type: 'Search Ads', status: 'active', impressions: 25000, clicks: 875, ctr: 3.5, conversions: 70, revenue: 7000, date: '2024-01-22' },
    { id: 10, name: 'Influencer Collab', type: 'Social Media', status: 'active', impressions: 35000, clicks: 1050, ctr: 3.0, conversions: 84, revenue: 8400, date: '2024-01-14' }
  ];

  const revenueChartData = [
    { name: 'Week 1', revenue: 12000, users: 1200, conversions: 89 },
    { name: 'Week 2', revenue: 15000, users: 1500, conversions: 112 },
    { name: 'Week 3', revenue: 18000, users: 1800, conversions: 134 },
    { name: 'Week 4', revenue: 22000, users: 2100, conversions: 156 },
    { name: 'Week 5', revenue: 25000, users: 2400, conversions: 178 },
    { name: 'Week 6', revenue: 28000, users: 2700, conversions: 201 },
    { name: 'Week 7', revenue: 32000, users: 3000, conversions: 223 }
  ];

  const campaignPerformanceData = [
    { name: 'Social Media', conversions: 450, revenue: 45000 },
    { name: 'Search Ads', conversions: 380, revenue: 38000 },
    { name: 'Display Ads', conversions: 280, revenue: 28000 },
    { name: 'Email', conversions: 150, revenue: 15000 },
    { name: 'YouTube', conversions: 320, revenue: 32000 }
  ];

  const trafficSourceData = [
    { name: 'Direct', value: 30, color: '#6366f1' },
    { name: 'Social Media', value: 25, color: '#8b5cf6' },
    { name: 'Search Engines', value: 20, color: '#10b981' },
    { name: 'Referrals', value: 15, color: '#f59e0b' },
    { name: 'Email', value: 10, color: '#ef4444' }
  ];

  const demographicsData = [
    { name: '18-24', value: 25, color: '#6366f1' },
    { name: '25-34', value: 35, color: '#8b5cf6' },
    { name: '35-44', value: 20, color: '#10b981' },
    { name: '45-54', value: 15, color: '#f59e0b' },
    { name: '55+', value: 5, color: '#ef4444' }
  ];

  // Real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        revenue: prev.revenue + Math.floor(Math.random() * 1000 - 500),
        users: prev.users + Math.floor(Math.random() * 100 - 50),
        conversions: prev.conversions + Math.floor(Math.random() * 20 - 10),
        growth: +(prev.growth + (Math.random() * 0.4 - 0.2)).toFixed(1)
      }));
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Filtered and sorted data
  const filteredData = useMemo(() => {
    let filtered = campaignData.filter(campaign => {
      const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           campaign.type.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedCampaignType === 'all' || 
                         campaign.type.toLowerCase().includes(selectedCampaignType.toLowerCase());
      const matchesStatus = selectedStatus === 'all' || campaign.status === selectedStatus;
      
      return matchesSearch && matchesType && matchesStatus;
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [searchTerm, selectedCampaignType, selectedStatus, sortConfig, campaignData]);

  // Pagination
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Handlers
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleExportPDF = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('PDF Export functionality would be implemented here!');
    }, 2000);
  };

  const handleExportCSV = () => {
    const csvContent = [
      ['Campaign Name', 'Type', 'Status', 'Impressions', 'Clicks', 'CTR', 'Conversions', 'Revenue'],
      ...filteredData.map(campaign => [
        campaign.name,
        campaign.type,
        campaign.status,
        campaign.impressions,
        campaign.clicks,
        campaign.ctr,
        campaign.conversions,
        campaign.revenue
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'campaign-data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const applyFilters = () => {
    setLoading(true);
    setCurrentPage(1);
    setTimeout(() => setLoading(false), 1000);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Component JSX
  return (
    <div className={`app ${darkMode ? 'dark' : ''}`} style={{ backgroundColor: darkMode ? '#0f172a' : '#f8fafc' }}>
      {/* Sidebar */}
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : 'expanded'}`}>
        <div style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}>
              A
            </div>
            {!sidebarCollapsed && (
              <h1 className="gradient-text" style={{ fontSize: '20px', fontWeight: 'bold' }}>
                ADmyBRAND
              </h1>
            )}
          </div>
        </div>

        <nav style={{ padding: '0 16px' }}>
          {[
            { icon: BarChart3, label: 'Dashboard', active: true },
            { icon: TrendingUp, label: 'Analytics' },
            { icon: Users, label: 'Customers' },
            { icon: Eye, label: 'Campaigns' },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  marginBottom: '8px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  background: item.active
                    ? 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)'
                    : 'transparent',
                  color: item.active
                    ? 'white'
                    : darkMode ? '#94a3b8' : '#64748b'
                }}
                onMouseEnter={(e) => {
                  if (!item.active) {
                    e.target.style.backgroundColor = darkMode ? '#334155' : '#f1f5f9';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!item.active) {
                    e.target.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Icon size={20} />
                {!sidebarCollapsed && <span style={{ fontWeight: '500' }}>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className={`main-content ${sidebarCollapsed ? 'collapsed' : 'expanded'}`}>
        <div style={{ padding: '24px' }}>
          {/* Header */}
          <div className="chart-container" style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', flexDirection: window.innerWidth < 1024 ? 'column' : 'row', alignItems: window.innerWidth < 1024 ? 'flex-start' : 'center', justifyContent: 'space-between', gap: '16px' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                  <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      background: darkMode ? '#334155' : '#f1f5f9',
                      border: 'none',
                      cursor: 'pointer',
                      color: darkMode ? '#f1f5f9' : '#475569'
                    }}
                  >
                    <Menu size={20} />
                  </button>
                  <h1 className="gradient-text" style={{ fontSize: '32px', fontWeight: 'bold' }}>
                    Analytics Dashboard
                  </h1>
                </div>
                <p style={{ color: darkMode ? '#94a3b8' : '#64748b', marginBottom: '8px' }}>
                  Welcome back! Here's what's happening with your campaigns today.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="animate-pulse" style={{
                    width: '8px',
                    height: '8px',
                    background: '#10b981',
                    borderRadius: '50%'
                  }}></div>
                  <span style={{ fontSize: '14px', color: '#10b981', fontWeight: '500' }}>Live data</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <button
                  onClick={handleExportPDF}
                  disabled={loading}
                  className="btn-secondary"
                >
                  {loading ? <RefreshCw size={16} className="animate-spin" /> : <Download size={16} />}
                  Export PDF
                </button>
                <button
                  onClick={handleExportCSV}
                  className="btn-secondary"
                >
                  <FileText size={16} />
                  Export CSV
                </button>
                <button
                  onClick={toggleDarkMode}
                  style={{
                    padding: '12px',
                    borderRadius: '12px',
                    background: darkMode ? '#334155' : '#f1f5f9',
                    border: 'none',
                    cursor: 'pointer',
                    color: darkMode ? '#f1f5f9' : '#475569',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="chart-container" style={{ marginBottom: '24px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: darkMode ? '#94a3b8' : '#374151', marginBottom: '8px' }}>
                  Date Range
                </label>
                <select
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                  className="input-field"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: darkMode ? '#94a3b8' : '#374151', marginBottom: '8px' }}>
                  Campaign Type
                </label>
                <select
                  value={selectedCampaignType}
                  onChange={(e) => setSelectedCampaignType(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Campaigns</option>
                  <option value="social">Social Media</option>
                  <option value="search">Search Ads</option>
                  <option value="display">Display Ads</option>
                </select>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: darkMode ? '#94a3b8' : '#374151', marginBottom: '8px' }}>
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="input-field"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'end' }}>
                <button
                  onClick={applyFilters}
                  disabled={loading}
                  className="btn-primary"
                  style={{ width: '100%' }}
                >
                  {loading ? <RefreshCw size={16} className="animate-spin" /> : <Filter size={16} />}
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Metrics Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px', marginBottom: '24px' }}>
            {[
              {
                title: 'Total Revenue',
                value: `${realTimeData.revenue.toLocaleString()}`,
                change: '+12.5%',
                icon: DollarSign,
                color: 'linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)',
                positive: true
              },
              {
                title: 'Active Users',
                value: realTimeData.users.toLocaleString(),
                change: '+8.2%',
                icon: Users,
                color: 'linear-gradient(135deg, #ec4899 0%, #ef4444 100%)',
                positive: true
              },
              {
                title: 'Conversions',
                value: realTimeData.conversions.toLocaleString(),
                change: '+15.3%',
                icon: TrendingUp,
                color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                positive: true
              },
              {
                title: 'Growth Rate',
                value: `${realTimeData.growth}%`,
                change: '+2.1%',
                icon: BarChart3,
                color: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                positive: true
              }
            ].map((metric, index) => {
              const Icon = metric.icon;
              return (
                <div
                  key={index}
                  className="metric-card animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{
                      padding: '12px',
                      borderRadius: '12px',
                      background: metric.color,
                      color: 'white'
                    }}>
                      <Icon size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 style={{ 
                      fontSize: '28px', 
                      fontWeight: 'bold', 
                      color: darkMode ? '#f1f5f9' : '#1e293b',
                      marginBottom: '8px'
                    }}>
                      {metric.value}
                    </h3>
                    <p style={{ 
                      color: darkMode ? '#94a3b8' : '#64748b', 
                      fontWeight: '500',
                      marginBottom: '8px'
                    }}>
                      {metric.title}
                    </p>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '4px', 
                      fontSize: '14px', 
                      fontWeight: '500',
                      color: metric.positive ? '#10b981' : '#ef4444'
                    }}>
                      {metric.positive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      <span>{metric.change} from last month</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts Section */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '24px', marginBottom: '24px' }}>
            {/* Revenue Trend Chart */}
            <div className="chart-container">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#f1f5f9' : '#1e293b' }}>Revenue Trend</h3>
                <select className="input-field" style={{ width: 'auto', padding: '8px 12px' }}>
                  <option>Weekly</option>
                  <option>Monthly</option>
                  <option>Yearly</option>
                </select>
              </div>
              <div style={{ height: '320px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueChartData}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                    <XAxis dataKey="name" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                    <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                        border: `1px solid ${darkMode ? '#475569' : '#e5e7eb'}`,
                        borderRadius: '12px',
                        color: darkMode ? '#f1f5f9' : '#1f2937'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#revenueGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Campaign Performance Chart */}
            <div className="chart-container">
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#f1f5f9' : '#1e293b', marginBottom: '24px' }}>Campaign Performance</h3>
              <div style={{ height: '320px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={campaignPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                    <XAxis dataKey="name" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                    <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                        border: `1px solid ${darkMode ? '#475569' : '#e5e7eb'}`,
                        borderRadius: '12px',
                        color: darkMode ? '#f1f5f9' : '#1f2937'
                      }}
                    />
                    <Bar dataKey="conversions" fill="#6366f1" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Additional Charts */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '24px', marginBottom: '24px' }}>
            {/* Demographics Chart */}
            <div className="chart-container">
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#f1f5f9' : '#1e293b', marginBottom: '24px' }}>User Demographics</h3>
              <div style={{ height: '320px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={demographicsData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {demographicsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                        border: `1px solid ${darkMode ? '#475569' : '#e5e7eb'}`,
                        borderRadius: '12px',
                        color: darkMode ? '#f1f5f9' : '#1f2937'
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Traffic Sources */}
            <div className="chart-container">
              <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#f1f5f9' : '#1e293b', marginBottom: '24px' }}>Traffic Sources</h3>
              <div style={{ height: '320px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={trafficSourceData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      dataKey="value"
                    >
                      {trafficSourceData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? '#1e293b' : '#ffffff',
                        border: `1px solid ${darkMode ? '#475569' : '#e5e7eb'}`,
                        borderRadius: '12px',
                        color: darkMode ? '#f1f5f9' : '#1f2937'
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="chart-container">
            <div style={{ padding: '24px', borderBottom: `1px solid ${darkMode ? '#475569' : '#e2e8f0'}` }}>
              <div style={{ display: 'flex', flexDirection: window.innerWidth < 1024 ? 'column' : 'row', alignItems: window.innerWidth < 1024 ? 'flex-start' : 'center', justifyContent: 'space-between', gap: '16px' }}>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: darkMode ? '#f1f5f9' : '#1e293b' }}>Campaign Performance</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ position: 'relative' }}>
                    <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={20} />
                    <input
                      type="text"
                      placeholder="Search campaigns..."
                      value={searchTerm}
                      onChange={handleSearch}
                      style={{
                        paddingLeft: '40px',
                        paddingRight: '16px',
                        paddingTop: '8px',
                        paddingBottom: '8px',
                        width: '256px',
                        borderRadius: '12px',
                        border: `1px solid ${darkMode ? '#64748b' : '#e2e8f0'}`,
                        background: darkMode ? '#475569' : '#ffffff',
                        color: darkMode ? '#f1f5f9' : '#1e293b',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="input-field"
                    style={{ width: 'auto' }}
                  >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={25}>25 per page</option>
                    <option value={50}>50 per page</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    {[
                      { key: 'name', label: 'Campaign Name' },
                      { key: 'type', label: 'Type' },
                      { key: 'status', label: 'Status' },
                      { key: 'impressions', label: 'Impressions' },
                      { key: 'clicks', label: 'Clicks' },
                      { key: 'ctr', label: 'CTR' },
                      { key: 'conversions', label: 'Conversions' },
                      { key: 'revenue', label: 'Revenue' }
                    ].map((column) => (
                      <th
                        key={column.key}
                        onClick={() => handleSort(column.key)}
                        style={{ cursor: 'pointer' }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          {column.label}
                          {sortConfig.key === column.key && (
                            <span style={{ color: '#8b5cf6' }}>
                              {sortConfig.direction === 'asc' ? '↑' : '↓'}
                            </span>
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    // Loading skeleton
                    Array.from({ length: pageSize }).map((_, index) => (
                      <tr key={index}>
                        {Array.from({ length: 8 }).map((_, cellIndex) => (
                          <td key={cellIndex}>
                            <div style={{ 
                              height: '16px', 
                              background: darkMode ? '#64748b' : '#e2e8f0', 
                              borderRadius: '4px',
                              animation: 'pulse 1.5s ease-in-out infinite'
                            }}></div>
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    paginatedData.map((campaign) => (
                      <tr key={campaign.id}>
                        <td>
                          <div style={{ fontWeight: '500', color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                            {campaign.name}
                          </div>
                        </td>
                        <td style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                          {campaign.type}
                        </td>
                        <td>
                          <span className={`status-badge status-${campaign.status}`}>
                            {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                          </span>
                        </td>
                        <td style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                          {campaign.impressions.toLocaleString()}
                        </td>
                        <td style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                          {campaign.clicks.toLocaleString()}
                        </td>
                        <td style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                          {campaign.ctr}%
                        </td>
                        <td style={{ color: darkMode ? '#94a3b8' : '#64748b' }}>
                          {campaign.conversions}
                        </td>
                        <td style={{ fontWeight: '500', color: darkMode ? '#f1f5f9' : '#1e293b' }}>
                          ${campaign.revenue.toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div style={{ padding: '16px 24px', borderTop: `1px solid ${darkMode ? '#475569' : '#e2e8f0'}` }}>
              <div style={{ display: 'flex', flexDirection: window.innerWidth < 640 ? 'column' : 'row', alignItems: window.innerWidth < 640 ? 'flex-start' : 'center', justifyContent: 'space-between', gap: '16px' }}>
                <div style={{ fontSize: '14px', color: darkMode ? '#94a3b8' : '#64748b' }}>
                  Showing {Math.min((currentPage - 1) * pageSize + 1, filteredData.length)} to{' '}
                  {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} entries
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="btn-secondary"
                    style={{ padding: '8px 12px' }}
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    const pageNum = Math.max(1, Math.min(currentPage - 2 + i, totalPages - 4 + i));
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease',
                          background: currentPage === pageNum
                            ? '#8b5cf6'
                            : darkMode ? '#475569' : '#f1f5f9',
                          color: currentPage === pageNum
                            ? 'white'
                            : darkMode ? '#f1f5f9' : '#64748b'
                        }}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="btn-secondary"
                    style={{ padding: '8px 12px' }}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ADmyBRANDDashboard;