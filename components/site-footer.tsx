"use client";

import Link from "next/link"
import { Youtube, Twitter, Github, Facebook, Linkedin } from 'lucide-react'

export function SiteFooter() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Youtube className="h-6 w-6 text-red-600" />
              <span className="font-bold text-xl text-gray-900 dark:text-white">YT Summarizer</span>
            </Link>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              AI-powered YouTube video summarization tool. Save time and extract key insights from any video content.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/ai-youtube" className="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">AI YouTube</Link></li>
              <li><Link href="/workspace" className="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Workspace</Link></li>
              <li><Link href="/pricing" className="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">About</Link></li>
              <li><Link href="/contact" className="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Contact</Link></li>
              <li><Link href="#" className="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Careers</Link></li>
              <li><Link href="#" className="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-700 dark:text-gray-300">&copy; 2025 YT Summarizer. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" />
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white">
              <span className="sr-only">LinkedIn</span>
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

