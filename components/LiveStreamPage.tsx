'use client'

import React, { useState } from 'react'
import { Mic, MicOff, Video, VideoOff, Users, MessageSquare, Gift, Settings } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface LiveStreamPageProps {
  isStreaming: boolean
  setIsStreaming: (streaming: boolean) => void
}

const LiveStreamPage = ({ isStreaming, setIsStreaming }: LiveStreamPageProps) => {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [viewerCount] = useState(1247)
  const [chatMessages] = useState([
    { user: 'UrbanKing23', message: 'This beat is fire! 🔥', timestamp: '2m ago' },
    { user: 'MusicLover', message: 'Can you play that again?', timestamp: '1m ago' },
    { user: 'BeatMaster', message: 'Following for more content!', timestamp: '30s ago' }
  ])

  const streamTags = ['Hip-Hop', 'Live Music', 'Freestyle', 'Urban Culture']

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 to-black p-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Main Stream Area */}
          <div className="lg:col-span-3">
            <div className="relative bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
              
              {/* Stream Video/Preview */}
              <div className="aspect-video bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center relative">
                {isStreaming ? (
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center mb-4 animate-pulse">
                      <Video className="w-16 h-16 text-white" />
                    </div>
                    <p className="text-white text-2xl font-bold">🔴 LIVE</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <Video className="w-20 h-20 text-gray-400 mb-4" />
                    <p className="text-gray-400 text-xl">Ready to go live?</p>
                  </div>
                )}
                
                {/* Live Indicator */}
                {isStreaming && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="destructive" size="lg">
                      🔴 LIVE
                    </Badge>
                  </div>
                )}
                
                {/* Viewer Count */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full">
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-white" />
                    <span className="text-white font-medium">{viewerCount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              {/* Stream Controls */}
              <div className="p-6 bg-gray-900/95 backdrop-blur">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Button
                      onClick={() => setIsMuted(!isMuted)}
                      variant={isMuted ? 'destructive' : 'secondary'}
                      size="lg"
                    >
                      {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                    </Button>
                    
                    <Button
                      onClick={() => setIsVideoOff(!isVideoOff)}
                      variant={isVideoOff ? 'destructive' : 'secondary'}
                      size="lg"
                    >
                      {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                    </Button>
                    
                    <Button variant="secondary" size="lg">
                      <Settings className="w-5 h-5" />
                    </Button>
                  </div>
                  
                  <Button
                    onClick={() => setIsStreaming(!isStreaming)}
                    variant="destructive"
                    size="lg"
                    className="px-8"
                  >
                    {isStreaming ? 'End Stream' : 'Go Live'}
                  </Button>
                </div>
                
                {/* Stream Info */}
                <div className="space-y-3">
                  <h2 className="text-xl font-bold text-white">
                    Late Night Freestyle Session 🎤
                  </h2>
                  
                  <div className="flex flex-wrap gap-2">
                    {streamTags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Chat & Engagement Panel */}
          <div className="space-y-6">
            
            {/* Live Chat */}
            <div className="bg-gray-900/90 rounded-2xl p-4 backdrop-blur border border-gray-700/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-white flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Live Chat
                </h3>
                <span className="text-sm text-gray-400">{chatMessages.length} messages</span>
              </div>
              
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {chatMessages.map((msg, index) => (
                  <div key={index} className="bg-gray-800/50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-indigo-400">{msg.user}</span>
                      <span className="text-xs text-gray-500">{msg.timestamp}</span>
                    </div>
                    <p className="text-white text-sm">{msg.message}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex space-x-2">
                <input 
                  type="text" 
                  placeholder="Type a message..."
                  className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <Button variant="primary">Send</Button>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="bg-gray-900/90 rounded-2xl p-4 backdrop-blur border border-gray-700/50">
              <h3 className="font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button variant="gift" size="lg" className="w-full">
                  <Gift className="w-5 h-5 mr-2" />
                  Send Gift
                </Button>
                <Button variant="secondary" size="lg" className="w-full">
                  <Users className="w-5 h-5 mr-2" />
                  Invite Friends
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveStreamPage