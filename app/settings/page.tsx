"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  Moon, 
  Sun, 
  Sliders, 
  Save
} from 'lucide-react';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

const SettingsSection = ({ title, children }: SettingsSectionProps) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    {children}
  </div>
);

interface ToggleSettingProps {
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}

const ToggleSetting = ({ title, description, enabled, onToggle }: ToggleSettingProps) => (
  <div className="flex items-center justify-between py-4">
    <div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    <button
      onClick={onToggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
        enabled ? 'bg-red-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    theme: 'system',
    language: 'en',
    emailNotifications: true,
    summaryLength: 'medium',
    autoSave: true,
    shareAnalytics: false,
    desktopNotifications: true,
    soundEnabled: true
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <Button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-red-600 hover:bg-red-700"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <SettingsSection title="Appearance">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Theme</label>
            <div className="flex space-x-4">
              {['light', 'dark', 'system'].map((theme) => (
                <button
                  key={theme}
                  onClick={() => setSettings({ ...settings, theme })}
                  className={`px-4 py-2 rounded-md flex items-center ${
                    settings.theme === theme
                      ? 'bg-red-100 text-red-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {theme === 'light' && <Sun className="h-4 w-4 mr-2" />}
                  {theme === 'dark' && <Moon className="h-4 w-4 mr-2" />}
                  {theme === 'system' && <Sliders className="h-4 w-4 mr-2" />}
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Language</label>
            <select
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value })}
              className="w-full max-w-xs px-4 py-2 border rounded-md"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection title="Summary Preferences">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Summary Length</label>
            <select
              value={settings.summaryLength}
              onChange={(e) => setSettings({ ...settings, summaryLength: e.target.value })}
              className="w-full max-w-xs px-4 py-2 border rounded-md"
            >
              <option value="short">Short (2-3 paragraphs)</option>
              <option value="medium">Medium (4-5 paragraphs)</option>
              <option value="long">Long (6+ paragraphs)</option>
            </select>
          </div>

          <ToggleSetting
            title="Auto-save summaries"
            description="Automatically save summaries to your history"
            enabled={settings.autoSave}
            onToggle={() => setSettings({ ...settings, autoSave: !settings.autoSave })}
          />
        </div>
      </SettingsSection>

      <SettingsSection title="Notifications">
        <div className="space-y-4">
          <ToggleSetting
            title="Email Notifications"
            description="Receive email updates about your summaries"
            enabled={settings.emailNotifications}
            onToggle={() => setSettings({ 
              ...settings, 
              emailNotifications: !settings.emailNotifications 
            })}
          />

          <ToggleSetting
            title="Desktop Notifications"
            description="Show desktop notifications when summaries are ready"
            enabled={settings.desktopNotifications}
            onToggle={() => setSettings({ 
              ...settings, 
              desktopNotifications: !settings.desktopNotifications 
            })}
          />

          <ToggleSetting
            title="Sound Effects"
            description="Play sound when actions are completed"
            enabled={settings.soundEnabled}
            onToggle={() => setSettings({ 
              ...settings, 
              soundEnabled: !settings.soundEnabled 
            })}
          />
        </div>
      </SettingsSection>

      <SettingsSection title="Privacy">
        <ToggleSetting
          title="Share Analytics"
          description="Help us improve by sharing anonymous usage data"
          enabled={settings.shareAnalytics}
          onToggle={() => setSettings({ 
            ...settings, 
            shareAnalytics: !settings.shareAnalytics 
          })}
        />
      </SettingsSection>
    </div>
  );
} 