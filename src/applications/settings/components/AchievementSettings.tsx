import React from 'react';
import { useAchievementStore, ACHIEVEMENTS } from '../../../store/useAchievementStore';
import { Trophy, Lock, CheckCircle2 } from 'lucide-react';
import { cn } from '../../../utils/cn';

export function AchievementSettings() {
  const { achievements } = useAchievementStore();
  const unlockedIds = Object.values(achievements).filter(a => a.unlockedAt).map(a => a.id);

  const achievementList = Object.values(ACHIEVEMENTS);
  const totalAchievements = achievementList.length;
  const unlockedCount = unlockedIds.length;
  const progress = Math.round((unlockedCount / totalAchievements) * 100);

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto space-y-8 sm:space-y-12">
      <div className="text-center mb-12">
        <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-yellow-500 to-amber-700 rounded-os shadow-os flex items-center justify-center mb-6">
          <Trophy size={48} className="text-white drop-shadow-os" />
        </div>
        <h1 className="text-4xl font-light tracking-tight mb-2">Digital Lore</h1>
        <p className="text-os-text-muted">Uncover hidden details across PinkWire OS</p>
      </div>

      <div className="bg-black/20 border border-os-window-border rounded-os p-6 backdrop-blur-os-os-os shadow-os">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-os-text font-medium">Completion</span>
          <span className="text-os-text-muted">{unlockedCount} / {totalAchievements} Unlocked</span>
        </div>
        <div className="w-full h-3 bg-black/40 rounded-full overflow-hidden border border-os-window-border/50">
          <div 
            className="h-full bg-gradient-to-r from-yellow-500 to-amber-500 transition-all duration-1000 ease-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {achievementList.map(achievement => {
          const isUnlocked = unlockedIds.includes(achievement.id);
          const Icon = isUnlocked ? CheckCircle2 : Lock;

          return (
            <div 
              key={achievement.id}
              className={cn(
                "p-4 rounded-os border flex gap-4 transition-all duration-300",
                isUnlocked 
                  ? "bg-black/30 border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.05)]" 
                  : "bg-black/10 border-os-window-border/50 opacity-60 grayscale"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center shrink-0",
                isUnlocked ? "bg-yellow-500/20 text-yellow-500" : "bg-black/30 text-os-text-muted"
              )}>
                <Icon size={20} />
              </div>
              <div>
                <h3 className={cn("font-semibold mb-1", isUnlocked ? "text-os-text" : "text-os-text-muted")}>
                  {isUnlocked ? achievement.name : "Locked"}
                </h3>
                <p className="text-xs text-os-text-muted leading-relaxed">
                  {isUnlocked ? achievement.description : "Keep exploring to unlock this achievement."}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
