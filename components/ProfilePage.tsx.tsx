import React from "react";
import Button from "./ui/Button";
import Card from "./ui/Card";



// Profile Page
const ProfilePage = ({ user }) => (
  <div className="p-4">
    <div className="max-w-4xl mx-auto">
      <div className="bg-gray-900/90 border border-gray-700/50 rounded-2xl p-8 backdrop-blur">
        <div className="flex items-center space-x-6 mb-6">
          <div className="w-20 h-20 bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full flex items-center justify-center text-2xl">
            {user?.avatar || '👤'}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">{user?.displayName || 'Your Profile'}</h1>
            <p className="text-gray-400">@{user?.username || 'username'}</p>
            <div className="flex items-center space-x-6 mt-2 text-sm">
              <span className="text-transparent bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text font-bold">1.2K Followers</span>
              <span className="text-transparent bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text font-bold">842 Following</span>
            </div>
          </div>
          <button className="bg-gradient-to-r from-indigo-500 to-emerald-500 hover:from-indigo-600 hover:to-emerald-600 px-6 py-3 rounded-xl font-bold transition-all">
            Edit Profile
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
            <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text">156</div>
            <div className="text-gray-400">Total Posts</div>
          </div>
          <div className="text-center p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
            <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text">{user?.coins || 0}</div>
            <div className="text-gray-400">Coins</div>
          </div>
          <div className="text-center p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
            <div className="text-2xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">89%</div>
            <div className="text-gray-400">Engagement</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default ProfilePage;