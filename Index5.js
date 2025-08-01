import React, { useState, useEffect } from 'react';
import { AlertTriangle, Users, TrendingUp, Shield, Clock, Eye, Target, Activity, DollarSign, Flag, Zap, Filter, Search, Download, RefreshCw, Settings, Bell } from 'lucide-react';

const Dashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedMarket, setSelectedMarket] = useState('all');
  const [alertFilter, setAlertFilter] = useState('all');

  // Enhanced mock data with color-coded flagging categories
  const flagCategories = {
    wicket: { name: '4,6, Wicket Bets', color: '#8B5CF6', count: 234 },
    matching: { name: 'Matching Bets', color: '#EF4444', count: 156 },
    snipping: { name: 'Snipping Bets', color: '#F59E0B', count: 89 },
    major: { name: 'Major Bets', color: '#10B981', count: 67 },
    groupBetting: { name: 'Group Betting', color: '#EC4899', count: 45 }
  };

  const overallStats = {
    totalUsers: 18547,
    totalBets: 124652,
    flaggedBets: 1891,
    suspiciousUsers: 127,
    groupBettingInstances: 34,
    avgBetSize: 1547.75,
    realTimeAlerts: 8
  };

  const marketStats = {
    matchOdds: { total: 52341, flagged: 789, percentage: 1.51 },
    sessions: { total: 34567, flagged: 456, percentage: 1.32 },
    bookmaker: { total: 23456, flagged: 234, percentage: 1.00 },
    tieEvents: { total: 8934, flagged: 123, percentage: 1.38 },
    completedMatch: { total: 4567, flagged: 67, percentage: 1.47 },
    lineSession: { total: 890, flagged: 22, percentage: 2.47 }
  };

  const suspiciousUsers = [
    {
      id: 'USR001',
      name: 'CricketKing_77',
      totalBets: 567,
      avgBetSize: 1245.50,
      flaggedBets: 89,
      flaggedAvgSize: 4780.25,
      suspicionRatio: 3.84,
      riskLevel: 'CRITICAL',
      lastActivity: '3 mins ago',
      flaggedCategories: ['wicket', 'major', 'groupBetting'],
      markets: { matchOdds: 234, sessions: 189, bookmaker: 144 },
      ipAddress: '192.168.1.100',
      deviceId: 'DEV_789456'
    },
    {
      id: 'USR002', 
      name: 'Mumbai_Bettor_92',
      totalBets: 789,
      avgBetSize: 1456.25,
      flaggedBets: 34,
      flaggedAvgSize: 2890.40,
      suspicionRatio: 1.98,
      riskLevel: 'HIGH',
      lastActivity: '12 mins ago',
      flaggedCategories: ['matching', 'snipping'],
      markets: { matchOdds: 345, sessions: 234, bookmaker: 210 },
      ipAddress: '192.168.1.100',
      deviceId: 'DEV_456123'
    },
    {
      id: 'USR003',
      name: 'Delhi_Pro_King',
      totalBets: 345,
      avgBetSize: 2890.80,
      flaggedBets: 123,
      flaggedAvgSize: 8967.25,
      suspicionRatio: 3.10,
      riskLevel: 'CRITICAL',
      lastActivity: '5 mins ago',
      flaggedCategories: ['wicket', 'major', 'matching', 'groupBetting'],
      markets: { matchOdds: 156, sessions: 98, bookmaker: 91 },
      ipAddress: '10.0.0.25',
      deviceId: 'DEV_789456'
    }
  ];

  const groupBettingAlerts = [
    {
      id: 'GRP001',
      users: ['CricketKing_77', 'Mumbai_Bettor_92', 'Chennai_Fan_55'],
      matchId: 'IND_vs_PAK_ODI_2025_001',
      market: 'Match Odds',
      betAmount: 7500,
      timeWindow: '6 seconds',
      detectionType: 'Same IP + Device',
      ipAddress: '192.168.1.100',
      deviceId: 'DEV_789456',
      timestamp: '2025-08-01 15:23:45',
      riskScore: 98,
      status: 'Active'
    },
    {
      id: 'GRP002',
      users: ['Delhi_Pro_King', 'KKR_Master_777', 'RCB_Fan_2025', 'CSK_Lover_99'],
      matchId: 'MI_vs_RCB_IPL_2025_089',
      market: 'Sessions',
      betAmount: 4500,
      timeWindow: '4 seconds',
      detectionType: 'Same Device ID',
      ipAddress: 'Multiple IPs',
      deviceId: 'DEV_456789',
      timestamp: '2025-08-01 15:18:12',
      riskScore: 92,
      status: 'Under Review'
    },
    {
      id: 'GRP003',
      users: ['Pune_Bettor_33', 'Hyderabad_King', 'Bangalore_Pro'],
      matchId: 'AUS_vs_ENG_TEST_2025_003',
      market: 'Line Session',
      betAmount: 6200,
      timeWindow: '8 seconds',
      detectionType: 'Same IP Address',
      ipAddress: '203.45.67.89',
      deviceId: 'Multiple Devices',
      timestamp: '2025-08-01 15:12:33',
      riskScore: 85,
      status: 'Flagged'
    }
  ];

  const realTimeAlerts = [
    { type: 'Group Betting', message: '3 users placed identical bets within 5 seconds', severity: 'critical', time: '2 mins ago' },
    { type: 'Major Bet', message: 'Single bet of ₹50,000 flagged for review', severity: 'high', time: '4 mins ago' },
    { type: 'Wicket Snipe', message: 'Suspicious wicket timing bet detected', severity: 'medium', time: '6 mins ago' },
    { type: 'IP Clustering', message: 'Multiple accounts from same IP detected', severity: 'high', time: '8 mins ago' }
  ];

  const timeSeriesData = [
    { time: '12:00', wicket: 45, matching: 23, snipping: 12, major: 8, groupBetting: 3 },
    { time: '13:00', wicket: 67, matching: 34, snipping: 18, major: 12, groupBetting: 5 },
    { time: '14:00', wicket: 89, matching: 45, snipping: 25, major: 18, groupBetting: 8 },
    { time: '15:00', wicket: 123, matching: 67, snipping: 34, major: 23, groupBetting: 12 },
    { time: '16:00', wicket: 98, matching: 56, snipping: 28, major: 15, groupBetting: 9 },
    { time: '17:00', wicket: 78, matching: 42, snipping: 21, major: 11, groupBetting: 6 }
  ];

  const StatCard = ({ title, value, icon: Icon, color, subtext, trend, alert }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 relative" style={{borderLeftColor: color}}>
      {alert && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-pulse">
          {alert}
        </div>
      )}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {subtext && <p className="text-sm text-gray-500 mt-1">{subtext}</p>}
        </div>
        <div className="p-3 rounded-full" style={{backgroundColor: color + '20'}}>
          <Icon className="h-8 w-8" style={{color: color}} />
        </div>
      </div>
      {trend && (
        <div className="mt-4 flex items-center">
          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
          <span className="text-sm text-green-600">{trend}% from yesterday</span>
        </div>
      )}
    </div>
  );

  const FlagCategoryCard = ({ category, data }) => (
    <div className="bg-white rounded-lg shadow-md p-4 border-l-4" style={{borderLeftColor: data.color}}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">{data.name}</h3>
          <p className="text-2xl font-bold mt-1" style={{color: data.color}}>{data.count}</p>
        </div>
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: data.color + '20'}}>
          <Flag className="h-6 w-6" style={{color: data.color}} />
        </div>
      </div>
    </div>
  );

  const UserProfileModal = ({ user, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-5xl w-full mx-4 max-h-[95vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Detailed Analysis: {user.name}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-3">Betting Activity</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Total Bets:</span> {user.totalBets}</p>
              <p><span className="font-medium">Match Odds:</span> {user.markets.matchOdds}</p>
              <p><span className="font-medium">Sessions:</span> {user.markets.sessions}</p>
              <p><span className="font-medium">Bookmaker:</span> {user.markets.bookmaker}</p>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-3">Financial Profile</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Avg Bet:</span> ₹{user.avgBetSize}</p>
              <p><span className="font-medium">Flagged Count:</span> {user.flaggedBets}</p>
              <p><span className="font-medium">Flagged Avg:</span> ₹{user.flaggedAvgSize}</p>
              <p><span className="font-medium">Ratio:</span> {user.suspicionRatio}x</p>
            </div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg">
            <h3 className="font-semibold text-red-900 mb-3">Risk Assessment</h3>
            <div className="space-y-2 text-sm">
              <p><span className="font-medium">Risk Level:</span> 
                <span className={`ml-2 px-2 py-1 rounded text-xs font-bold ${
                  user.riskLevel === 'CRITICAL' ? 'bg-red-200 text-red-800' :
                  user.riskLevel === 'HIGH' ? 'bg-orange-200 text-orange-800' :
                  'bg-yellow-200 text-yellow-800'
                }`}>
                  {user.riskLevel}
                </span>
              </p>
              <p><span className="font-medium">Last Activity:</span> {user.lastActivity}</p>
              <p><span className="font-medium">IP Address:</span> {user.ipAddress}</p>
              <p><span className="font-medium">Device ID:</span> {user.deviceId}</p>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-purple-900 mb-3">Flag Categories</h3>
            <div className="space-y-1">
              {user.flaggedCategories.map(cat => (
                <span key={cat} className="inline-block px-2 py-1 rounded text-xs font-medium mr-1 mb-1" 
                      style={{backgroundColor: flagCategories[cat].color + '20', color: flagCategories[cat].color}}>
                  {flagCategories[cat].name.split(' ')[0]}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-4">Detailed Fraud Analysis</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Suspicion Score</span>
                  <span className="text-sm font-bold">{Math.round(user.suspicionRatio * 25)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full ${user.suspicionRatio > 2 ? 'bg-red-500' : user.suspicionRatio > 1.5 ? 'bg-orange-500' : 'bg-green-500'}`}
                    style={{width: `${Math.min(user.suspicionRatio * 25, 100)}%`}}
                  ></div>
                </div>
              </div>
              
              <div className="text-sm text-gray-600">
                <p className="font-medium mb-2">Risk Indicators:</p>
                <ul className="space-y-1">
                  <li>• Flagged bets are {user.suspicionRatio}x larger than average</li>
                  <li>• Multiple flag categories detected</li>
                  <li>• Recent suspicious activity patterns</li>
                  <li>• Potential group betting involvement</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-4">Recommended Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-medium">
                Immediate Investigation
              </button>
              <button className="w-full bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 font-medium">
                Enhanced Monitoring
              </button>
              <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium">
                Generate Report
              </button>
              <button className="w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 font-medium">
                Flag Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Enhanced Header with Real-time Alerts */}
      <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 rounded-xl shadow-lg p-8 mb-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Advanced Cricket Betting Surveillance</h1>
            <p className="text-blue-200">Multi-category fraud detection with real-time group betting analysis</p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Bell className="h-8 w-8 text-yellow-300 animate-pulse mr-2" />
                <span className="text-3xl font-bold">{overallStats.realTimeAlerts}</span>
              </div>
              <p className="text-blue-200">Live Alerts</p>
            </div>
            <Shield className="h-20 w-20 text-blue-300" />
          </div>
        </div>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-500" />
              <select 
                value={selectedTimeframe} 
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2"
              >
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-gray-500" />
              <select 
                value={selectedMarket} 
                onChange={(e) => setSelectedMarket(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2"
              >
                <option value="all">All Markets</option>
                <option value="matchOdds">Match Odds</option>
                <option value="sessions">Sessions</option>
                <option value="bookmaker">Bookmaker</option>
                <option value="tieEvents">Tie Events</option>
                <option value="lineSession">Line Session</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <select 
                value={alertFilter} 
                onChange={(e) => setAlertFilter(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2"
              >
                <option value="all">All Alerts</option>
                <option value="critical">Critical Only</option>
                <option value="groupBetting">Group Betting</option>
                <option value="major">Major Bets</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center">
              <Download className="h-4 w-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Users"
          value={overallStats.totalUsers.toLocaleString()}
          icon={Users}
          color="#3B82F6"
          subtext="Active monitored users"
          trend="+15"
        />
        <StatCard
          title="Total Bets (All Markets)"
          value={overallStats.totalBets.toLocaleString()}
          icon={Target}
          color="#10B981"
          subtext="Cross-market detection"
          trend="+12"
        />
        <StatCard
          title="Flagged Bets"
          value={overallStats.flaggedBets.toLocaleString()}
          icon={Flag}
          color="#F59E0B"
          subtext={`${((overallStats.flaggedBets/overallStats.totalBets)*100).toFixed(1)}% flag rate`}
          trend="+28"
        />
        <StatCard
          title="Group Betting Alerts"
          value={overallStats.groupBettingInstances}
          icon={AlertTriangle}
          color="#EF4444"
          subtext="Multi-user coordination"
          trend="+67"
          alert={overallStats.realTimeAlerts}
        />
      </div>

      {/* Flag Categories Dashboard */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Flag className="h-6 w-6 mr-2 text-purple-500" />
          Color-Coded Flag Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {Object.entries(flagCategories).map(([key, data]) => (
            <FlagCategoryCard key={key} category={key} data={data} />
          ))}
        </div>
      </div>

      {/* Market-wise Analysis */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Activity className="h-6 w-6 mr-2 text-blue-500" />
          Market-wise Surveillance Data
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {Object.entries(marketStats).map(([market, stats]) => (
            <div key={market} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 capitalize mb-2">
                {market.replace(/([A-Z])/g, ' $1').trim()}
              </h3>
              <p className="text-2xl font-bold text-blue-600">{stats.total.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Total Bets</p>
              <p className="text-lg font-semibold text-red-600 mt-2">{stats.flagged}</p>
              <p className="text-xs text-gray-500">Flagged ({stats.percentage}%)</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Enhanced Suspicious Users Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <Eye className="h-6 w-6 mr-2 text-red-500" />
              High-Risk User Analysis
            </h2>
            <div className="flex items-center space-x-2">
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                {suspiciousUsers.length} Critical Users
              </span>
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">User Details</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Betting Stats</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Flag Categories</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Risk Score</th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {suspiciousUsers.map((user, idx) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-2">
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.id}</p>
                        <p className="text-xs text-gray-400">IP: {user.ipAddress}</p>
                        <p className="text-xs text-gray-400">Device: {user.deviceId.slice(-6)}</p>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-sm">
                        <p><span className="font-medium">Bets:</span> {user.totalBets}</p>
                        <p><span className="font-medium">Avg:</span> ₹{user.avgBetSize}</p>
                        <p className="text-red-600"><span className="font-medium">Flagged:</span> ₹{user.flaggedAvgSize}</p>
                        <p className="font-bold">Ratio: {user.suspicionRatio}x</p>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex flex-wrap gap-1">
                        {user.flaggedCategories.slice(0, 3).map(cat => (
                          <span key={cat} className="px-2 py-1 rounded text-xs font-medium"
                                style={{backgroundColor: flagCategories[cat].color + '20', color: flagCategories[cat].color}}>
                            {flagCategories[cat].name.split(' ')[0]}
                          </span>
                        ))}
                        {user.flaggedCategories.length > 3 && (
                          <span className="px-2 py-1 rounded text-xs bg-gray-200 text-gray-600">
                            +{user.flaggedCategories.length - 3}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="text-center">
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          user.riskLevel === 'CRITICAL' ? 'bg-red-200 text-red-800' :
                          user.riskLevel === 'HIGH' ? 'bg-orange-200 text-orange-800' :
                          'bg-yellow-200 text-yellow-800'
                        }`}>
                          {user.riskLevel}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{user.lastActivity}</p>
                      </div>
                    </td>
                    <td className="py-4 px-2">
                      <div className="flex flex-col space-y-1">
                        <button 
                          onClick={() => setSelectedUser(user)}
                          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
                        >
                          Deep Analysis
                        </button>
                        <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                          Flag User
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Enhanced Real-time Alerts */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Bell className="h-5 w-5 mr-2 text-red-500 animate-pulse" />
              Live Alerts
            </h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {realTimeAlerts.map((alert, idx) => (
                <div key={idx} className={`p-3 rounded-lg border-l-4 ${
                  alert.severity === 'critical' ? 'bg-red-50 border-red-500' :
                  alert.severity === 'high' ? 'bg-orange-50 border-orange-500' :
                  'bg-yellow-50 border-yellow-500'
                }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-sm">{alert.type}</p>
                      <p className="text-xs text-gray-600 mt-1">{alert.message}</p>
                    </div>
                    <span className="text-xs text-gray-500">{alert.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-yellow-500" />
              Detection Statistics
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Detection Accuracy</span>
                <span className="font-bold text-green-600">97.2%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">False Positive Rate</span>
                <span className="font-bold text-orange-600">2.8%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Avg Response Time</span>
                <span className="font-bold text-blue-600">3.4s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Groups Detected/Day</span>
                <span className="font-bold text-purple-600">47</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Group Betting Detection */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <Users className="h-6 w-6 mr-2 text-purple-500" />
            Advanced Group Betting Detection
          </h2>
          <div className="flex items-center space-x-4">
            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
              {groupBettingAlerts.length} Active Groups
            </span>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
              Multi-Market Detection
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {groupBettingAlerts.map(alert => (
            <div key={alert.id} className="border-2 border-red-200 rounded-lg p-6 bg-gradient-to-br from-red-50 to-orange-50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-red-900">Group #{alert.id}</h3>
                <div className="flex items-center space-x-2">
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                    {alert.riskScore}% Risk
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    alert.status === 'Active' ? 'bg-red-200 text-red-800' :
                    alert.status === 'Under Review' ? 'bg-orange-200 text-orange-800' :
                    'bg-yellow-200 text-yellow-800'
                  }`}>
                    {alert.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-medium text-gray-700 mb-1">Coordinated Users:</p>
                  <div className="flex flex-wrap gap-1">
                    {alert.users.map(user => (
                      <span key={user} className="bg-white px-2 py-1 rounded text-xs border">
                        {user}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p><span className="font-medium">Match:</span> {alert.matchId}</p>
                    <p><span className="font-medium">Market:</span> {alert.market}</p>
                    <p><span className="font-medium">Amount:</span> ₹{alert.betAmount}</p>
                  </div>
                  <div>
                    <p><span className="font-medium">Time Gap:</span> {alert.timeWindow}</p>
                    <p><span className="font-medium">Detection:</span> {alert.detectionType}</p>
                    <p><span className="font-medium">When:</span> {alert.timestamp.split(' ')[1]}</p>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-medium text-gray-700 mb-1">Technical Details:</p>
                  <p className="text-xs"><span className="font-medium">IP:</span> {alert.ipAddress}</p>
                  <p className="text-xs"><span className="font-medium">Device:</span> {alert.deviceId}</p>
                </div>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 font-medium">
                  Investigate Now
                </button>
                <button className="flex-1 bg-orange-600 text-white px-3 py-2 rounded text-sm hover:bg-orange-700 font-medium">
                  Flag All Users
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Time-Based Analysis */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Clock className="h-6 w-6 mr-2 text-green-500" />
          Multi-Category Timeline Analysis
        </h2>
        
        <div className="mb-4 flex justify-center space-x-6">
          {Object.entries(flagCategories).map(([key, data]) => (
            <div key={key} className="flex items-center text-sm">
              <div className="w-4 h-4 rounded mr-2" style={{backgroundColor: data.color}}></div>
              <span>{data.name.split(' ')[0]}</span>
            </div>
          ))}
        </div>
        
        <div className="h-80 flex items-end justify-between space-x-2 px-4">
          {timeSeriesData.map((data, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center max-w-16">
              <div className="w-full space-y-0.5 flex flex-col-reverse">
                <div 
                  className="rounded-b" 
                  style={{
                    backgroundColor: flagCategories.wicket.color,
                    height: `${(data.wicket / 150) * 250}px`
                  }}
                  title={`Wicket Bets: ${data.wicket}`}
                ></div>
                <div 
                  style={{
                    backgroundColor: flagCategories.matching.color,
                    height: `${(data.matching / 150) * 250}px`
                  }}
                  title={`Matching Bets: ${data.matching}`}
                ></div>
                <div 
                  style={{
                    backgroundColor: flagCategories.snipping.color,
                    height: `${(data.snipping / 150) * 250}px`
                  }}
                  title={`Snipping Bets: ${data.snipping}`}
                ></div>
                <div 
                  style={{
                    backgroundColor: flagCategories.major.color,
                    height: `${(data.major / 150) * 250}px`
                  }}
                  title={`Major Bets: ${data.major}`}
                ></div>
                <div 
                  className="rounded-t"
                  style={{
                    backgroundColor: flagCategories.groupBetting.color,
                    height: `${(data.groupBetting / 150) * 250}px`
                  }}
                  title={`Group Betting: ${data.groupBetting}`}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-2 font-medium">{data.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* User Profile Modal */}
      {selectedUser && (
        <UserProfileModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default Dashboard;