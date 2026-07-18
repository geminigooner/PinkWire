import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { cn } from '../utils/cn';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'danger' | 'warning' | 'info';
}

export function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'danger'
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="absolute inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm pointer-events-auto"
      onClick={(e) => { e.stopPropagation(); onCancel(); }}
    >
      <div 
        className="w-full max-w-sm bg-os-window-bg border border-os-window-border rounded-os shadow-[0_8px_30px_rgb(0,0,0,0.5)] overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5">
          <div className="flex items-start gap-4">
            <div className={cn(
              "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
              variant === 'danger' ? "bg-red-500/20 text-red-500" :
              variant === 'warning' ? "bg-yellow-500/20 text-yellow-500" :
              "bg-os-accent/20 text-os-accent"
            )}>
              <AlertTriangle size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-os-text mb-1">{title}</h3>
              <p className="text-sm text-os-text-muted leading-relaxed">{message}</p>
            </div>
          </div>
        </div>
        <div className="bg-black/20 p-4 border-t border-os-window-border flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-os-text-muted hover:text-os-text hover:bg-white/10 rounded-os transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onCancel();
            }}
            className={cn(
              "px-4 py-2 text-sm font-medium rounded-os text-white transition-colors shadow-os",
              variant === 'danger' ? "bg-red-500 hover:bg-red-600" :
              variant === 'warning' ? "bg-yellow-500 hover:bg-yellow-600" :
              "bg-os-accent hover:bg-os-accent-hover"
            )}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
