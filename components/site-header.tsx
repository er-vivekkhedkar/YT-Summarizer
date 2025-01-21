"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Youtube, Menu, X, ChevronDown, User, LogOut, Settings, CreditCard, History } from 'lucide-react'
import { useAuthenticationStatus, useSignOut, useUserData } from '@nhost/nextjs'
import { motion } from "framer-motion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function SiteHeader() {
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuthenticationStatus()
  const { signOut } = useSignOut()
  const user = useUserData()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) {
    return null
  }

  const getUserInitials = () => {
    if (!user?.email) return "U"
    const [firstName, lastName] = user.email.split('@')[0].split('.')
    if (lastName) {
      return `${firstName[0]}${lastName[0]}`.toUpperCase()
    }
    return firstName.slice(0, 2).toUpperCase()
  }

  const navItems = [
    { href: "/", label: "Home" },
    {
      label: "Tools",
      items: [
        { href: "/ai-youtube", label: "AI YouTube" },
        { href: "/workspace", label: "Workspace" },
      ],
    },
    { href: "/pricing", label: "Pricing" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-lg shadow-lg dark:bg-zinc-900/80' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link className="flex items-center space-x-2 group" href="/">
            <Youtube className="h-7 w-7 text-red-600 transition-transform duration-300 group-hover:scale-110" />
            <span className="font-bold text-xl text-zinc-900 dark:text-white">YT Summarizer</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              'items' in item ? (
                <DropdownMenu key={index}>
                  <DropdownMenuTrigger className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800/50 text-zinc-700 dark:text-zinc-300">
                    <span className="flex items-center">
                      {item.label}
                      <ChevronDown className="ml-1 h-4 w-4 opacity-50" />
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 mt-2">
                    {item.items?.map((subItem, subIndex) => (
                      <DropdownMenuItem key={subIndex} className="cursor-pointer">
                        <Link href={subItem.href} className="w-full">
                          {subItem.label}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    pathname === item.href
                      ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white'
                      : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800/50'
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            {mounted && (
              <>
                {isLoading ? (
                  <div className="h-9 w-9 rounded-full bg-zinc-200 animate-pulse dark:bg-zinc-800" />
                ) : isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="relative h-10 rounded-full pl-2 pr-4 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      >
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-7 w-7 border border-zinc-200 dark:border-zinc-700">
                            <AvatarImage src={user?.avatarUrl || ''} alt={user?.email || ''} />
                            <AvatarFallback className="bg-gradient-to-br from-red-500 to-red-600 text-white">
                              {getUserInitials()}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{user?.email}</span>
                          <ChevronDown className="h-4 w-4 text-zinc-500" />
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 mt-2" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium">{user?.email}</p>
                          <p className="text-xs text-zinc-500">Free Plan</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/account')}>
                          <User className="mr-2 h-4 w-4" />
                          <span>Account</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/billing')}>
                          <CreditCard className="mr-2 h-4 w-4" />
                          <span>Billing</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/history')}>
                          <History className="mr-2 h-4 w-4" />
                          <span>History</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer" onClick={() => router.push('/settings')}>
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950"
                        onClick={() => signOut()}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <>
                    <Link href="/login" passHref>
                      <Button variant="ghost" className="rounded-full px-4 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                        Log in
                      </Button>
                    </Link>
                    <Link href="/signup" passHref>
                      <Button 
                        className="rounded-full px-4 text-sm font-medium bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white border-0 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300"
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          <Button
            className="md:hidden relative p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full"
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <motion.div
              animate={{ rotate: isMenuOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-zinc-900 dark:text-white"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" strokeWidth={2} />
              ) : (
                <Menu className="h-6 w-6" strokeWidth={2} />
              )}
            </motion.div>
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0, height: isMenuOpen ? "auto" : 0 }}
        transition={{ duration: 0.2 }}
        className="md:hidden overflow-hidden bg-white/80 backdrop-blur-lg dark:bg-zinc-900/80 border-t border-zinc-200 dark:border-zinc-800"
      >
        <div className="space-y-1 px-4 py-3">
          {navItems.map((item, index) => (
            'items' in item ? (
              <div key={index} className="space-y-1">
                <div className="px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  {item.label}
                </div>
                {item.items?.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    href={subItem.href}
                    className="block px-3 py-2 pl-6 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={index}
                href={item.href}
                className="block px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            )
          ))}
        </div>
        
        {isAuthenticated ? (
          <div className="border-t border-zinc-200 dark:border-zinc-800 px-4 py-4">
            <div className="flex items-center mb-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.avatarUrl || ''} alt={user?.email || ''} />
                <AvatarFallback className="bg-gradient-to-br from-red-500 to-red-600 text-white">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <div className="text-sm font-medium text-zinc-900 dark:text-white">{user?.email}</div>
                <div className="text-xs text-zinc-500">Free Plan</div>
              </div>
            </div>
            <div className="space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start rounded-lg"
                onClick={() => {
                  router.push('/account')
                  setIsMenuOpen(false)
                }}
              >
                <User className="mr-2 h-4 w-4" />
                Account
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start rounded-lg"
                onClick={() => {
                  router.push('/billing')
                  setIsMenuOpen(false)
                }}
              >
                <CreditCard className="mr-2 h-4 w-4" />
                Billing
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start rounded-lg"
                onClick={() => {
                  router.push('/settings')
                  setIsMenuOpen(false)
                }}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg"
                onClick={() => {
                  signOut()
                  setIsMenuOpen(false)
                }}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </Button>
            </div>
          </div>
        ) : (
          <div className="border-t border-zinc-200 dark:border-zinc-800 px-4 py-4">
            <div className="flex flex-col space-y-2">
              <Link href="/login" passHref>
                <Button 
                  variant="outline" 
                  className="w-full rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Button>
              </Link>
              <Link href="/signup" passHref>
                <Button 
                  className="w-full rounded-lg bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white border-0"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </motion.div>
    </motion.header>
  )
}

