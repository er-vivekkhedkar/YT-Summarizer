"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useUserData } from '@nhost/nextjs';
import toast from 'react-hot-toast';

export default function SettingsPage() {
  const user = useUserData();
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  const handleSaveSettings = () => {
    try {
      // Save settings logic here
      toast.success('Settings saved successfully!');
    } catch {
      toast.error('Failed to save settings');
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
            Settings
          </h1>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
            {/* Appearance */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Appearance
              </h2>
              <div className="flex items-center justify-between">
                <label className="text-gray-700 dark:text-gray-300">
                  Dark Mode
                </label>
                <Switch
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
            </div>

            {/* Notifications */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Notifications
              </h2>
              <div className="flex items-center justify-between">
                <label className="text-gray-700 dark:text-gray-300">
                  Email Notifications
                </label>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
            </div>

            {/* Auto-Save */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Content
              </h2>
              <div className="flex items-center justify-between">
                <label className="text-gray-700 dark:text-gray-300">
                  Auto-save summaries
                </label>
                <Switch
                  checked={autoSave}
                  onCheckedChange={setAutoSave}
                />
              </div>
            </div>

            {/* Account Info */}
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Account
              </h2>
              <div className="space-y-2">
                <p className="text-gray-700 dark:text-gray-300">
                  Email: {user?.email || 'Not logged in'}
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Member since: {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4">
              <Button
                onClick={handleSaveSettings}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 