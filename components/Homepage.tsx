'use client';

import { Camera, Mic, Gift } from "lucide-react";
import Button from "./ui/Button";
import Card from "./ui/Card";
import { useState } from "react";
import PostCard from "./PostCard";

// Updated Post interface to match PostCard expectations
interface Post {
  id: string
  user_id: string
  content: string
  media_url: string | null
  media_type: string | null
  category: string
  likes_count: number
  comments_count: number
  shares_count: number
  is_trending: boolean
  created_at: string
  profiles: {
    id: string
    username: string | null
    display_name: string | null
    avatar_url: string | null
    verified: boolean
  }
}

// Home Page with updated post structure
const HomePage = () => {
  const [posts] = useState<Post[]>([
    {
      id: "1",
      user_id: "user_1",
      content: "Just dropped my new mixtape! First 100 people to stream get exclusive behind-the-scenes content 🔥",
      media_url: null,
      media_type: null,
      category: "music",
      likes_count: 15420,
      comments_count: 892,
      shares_count: 234,
      is_trending: true,
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      profiles: {
        id: "user_1",
        username: "urbinking23",
        display_name: "UrbanKing23",
        avatar_url: null,
        verified: true
      }
    },
    {
      id: "2",
      user_id: "user_2",
      content: "BREAKING: Exclusive interview with rising star about their Hollywood Unlocked feature! You heard it here first 👀",
      media_url: null,
      media_type: null,
      category: "news",
      likes_count: 8934,
      comments_count: 456,
      shares_count: 189,
      is_trending: false,
      created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
      profiles: {
        id: "user_2",
        username: "streetreporter",
        display_name: "StreetReporter",
        avatar_url: null,
        verified: false
      }
    },
    {
      id: "3",
      user_id: "user_3",
      content: "Going live in 10 minutes! First 50 viewers get gift drops. Topic: Zeus Network vs Traditional Media 🎬",
      media_url: null,
      media_type: "video",
      category: "live",
      likes_count: 23156,
      comments_count: 1247,
      shares_count: 567,
      is_trending: true,
      created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
      profiles: {
        id: "user_3",
        username: "livewire",
        display_name: "LiveWire",
        avatar_url: null,
        verified: true
      }
    }
  ]);

  return (
    <div className="p-8 bg-gradient-to-b from-gray-950/50 to-black/50">
    {/* <div className="p-8 bg-gradient-to-b from-gray-950/50 to-black/50"> */}
      <div className="max-w-4xl mx-auto">
        {/* Create Post Section */}
        <Card variant="glass" className="p-8 mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/5 via-emerald-600/5 to-cyan-600/5"></div>
          
          <div className="flex items-center space-x-4 mb-6 relative z-10">
            <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
              Y
            </div>
            <input 
              type="text" 
              placeholder="What's happening in the culture?"
              className="flex-1 bg-black/30 border-2 border-white/20 rounded-2xl py-4 px-6 text-white placeholder-gray-300 focus:outline-none focus:border-cyan-400 focus:bg-black/50 transition-all backdrop-blur-sm"
            />
          </div>
          
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300">
                <Camera className="w-5 h-5" />
                <span>Photo/Video</span>
              </Button>
              
              <Button variant="ghost" className="flex items-center space-x-2 text-emerald-400 hover:text-emerald-300">
                <Mic className="w-5 h-5" />
                <span>Audio</span>
              </Button>
              
              <Button variant="ghost" className="flex items-center space-x-2 text-yellow-400 hover:text-yellow-300">
                <Gift className="w-5 h-5" />
                <span>Poll</span>
              </Button>
            </div>
            
            <Button variant="primary" className="px-8 py-3 font-bold">
              Post
            </Button>
          </div>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;