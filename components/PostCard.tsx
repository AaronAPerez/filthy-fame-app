// 'use client'

// import { Crown, Settings, Play, Heart, MessageCircle, Share, Gift } from 'lucide-react';
// import React, { useState } from 'react'


// // Post Card Component
// const PostCard = ({ post }) => {
// // const PostCard = ({ post }) => {
//   const [isLiked, setIsLiked] = useState(false);
//   const [showComments, setShowComments] = useState(false);

//   return (
//     <div className="bg-gray-900/50 border border-gray-700 rounded-xl backdrop-blur-lg overflow-hidden">
//       {/* Post Header */}
//       <div className="p-4 pb-4">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center space-x-3">
//             <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-red-500 rounded-full flex items-center justify-center">
//               {post.avatar}
//             </div>
//             <div>
//               <div className="flex items-center space-x-2">
//                 <h3 className="font-bold text-white">{post.user}</h3>
//                 {post.trending && <Crown className="w-4 h-4 text-yellow-500" />}
//               </div>
//               <p className="text-sm text-gray-400">{post.timestamp}</p>
//             </div>
//           </div>
//           <button className="text-gray-400 hover:text-white transition-colors">
//             <Settings className="w-5 h-5" />
//           </button>
//         </div>

//         <p className="text-white mb-4">{post.content}</p>

//         {/* Video Player (if video post) */}
//         {post.video && (
//           <div className="relative bg-black rounded-lg overflow-hidden mb-4">
//             <div className="aspect-video bg-gradient-to-r from-purple-900 to-red-900 flex items-center justify-center">
//               <button className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm">
//                 <Play className="w-8 h-8 text-white ml-1" />
//               </button>
//             </div>
//             <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
//               HD
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Post Actions */}
//       <div className="px-6 pb-4">
//         <div className="flex items-center justify-between border-t border-gray-700 pt-4">
//           <div className="flex items-center space-x-6">
//             <button 
//               onClick={() => setIsLiked(!isLiked)}
//               className={`flex items-center space-x-2 transition-colors ${
//                 isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
//               }`}
//             >
//               <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
//               <span className="font-semibold">{post.likes.toLocaleString()}</span>
//             </button>

//             <button 
//               onClick={() => setShowComments(!showComments)}
//               className="flex items-center space-x-2 text-gray-400 hover:text-blue-500 transition-colors"
//             >
//               <MessageCircle className="w-5 h-5" />
//               <span className="font-semibold">{post.comments.toLocaleString()}</span>
//             </button>

//             <button className="flex items-center space-x-2 text-gray-400 hover:text-green-500 transition-colors">
//               <Share className="w-5 h-5" />
//               <span className="font-semibold">{post.shares.toLocaleString()}</span>
//             </button>
//           </div>

//           <button className="flex items-center space-x-2 bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all">
//             <Gift className="w-4 h-4" />
//             <span className="font-bold text-sm">Send Gift</span>
//           </button>
//         </div>

//         {/* Comments Section */}
//         {showComments && (
//           <div className="mt-4 space-y-3 border-t border-gray-700 pt-4">
//             <div className="flex space-x-3">
//               <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-sm">
//                 M
//               </div>
//               <div className="flex-1">
//                 <div className="bg-gray-800 rounded-lg p-3">
//                   <p className="text-sm text-white">This is fire! 🔥 When&aptos;s the next drop?</p>
//                 </div>
//                 <div className="flex items-center space-x-4 mt-1 text-xs text-gray-400">
//                   <span>2h</span>
//                   <button className="hover:text-white transition-colors">Reply</button>
//                   <button className="hover:text-red-500 transition-colors">Like</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PostCard