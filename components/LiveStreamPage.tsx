// 'use client'

// import { Video, Badge, MicOff, Mic, VideoOff, Users, Gift } from "lucide-react";
// import { useState } from "react";
// import Button from "./ui/Button";
// import Card from "./ui/Card";


// // Live Streaming Page with new color scheme
// const LiveStreamPage = ({ isStreaming, setIsStreaming }) => {
//   const [isMuted, setIsMuted] = useState(false);
//   const [isVideoOff, setIsVideoOff] = useState(false);
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [viewerCount, setViewerCount] = useState(1247);
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [giftCount, setGiftCount] = useState(89);

//   return (
//     <div className="p-8 bg-gradient-to-b from-gray-950/50 to-black/50">
//       <div className="max-w-7xl mx-auto">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Main Stream Area */}
//           <div className="lg:col-span-2">
//             <Card variant="elevated">
//               {/* Stream Video */}
//               <div className="relative aspect-video bg-gradient-to-br from-indigo-900 via-blue-900 to-cyan-900">
//                 {isStreaming ? (
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="text-center relative z-10">
//                       <div className="w-32 h-32 bg-gradient-to-r from-white/20 to-white/10 rounded-full flex items-center justify-center mb-6 mx-auto backdrop-blur-lg shadow-2xl border border-white/20">
//                         <Video className="w-16 h-16 text-white" />
//                       </div>
//                       <p className="text-white text-2xl font-bold mb-2">You&aptoz;re Live!</p>
//                       <p className="text-gray-300 text-lg">{viewerCount.toLocaleString()} viewers watching</p>
//                     </div>
//                     <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-cyan-600/10 animate-pulse"></div>
//                   </div>
//                 ) : (
//                   <div className="absolute inset-0 flex items-center justify-center">
//                     <Button 
//                       variant="primary"
//                       size="xl"
//                       onClick={() => setIsStreaming(true)}
//                     >
//                       Start Live Stream
//                     </Button>
//                   </div>
//                 )}

//                 {/* Live Indicator */}
//                 {isStreaming && (
//                   <div className="absolute top-6 left-6">
//                     <Badge variant="live" size="lg">
//                       🔴 LIVE
//                     </Badge>
//                   </div>
//                 )}

//                 {/* Gift Animations */}
//                 {isStreaming && (
//                   <div className="absolute top-6 right-6 space-y-3">
//                     <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-bounce shadow-lg">
//                       🎁 +50 Coins
//                     </div>
//                     <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-bounce shadow-lg">
//                       👑 VIP Gift!
//                     </div>
//                   </div>
//                 )}
//               </div>

//               {/* Stream Controls */}
//               {isStreaming && (
//                 <div className="p-6 bg-gray-900/90 flex items-center justify-between backdrop-blur-xl">
//                   <div className="flex items-center space-x-6">
//                     <Button
//                       variant={isMuted ? 'danger' : 'secondary'}
//                       size="md"
//                       onClick={() => setIsMuted(!isMuted)}
//                     >
//                       {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
//                     </Button>

//                     <Button
//                       variant={isVideoOff ? 'danger' : 'secondary'}
//                       size="md"
//                       onClick={() => setIsVideoOff(!isVideoOff)}
//                     >
//                       {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
//                     </Button>

//                     <div className="flex items-center space-x-3 text-gray-300 bg-gray-800/50 px-4 py-2 rounded-xl">
//                       <Users className="w-5 h-5 text-blue-400" />
//                       <span className="font-bold text-lg">{viewerCount.toLocaleString()}</span>
//                     </div>

//                     <div className="flex items-center space-x-3 text-emerald-400 bg-gray-800/50 px-4 py-2 rounded-xl">
//                       <Gift className="w-5 h-5" />
//                       <span className="font-bold text-lg">{giftCount}</span>
//                     </div>
//                   </div>

//                   <Button 
//                     variant="danger"
//                     size="lg"
//                     onClick={() => setIsStreaming(false)}
//                   >
//                     End Stream
//                   </Button>
//                 </div>
//               )}
//             </Card>

//             {/* Stream Description */}
//             <Card variant="glass" className="mt-6 p-8">
//               <h2 className="text-2xl font-bold text-white mb-4">Live Culture Discussion</h2>
//               <p className="text-gray-300 mb-6 text-lg leading-relaxed">
//                 Real talk about the latest in hip-hop culture, industry news, and exclusive behind-the-scenes content. 
//                 Join the conversation and support with gifts!
//               </p>
//               <div className="flex flex-wrap gap-3">
//                 {['#HipHop', '#Live', '#Culture', '#Exclusive', '#RealTalk'].map(tag => (
//                   <Badge key={tag} variant="primary" size="md">
//                     {tag}
//                   </Badge>
//                 ))}
//               </div>
//             </Card>
//           </div>

//           {/* Chat & Gifts Sidebar */}
//           <div className="space-y-6">
//             {/* Live Chat */}
//             <Card variant="elevated">
//               <div className="p-6 border-b border-gray-700/50 bg-gradient-to-r from-indigo-600/10 to-cyan-600/10">
//                 <h3 className="font-bold text-white text-lg">Live Chat</h3>
//               </div>
//               <div className="h-80 overflow-y-auto p-6 space-y-4">
//                 {[
//                   { user: "FanBoy123", message: "This is absolutely amazing! 🔥", timestamp: "now", gradient: "from-indigo-400 to-blue-400" },
//                   { user: "CultureKing", message: "Send more gifts y'all! Support the culture 💯", timestamp: "1m", gradient: "from-emerald-400 to-green-400" },
//                   { user: "StreetWise", message: "Facts being dropped left and right 💯", timestamp: "2m", gradient: "from-blue-400 to-cyan-400" },
//                   { user: "RealTalk", message: "Best stream I've watched today! Keep it going 🙌", timestamp: "3m", gradient: "from-green-400 to-emerald-400" }
//                 ].map((chat, idx) => (
//                   <div key={idx} className="text-sm">
//                     <div className="flex items-center space-x-2 mb-1">
//                       <span className={`font-bold text-transparent bg-gradient-to-r ${chat.gradient} bg-clip-text`}>{chat.user}</span>
//                       <span className="text-xs text-gray-500">{chat.timestamp}</span>
//                     </div>
//                     <p className="text-white leading-relaxed">{chat.message}</p>
//                   </div>
//                 ))}
//               </div>
//               <div className="p-6 border-t border-gray-700/50">
//                 <div className="flex space-x-3">
//                   <input 
//                     type="text" 
//                     placeholder="Join the conversation..."
//                     className="flex-1 bg-gray-800/80 border border-gray-600 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
//                   />
//                   <Button variant="primary" size="md">
//                     Send
//                   </Button>
//                 </div>
//               </div>
//             </Card>

//             {/* Gift Panel */}
//             <Card variant="elevated">
//               <div className="p-6 border-b border-gray-700/50 bg-gradient-to-r from-emerald-600/10 to-green-600/10">
//                 <h3 className="font-bold text-white text-lg">Send Gifts</h3>
//               </div>
//               <div className="p-6">
//                 <div className="grid grid-cols-3 gap-4">
//                   {[
//                     { emoji: "🌹", name: "Rose", cost: 10, gradient: "from-indigo-500 to-blue-500" },
//                     { emoji: "💎", name: "Diamond", cost: 50, gradient: "from-blue-500 to-cyan-500" },
//                     { emoji: "🚗", name: "Car", cost: 100, gradient: "from-emerald-500 to-green-500" },
//                     { emoji: "👑", name: "Crown", cost: 250, gradient: "from-yellow-500 to-orange-500" },
//                     { emoji: "🏰", name: "Castle", cost: 500, gradient: "from-indigo-500 to-emerald-500" },
//                     { emoji: "🚀", name: "Rocket", cost: 1000, gradient: "from-red-500 to-orange-500" }
//                   ].map(gift => (
//                     <button 
//                       key={gift.name}
//                       className={`bg-gradient-to-br from-gray-800 to-gray-900 hover:bg-gradient-to-br hover:${gift.gradient} border border-gray-600 hover:border-transparent rounded-xl p-4 text-center transition-all hover:scale-105 shadow-lg group`}
//                     >
//                       <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{gift.emoji}</div>
//                       <div className="text-sm text-gray-300 group-hover:text-white font-medium">{gift.name}</div>
//                       <div className="text-sm text-yellow-400 font-bold">{gift.cost}</div>
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             </Card>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LiveStreamPage;