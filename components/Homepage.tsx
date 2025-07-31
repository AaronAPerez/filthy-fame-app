'use client';

import { Camera, Mic, Gift } from "lucide-react";
import Button from "./ui/Button";

import { useState } from "react";
import { Card } from "./ui/Card/Card";
// import PostCard from "./PostCard";




// Home Page with new components
const HomePage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [posts] = useState([
    {
      id: 1,
      user: "UrbanKing23",
      avatar: "👑",
      verified: true,
      content: "Just dropped my new mixtape! First 100 people to stream get exclusive behind-the-scenes content 🔥",
      video: true,
      likes: 15420,
      comments: 892,
      shares: 234,
      trending: true,
      timestamp: "2 hours ago",
      category: "music"
    },
    {
      id: 2,
      user: "StreetReporter",
      avatar: "📱",
      verified: false,
      content: "BREAKING: Exclusive interview with rising star about their Hollywood Unlocked feature! You heard it here first 👀",
      video: false,
      likes: 8934,
      comments: 456,
      shares: 189,
      trending: false,
      timestamp: "4 hours ago",
      category: "news"
    },
    {
      id: 3,
      user: "LiveWire",
      avatar: "⚡",
      verified: true,
      content: "Going live in 10 minutes! First 50 viewers get gift drops. Topic: Zeus Network vs Traditional Media 🎬",
      video: true,
      likes: 23156,
      comments: 1247,
      shares: 567,
      trending: true,
      timestamp: "6 hours ago",
      category: "live"
    }
  ]);

  return (
    <div className="p-8 bg-gradient-to-b from-gray-950/50 to-black/50">
      <div className="max-w-4xl mx-auto">
        {/* Create Post Section */}
        <Card className="p-8 mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 via-emerald-600/5 to-cyan-600/5"></div>
          
          <div className="flex items-center space-x-4 mb-6 relative z-10">
            <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
              Y
            </div>
            <input 
              type="text" 
              placeholder="What's happening in the culture? Share your story..."
              className="flex-1 bg-gray-800/80 border-2 border-gray-600/50 rounded-xl px-6 py-4 focus:outline-none focus:border-cyan-400 focus:bg-gray-800 transition-all placeholder-gray-400 backdrop-blur-sm"
            />
          </div>
          
          <div className="flex justify-between items-center relative z-10">
            <div className="flex space-x-6">
              <button className="flex items-center space-x-2 text-gray-400 hover:text-indigo-400 transition-all hover:scale-105 group">
                <div className="p-2 rounded-lg bg-gray-800/50 group-hover:bg-indigo-500/20 transition-colors">
                  <Camera className="w-5 h-5" />
                </div>
                <span className="font-medium">Video</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-400 hover:text-emerald-400 transition-all hover:scale-105 group">
                <div className="p-2 rounded-lg bg-gray-800/50 group-hover:bg-emerald-500/20 transition-colors">
                  <Mic className="w-5 h-5" />
                </div>
                <span className="font-medium">Audio</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-400 hover:text-yellow-400 transition-all hover:scale-105 group">
                <div className="p-2 rounded-lg bg-gray-800/50 group-hover:bg-yellow-500/20 transition-colors">
                  <Gift className="w-5 h-5" />
                </div>
                <span className="font-medium">Poll</span>
              </button>
            </div>
            <Button variant="primary" size="lg">
              Post
            </Button>
          </div>
        </Card>

        {/* Posts Feed */}
         <div className="space-y-8">
          {/* {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))} */}
        </div> 
      </div>
    </div>
  );
};


export default HomePage;