import React, { useState } from 'react';
import { useGuestbookStore } from '../store/useGuestbookStore';
import { cn } from '../../../utils/cn';
import { Send, MapPin, Globe, Loader2, AlertCircle } from 'lucide-react';

const COLORS = ['#cf8c8c', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];
const AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
];

export function Composer() {
  const { addEntry, lastSubmitTime } = useGuestbookStore();
  
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [avatar, setAvatar] = useState(AVATARS[0]);
  const [themeColor, setThemeColor] = useState(COLORS[0]);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const MAX_MESSAGE_LENGTH = 1000;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!displayName.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!message.trim()) {
      setError('Please write a message.');
      return;
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      setError(`Message is too long. Limit to ${MAX_MESSAGE_LENGTH} characters.`);
      return;
    }
    if (website && !website.startsWith('http')) {
      setError('Website must start with http:// or https://');
      return;
    }
    
    // Rate limiting (60 seconds)
    if (Date.now() - lastSubmitTime < 60000) {
      setError('You are signing too quickly! Please wait a moment.');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/moderate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, displayName })
      });
      
      const result = await response.json();
      
      if (result.decision === 'Reject') {
        setError('Your message was rejected by the moderation system. Keep it friendly!');
      } else {
        // Publish or Review
        addEntry({
          displayName: displayName.trim(),
          message: message.trim(),
          location: location.trim(),
          website: website.trim(),
          avatar,
          themeColor
        }, result.decision, result.reason);
        
        // Reset form
        setMessage('');
        if (result.decision === 'Review') {
          setError('Your message was submitted and is pending review by the owner.');
        } else {
          // Success, no error
          setError('');
        }
      }
    } catch (err) {
      console.error(err);
      setError('Failed to contact moderation service. Try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-[#eaddd7] rounded-3xl p-6 md:p-8 shadow-sm">
      <h3 className="font-serif font-medium text-[#4a3f3a] text-xl mb-6">Sign the Guestbook</h3>
      
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-600 text-sm flex items-start gap-3">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#a3948e] uppercase tracking-wider">Display Name *</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="How should we call you?"
              maxLength={50}
              className="w-full bg-[#f8f4f0] border border-[#eaddd7] rounded-xl px-4 py-2.5 text-sm text-[#4a3f3a] focus:outline-none focus:border-[#cf8c8c] focus:ring-1 focus:ring-[#cf8c8c] transition-all font-sans"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-semibold text-[#a3948e] uppercase tracking-wider">Avatar</label>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
              {AVATARS.map(img => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setAvatar(img)}
                  className={cn(
                    "w-10 h-10 rounded-full overflow-hidden shrink-0 transition-transform",
                    avatar === img ? "ring-2 ring-[#cf8c8c] scale-110" : "opacity-70 hover:opacity-100"
                  )}
                >
                  <img src={img} alt="Avatar option" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-semibold text-[#a3948e] uppercase tracking-wider flex justify-between">
            <span>Message *</span>
            <span className={message.length > MAX_MESSAGE_LENGTH ? "text-red-500" : "text-[#d6c7c1]"}>
              {message.length}/{MAX_MESSAGE_LENGTH}
            </span>
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave a friendly note..."
            rows={4}
            className="w-full bg-[#f8f4f0] border border-[#eaddd7] rounded-xl px-4 py-3 text-sm text-[#4a3f3a] focus:outline-none focus:border-[#cf8c8c] focus:ring-1 focus:ring-[#cf8c8c] transition-all font-serif resize-none"
            disabled={isSubmitting}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a3948e]" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where are you from?"
              maxLength={100}
              className="w-full bg-[#f8f4f0] border border-[#eaddd7] rounded-xl pl-9 pr-4 py-2.5 text-sm text-[#4a3f3a] focus:outline-none focus:border-[#cf8c8c] focus:ring-1 focus:ring-[#cf8c8c] transition-all font-sans"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="relative">
            <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a3948e]" />
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Your website (https://...)"
              className="w-full bg-[#f8f4f0] border border-[#eaddd7] rounded-xl pl-9 pr-4 py-2.5 text-sm text-[#4a3f3a] focus:outline-none focus:border-[#cf8c8c] focus:ring-1 focus:ring-[#cf8c8c] transition-all font-sans"
              disabled={isSubmitting}
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#a3948e] mr-2">Theme:</span>
            {COLORS.map(color => (
              <button
                key={color}
                type="button"
                onClick={() => setThemeColor(color)}
                className={cn(
                  "w-6 h-6 rounded-full transition-transform",
                  themeColor === color ? "ring-2 ring-offset-2 ring-gray-300 scale-110" : "hover:scale-110"
                )}
                style={{ backgroundColor: color }}
                title="Select Theme Color"
              />
            ))}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 bg-[#cf8c8c] hover:bg-[#b87a7a] text-white px-6 py-2.5 rounded-full font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Validating...
              </>
            ) : (
              <>
                <Send size={16} />
                Sign Guestbook
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
