import React, { useState } from 'react';
import { useGuestbookStore } from '../store/useGuestbookStore';
import { cn } from '../../../utils/cn';
import { Send, MapPin, Globe, Loader2, AlertCircle } from 'lucide-react';

const COLORS = ['#cf8c8c', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ec4899'];

// Basic bad words filter
const BANNED_WORDS = ['fuck', 'shit', 'bitch', 'asshole', 'cunt', 'dick', 'pussy', 'slut', 'whore', 'bastard'];

function containsBannedWords(text: string) {
  const normalized = text.toLowerCase();
  return BANNED_WORDS.some(word => normalized.includes(word));
}

export function Composer() {
  const { addEntry, lastSubmitTime, isGuestbookEnabled } = useGuestbookStore();
  
  const [displayName, setDisplayName] = useState('');
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
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
    
    if (containsBannedWords(message) || containsBannedWords(displayName)) {
      setError('Please keep the language friendly. Your message was blocked.');
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
          location: location.trim(),
          website: website.trim(),
          avatar: '',
          favoriteColor: themeColor
        }, message.trim(), result.decision, result.reason);
        
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

  if (!isGuestbookEnabled) {
    return (
      <div className="bg-os-window-bg border border-os-window-border rounded-3xl p-6 md:p-8 shadow-os flex flex-col items-center justify-center text-center">
        <h3 className="font-serif font-medium text-os-text text-xl mb-2">Submissions Paused</h3>
        <p className="text-sm text-os-text-muted">The guestbook is currently not accepting new entries. Check back later!</p>
      </div>
    );
  }

  return (
    <div className="bg-os-window-bg border border-os-window-border rounded-3xl p-6 md:p-8 shadow-os">
      <h3 className="font-serif font-medium text-os-text text-xl mb-6">Sign the Guestbook</h3>
      
      {error && (
        <div className="mb-6 p-4 rounded-os bg-red-50 text-red-600 text-sm flex items-start gap-3">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-os-text-muted uppercase tracking-wider">Display Name *</label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="How should we call you?"
              maxLength={50}
              className="w-full bg-black/30 border border-os-window-border rounded-os px-4 py-2.5 text-sm text-os-text focus:outline-none focus:border-os-accent focus:ring-1 focus:ring-os-accent transition-all font-sans"
              disabled={isSubmitting}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-semibold text-os-text-muted uppercase tracking-wider flex justify-between">
            <span>Message *</span>
            <span className={message.length > MAX_MESSAGE_LENGTH ? "text-red-500" : "text-os-text-muted/50"}>
              {message.length}/{MAX_MESSAGE_LENGTH}
            </span>
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Leave a friendly note..."
            rows={4}
            className="w-full bg-black/30 border border-os-window-border rounded-os px-4 py-3 text-sm text-os-text focus:outline-none focus:border-os-accent focus:ring-1 focus:ring-os-accent transition-all font-serif resize-none"
            disabled={isSubmitting}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-os-text-muted" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Where are you from?"
              maxLength={100}
              className="w-full bg-black/30 border border-os-window-border rounded-os pl-9 pr-4 py-2.5 text-sm text-os-text focus:outline-none focus:border-os-accent focus:ring-1 focus:ring-os-accent transition-all font-sans"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="relative">
            <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-os-text-muted" />
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Your website (https://...)"
              className="w-full bg-black/30 border border-os-window-border rounded-os pl-9 pr-4 py-2.5 text-sm text-os-text focus:outline-none focus:border-os-accent focus:ring-1 focus:ring-os-accent transition-all font-sans"
              disabled={isSubmitting}
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-os-text-muted mr-2">Theme:</span>
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
            className="flex items-center justify-center gap-2 bg-os-accent hover:bg-os-accent-hover text-white px-6 py-2.5 rounded-full font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
