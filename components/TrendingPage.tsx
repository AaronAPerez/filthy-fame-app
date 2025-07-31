import { Play, Badge, Heart } from "lucide-react";
import React from "react";
import Button from "./ui/Button";
import { Card } from "./ui";

// Trending Page


// Trending Page
const TrendingPage = () => {
  return (
    <div className="p-8 bg-gradient-to-b from-gray-950/50 to-black/50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-transparent bg-gradient-to-r from-indigo-500 via-emerald-500 to-cyan-500 bg-clip-text mb-4">
            Trending Now
          </h1>
          <p className="text-gray-400 text-lg">What&aptos;s hot in the culture right now</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Card key={i}>
            {/* <Card key={i} hover={true} variant="elevated"> */}
              <div className="aspect-video bg-gradient-to-br from-indigo-900 via-blue-900 to-cyan-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-cyan-600/20 animate-pulse"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="w-16 h-16 text-white group-hover:scale-110 transition-transform" />
                </div>
                <div className="absolute top-4 left-4">
                  <Badge fontVariant="trending" size="md">
                    TRENDING #{i}
                  </Badge>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                  2.4M views
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-white mb-3 text-lg">Viral Content #{i}</h3>
                <p className="text-gray-400 leading-relaxed mb-4">This content is absolutely exploding across all platforms and dominating the culture...</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Heart className="w-4 h-4" />
                    <span>124K</span>
                  </div>
                  <Button variant="primary" size="sm">
                    Watch Now
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};


export default TrendingPage;