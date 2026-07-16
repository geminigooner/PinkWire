import React, { useState, useEffect } from 'react';
import { useThemeStore, THEME_CATEGORIES } from '../store/useThemeStore';
import { Theme } from '../../../services/theme/ThemeTypes';
import { X, Save, AlertCircle } from 'lucide-react';
import { cn } from '../../../utils/cn';

export function ThemeEditor({ onClose }: { onClose: () => void }) {
  const { previewThemeId, themes, addTheme, updateTheme, setPreviewThemeId } = useThemeStore();
  const existingTheme = previewThemeId ? themes.find(t => t.id === previewThemeId) : null;
  const isNew = !existingTheme;

  const [formData, setFormData] = useState<Partial<Theme>>(
    existingTheme || {
      name: 'New Theme',
      description: '',
      author: 'PinkWire Admin',
      category: 'Custom',
      primaryColor: '#000000',
      secondaryColor: 'rgba(15, 23, 42, 0.9)',
      accentColor: '#ec4899',
      accentHoverColor: '#db2777',
      titlebarColor: 'rgba(30, 41, 59, 0.8)',
      taskbarColor: 'rgba(15, 23, 42, 0.95)',
      textColor: '#f1f5f9',
      textMutedColor: '#94a3b8',
      borderColor: 'rgba(51, 65, 85, 0.5)',
      radius: '0.75rem',
      shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      blur: '12px',
      fontFamily: '"Inter", sans-serif',
      wallpaper: 'bg-black',
      iconStyle: 'default',
      cursorStyle: 'default',
      buttonStyle: 'rounded',
      animationStyle: 'smooth',
      favorite: false,
      featured: false
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSave = () => {
    if (isNew) {
      addTheme(formData as Omit<Theme, 'id' | 'createdDate'>);
      // Wait for state to update, then select it
      setTimeout(() => {
        const newThemes = useThemeStore.getState().themes;
        setPreviewThemeId(newThemes[0].id);
      }, 0);
    } else {
      updateTheme(existingTheme.id, formData);
    }
    onClose();
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-os-window-bg overflow-hidden absolute inset-0 z-20">
      <div className="h-14 border-b border-os-window-border bg-os-titlebar-bg/70 px-4 md:px-6 flex items-center justify-between shrink-0">
        <h2 className="font-medium text-os-text">{isNew ? 'Create Theme' : 'Edit Theme'}</h2>
        <div className="flex items-center gap-2">
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full text-os-text-muted transition-colors"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
          
          {/* Basic Info */}
          <section className="space-y-4">
            <h3 className="text-sm font-medium text-os-text-muted uppercase tracking-wider">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-os-text mb-1">Theme Name</label>
                <input 
                  type="text" name="name" value={formData.name || ''} onChange={handleChange}
                  className="w-full bg-black/30 border border-os-window-border rounded-os px-3 py-2 text-os-text focus:border-os-accent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-os-text mb-1">Author</label>
                <input 
                  type="text" name="author" value={formData.author || ''} onChange={handleChange}
                  className="w-full bg-black/30 border border-os-window-border rounded-os px-3 py-2 text-os-text focus:border-os-accent outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-os-text mb-1">Description</label>
                <textarea 
                  name="description" value={formData.description || ''} onChange={handleChange}
                  className="w-full bg-black/30 border border-os-window-border rounded-os px-3 py-2 text-os-text focus:border-os-accent outline-none h-20 resize-none"
                />
              </div>
              <div>
                <label className="block text-sm text-os-text mb-1">Category</label>
                <select 
                  name="category" value={formData.category || 'Custom'} onChange={handleChange}
                  className="w-full bg-black/30 border border-os-window-border rounded-os px-3 py-2 text-os-text focus:border-os-accent outline-none"
                >
                  {THEME_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div className="flex items-center gap-4 mt-6">
                <label className="flex items-center gap-2 text-sm text-os-text cursor-pointer">
                  <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="accent-os-accent" />
                  Featured
                </label>
              </div>
            </div>
          </section>

          {/* Colors */}
          <section className="space-y-4">
            <h3 className="text-sm font-medium text-os-text-muted uppercase tracking-wider">Colors</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[
                { name: 'primaryColor', label: 'OS Background' },
                { name: 'secondaryColor', label: 'Window Background' },
                { name: 'accentColor', label: 'Accent Color' },
                { name: 'accentHoverColor', label: 'Accent Hover' },
                { name: 'titlebarColor', label: 'Titlebar' },
                { name: 'taskbarColor', label: 'Taskbar' },
                { name: 'textColor', label: 'Text Primary' },
                { name: 'textMutedColor', label: 'Text Muted' },
                { name: 'borderColor', label: 'Border Color' }
              ].map(field => (
                <div key={field.name} className="space-y-1">
                  <label className="block text-xs text-os-text-muted">{field.label}</label>
                  <div className="flex gap-2">
                    <input 
                      type="color" 
                      name={field.name} 
                      value={String(formData[field.name as keyof Theme] || '').startsWith('rgb') || String(formData[field.name as keyof Theme] || '').startsWith('var') ? '#ffffff' : String(formData[field.name as keyof Theme])} 
                      onChange={(e) => {
                        // Let users input rgba as text below, just a helper for hex
                        const hex = e.target.value;
                        setFormData(prev => ({ ...prev, [field.name]: hex }));
                      }}
                      className="w-8 h-8 rounded cursor-pointer bg-transparent"
                    />
                    <input 
                      type="text" 
                      name={field.name} 
                      value={formData[field.name as keyof Theme] as string} 
                      onChange={handleChange}
                      className="flex-1 min-w-0 bg-black/30 border border-os-window-border rounded px-2 text-xs text-os-text outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Typography & Geometry */}
          <section className="space-y-4">
            <h3 className="text-sm font-medium text-os-text-muted uppercase tracking-wider">Typography & Geometry</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-os-text mb-1">Font Family</label>
                <input 
                  type="text" name="fontFamily" value={formData.fontFamily || ''} onChange={handleChange}
                  className="w-full bg-black/30 border border-os-window-border rounded-os px-3 py-2 text-os-text focus:border-os-accent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-os-text mb-1">Border Radius (radius-os)</label>
                <input 
                  type="text" name="radius" value={formData.radius || ''} onChange={handleChange}
                  className="w-full bg-black/30 border border-os-window-border rounded-os px-3 py-2 text-os-text focus:border-os-accent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-os-text mb-1">Blur Amount (blur-os)</label>
                <input 
                  type="text" name="blur" value={formData.blur || ''} onChange={handleChange}
                  className="w-full bg-black/30 border border-os-window-border rounded-os px-3 py-2 text-os-text focus:border-os-accent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-os-text mb-1">Shadow (shadow-os)</label>
                <input 
                  type="text" name="shadow" value={formData.shadow || ''} onChange={handleChange}
                  className="w-full bg-black/30 border border-os-window-border rounded-os px-3 py-2 text-os-text focus:border-os-accent outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-os-text mb-1">Default Wallpaper</label>
                <input 
                  type="text" name="wallpaper" value={formData.wallpaper || ''} onChange={handleChange}
                  placeholder="URL or CSS value (e.g. bg-black)"
                  className="w-full bg-black/30 border border-os-window-border rounded-os px-3 py-2 text-os-text focus:border-os-accent outline-none"
                />
              </div>
            </div>
          </section>

          <div className="pt-6 border-t border-os-window-border flex justify-end gap-3">
            <button 
              onClick={onClose}
              className="px-4 py-2 rounded-os border border-os-window-border hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="px-6 py-2 rounded-os bg-os-accent text-white font-medium hover:brightness-110 flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(var(--os-accent),0.3)]"
            >
              <Save size={18} />
              Save Theme
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}
