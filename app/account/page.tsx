"use client";

import { useState } from 'react';
import { useUserData } from '@nhost/nextjs';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, Key } from 'lucide-react';

export default function AccountPage() {
  const user = useUserData();
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">Account Settings</h1>
      
      <div className="space-y-8 ">
        {/* Profile Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow justify-center items-center flex flex-col">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <User className="mr-2" /> Profile Information
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            <Avatar className="h-20 w-20 relative">
              <AvatarImage src={user?.avatarUrl || ''} alt={user?.email || ''} />
              <AvatarFallback>
                <User className="h-8 w-8 text-gray-600" />
              </AvatarFallback>
              <div className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full justify-between items-center flex">
                <User className="text-white" />
              </div>
            </Avatar>
            <div className="mt-4 sm:mt-0 w-full">
              <p className="text-md text-gray-600 dark:text-white">Profile Picture</p>
              <Button variant="outline" className="mt-3 w-full">
                Change Avatar
              </Button>
            </div>
          </div>
        </div>

        {/* Email Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Mail className="mr-2" /> Email Address
          </h2>
          {isEditingEmail ? (
            <div className="space-y-4">
              <input
                type="email"
                defaultValue={user?.email}
                className="w-full p-2 border rounded"
              />
              <div className="space-x-2">
                <Button onClick={() => setIsEditingEmail(false)}>Save</Button>
                <Button variant="outline" onClick={() => setIsEditingEmail(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-gray-700 dark:text-white">{user?.email}</p>
              <Button variant="outline" onClick={() => setIsEditingEmail(true)} className="w-full sm:w-auto">
                Change Email
              </Button>
            </div>
          )}
        </div>

        {/* Password Section */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Key className="mr-2" /> Password
          </h2>
          {isEditingPassword ? (
            <div className="space-y-4">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full p-2 border rounded"
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full p-2 border rounded"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full p-2 border rounded"
              />
              <div className="space-x-2">
                <Button onClick={() => setIsEditingPassword(false)}>Update Password</Button>
                <Button variant="outline" onClick={() => setIsEditingPassword(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-gray-700 dark:text-white">••••••••</p>
              <Button variant="outline" onClick={() => setIsEditingPassword(true)}>
                Change Password
              </Button>
            </div>
          )}
        </div>

        {/* Account Type */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Current Plan</h2>
              <p className="text-gray-600 dark:text-white">Free Plan</p>
            </div>
            <Button variant="default" className="bg-red-600 hover:bg-red-700">
              Upgrade Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
