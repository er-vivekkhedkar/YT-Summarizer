"use client";

import { useState } from 'react';
import { authService } from '@/lib/auth-service';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const { error } = await authService.resetPassword(email);
      if (error) throw error;
      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8 p-6">
        <h2 className="text-center text-3xl font-bold">Reset your password</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success ? (
          <div className="text-center space-y-4">
            <p className="text-green-600">
              Password reset instructions have been sent to your email.
            </p>
            <Link href="/login" className="text-red-600 hover:text-red-700">
              Return to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                required
                className="w-full rounded border p-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded bg-red-600 p-2 text-white hover:bg-red-700"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 