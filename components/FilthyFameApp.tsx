'use client'

import React, { useState } from 'react';
import { Users, Video, Search, Bell, User, Home, TrendingUp, DollarSign } from 'lucide-react';
import HomePage from '@/components/Homepage';
// import ProfilePage from '@/components/ProfilePage.tsx';
import TrendingPage from '@/components/TrendingPage';
import NetworkingPage from '@/components/NetworkPage';
import LiveStreamPage from './LiveStreamPage';
import ProfilePage from './ProfilePage.tsx';

// Main App Component with Indigo/Green Color Scheme
const FilthyFameApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [isLiveStreaming, setIsLiveStreaming] = useState(false);
  const [userCoins] = useState(2500);
  const [notifications] = useState(3);

  const renderContent = () => {
    switch(currentView) {
      case 'home':
        return <HomePage />;
      case 'trending':
        return <TrendingPage />;
      case 'live':
        return <LiveStreamPage isStreaming={isLiveStreaming} setIsStreaming={setIsLiveStreaming} />;
      case 'network':
        return <NetworkingPage />;
      case 'profile':
        return <ProfilePage user={undefined} />;
      default:
        return <HomePage />;
    }
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-black text-white">
      {/* Header with Indigo/Green/Cyan gradient */}
      <header className="fixed top-0 w-full z-50 bg-gradient-to-r from-indigo-600 via-emerald-600 to-cyan-500 border-b border-white/10 backdrop-blur-xl shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <h1 className="text-3xl font-black bg-gradient-to-r from-white via-black to-gray-600 bg-clip-text text-transparent tracking-tight">
                FILTHY FAME
              </h1>
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 to-cyan-500 rounded-lg blur opacity-30 animate-pulse"></div>
            </div>
            <span className="text-xs bg-gradient-to-r from-emerald-400 to-cyan-400 px-3 py-1.5 rounded-full text-white font-bold shadow-lg animate-shimmer">
              ZEUS SISTER CO.
            </span>
          </div>
          
          <div className="flex-1 max-w-md mx-8">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5 group-focus-within:text-cyan-400 transition-colors" />
              <input 
                type="text" 
                placeholder="Search creators, trending content..."
                className="w-full bg-black/40 border-2 border-white/20 rounded-2xl py-3 pl-12 pr-4 focus:outline-none focus:border-cyan-400 focus:bg-black/60 transition-all placeholder-gray-400 backdrop-blur-sm"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity -z-10"></div>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            {/* Coin Counter with new gradient */}
            <div className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 via-emerald-500 to-green-500 px-4 py-2 rounded-full shadow-lg hover:shadow-emerald-500/25 transition-shadow">
              <DollarSign className="w-5 h-5 text-black" />
              <span className="font-black text-black">{userCoins.toLocaleString()}</span>
              <span className="text-xs font-bold text-black/80">COINS</span>
            </div>
            
            {/* Notification Bell with indigo gradient */}
            <button className="relative p-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 transition-all group">
              <Bell className="w-6 h-6 text-white" />
              {notifications > 0 && (
                <>
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold animate-bounce">
                    {notifications}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full animate-ping opacity-75"></div>
                </>
              )}
            </button>

            {/* Live Stream Button */}
            <button 
              onClick={() => setIsLiveStreaming(!isLiveStreaming)}
              className={`px-6 py-3 rounded-2xl font-bold transition-all shadow-lg ${
                isLiveStreaming 
                  ? 'bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 animate-pulse shadow-red-500/50' 
                  : 'bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 hover:from-indigo-700 hover:via-blue-700 hover:to-cyan-600 shadow-indigo-500/25'
              }`}
            >
              {isLiveStreaming ? '🔴 LIVE NOW' : '📹 GO LIVE'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="pt-20 flex">
        {/* Sidebar Navigation */}
        <nav className="fixed left-0 top-20 h-screen w-72 bg-gradient-to-b from-gray-950/95 to-black/95 border-r border-gray-800/50 backdrop-blur-xl p-6">
          <ul className="space-y-3">
            {[
              { id: 'home', icon: Home, label: 'Home Feed', gradient: 'from-indigo-500 to-blue-500' },
              { id: 'trending', icon: TrendingUp, label: 'Trending', gradient: 'from-emerald-500 to-green-500' },
              { id: 'live', icon: Video, label: 'Live Streams', gradient: 'from-blue-500 to-cyan-500' },
              { id: 'network', icon: Users, label: 'Network', gradient: 'from-green-500 to-emerald-500' },
              { id: 'profile', icon: User, label: 'Profile', gradient: 'from-indigo-500 to-emerald-500' }
            ].map(({ id, icon: Icon, label, gradient }) => (
              <li key={id}>
                <button
                  onClick={() => setCurrentView(id)}
                  className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl transition-all group relative overflow-hidden ${
                    currentView === id 
                      ? `bg-gradient-to-r ${gradient} text-white shadow-lg` 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {currentView === id && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-20 animate-pulse`}></div>
                  )}
                  <Icon className="w-6 h-6 relative z-10" />
                  <span className="font-semibold relative z-10">{label}</span>
                  {currentView === id && (
                    <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-ping"></div>
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Stats Card with new gradient scheme */}
          <div className="mt-8 p-6 bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl border border-gray-700/50 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-emerald-600/10 to-cyan-600/10"></div>
            <h3 className="font-bold text-lg mb-4 text-white relative z-10">Your Impact</h3>
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Followers</span>
                <span className="text-transparent bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text font-bold text-lg">12.4K</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Weekly Views</span>
                <span className="text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text font-bold text-lg">847K</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Gifts Received</span>
                <span className="text-transparent bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text font-bold text-lg">2,341</span>
              </div>
            </div>
            
            {/* Progress bars with new gradients */}
            <div className="mt-4 space-y-2">
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"></div>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full w-2/3 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="mt-6 space-y-3">
            <button className="w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 px-4 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-emerald-500/25">
              💰 Buy Coins
            </button>
            <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 px-4 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-indigo-500/25">
              ⭐ Go Premium
            </button>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="ml-72 flex-1 min-h-screen">
          {renderContent()}
        </main>
      </div>

      {/* Custom CSS for animations with new colors */}
       <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .animate-shimmer {
          background: linear-gradient(90deg, #10b981, #4f46e5, #06b6d4, #059669);
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style> 
    </div>
  );
};


export default FilthyFameApp;