'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'


interface Gift {
  id: string
  name: string
  emoji: string
  cost: number
  rarity: string
}

interface GiftPanelProps {
  postId: string
  receiverId: string
  senderId: string
  userCoins: number
  onGiftSent: () => void
}

export default function GiftPanel({ 
  postId, 
  receiverId, 
  senderId, 
  userCoins, 
  onGiftSent 
}: GiftPanelProps) {
  const [gifts, setGifts] = useState<Gift[]>([])
  const [sending, setSending] = useState<string | null>(null)
  
  const supabase = createClient()

  useEffect(() => {
    fetchGifts()
  }, [])

  const fetchGifts = async () => {
    const { data } = await supabase
      .from('gifts')
      .select('*')
      .order('cost', { ascending: true })
    
    setGifts(data || [])
  }

  const sendGift = async (gift: Gift) => {
    if (userCoins < gift.cost || sending) return
    
    setSending(gift.id)
    
    try {
      // This would typically be handled by a server function
      // For hobby version, we'll simplify the transaction
      const { error } = await supabase
        .from('gift_transactions')
        .insert({
          sender_id: senderId,
          receiver_id: receiverId,
          gift_id: gift.id,
          post_id: postId,
          amount: gift.cost
        })
      
      if (error) throw error
      
      // Update sender coins (simplified - should be atomic in production)
      await supabase
        .from('profiles')
        .update({ coins: userCoins - gift.cost })
        .eq('id', senderId)
      
      onGiftSent()
    } catch (error) {
      console.error('Error sending gift:', error)
    } finally {
      setSending(null)
    }
  }

  return (
    <div className="bg-gray-800 p-4 rounded-xl">
      <h3 className="text-white font-bold mb-4">Send Gift</h3>
      <div className="grid grid-cols-3 gap-3">
        {gifts.map((gift) => (
          <button
            key={gift.id}
            onClick={() => sendGift(gift)}
            disabled={userCoins < gift.cost || sending === gift.id}
            className={`p-3 rounded-lg text-center transition-all ${
              userCoins >= gift.cost 
                ? 'bg-gray-700 hover:bg-indigo-600' 
                : 'bg-gray-800 opacity-50 cursor-not-allowed'
            }`}
          >
            <div className="text-2xl mb-1">{gift.emoji}</div>
            <div className="text-xs text-gray-300">{gift.name}</div>
            <div className="text-xs text-yellow-400 font-bold">{gift.cost}</div>
          </button>
        ))}
      </div>
    </div>
  )
}