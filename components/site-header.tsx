"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Youtube, Menu, X, ChevronDown, User, LogOut, Settings, CreditCard, History } from 'lucide-react'
import { useAuthenticationStatus, useSignOut, useUserData } from '@nhost/nextjs'
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
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-md dark:bg-gray-900' 
        : 'bg-white dark:bg-gray-900'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link className="flex items-center space-x-2" href="/">
            <Youtube className="h-6 w-6 text-red-600" />
            <span className="font-bold text-xl">YT Summarizer</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item, index) => (
              'items' in item ? (
                <DropdownMenu key={index}>
                  <DropdownMenuTrigger className="px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none dark:hover:bg-gray-800">
                    {item.label}
                    <ChevronDown className="ml-1 h-4 w-4 inline-block" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {item.items?.map((subItem, subIndex) => (
                      <DropdownMenuItem key={subIndex}>
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
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100'
                      : 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>
          <div className="hidden md:flex items-center space-x-2">
            {mounted && (
              <>
                {isLoading ? (
                  <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse" />
                ) : isAuthenticated ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="relative h-9 rounded-full px-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                      >
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-7 w-7 border border-gray-200 dark:border-gray-700">
                            <AvatarImage 
                              src={user?.avatarUrl || ''} 
                              alt={user?.email || ''} 
                            />
                            <AvatarFallback className="bg-gray-900 text-white dark:bg-gray-700">
                              {getUserInitials()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex items-center">
                            <span className="text-sm font-medium">{user?.email}</span>
                            <ChevronDown className="ml-1 h-4 w-4 text-gray-500" />
                          </div>
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      className="w-56 mt-2" 
                      align="end" 
                      forceMount
                    >
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {user?.email}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Free Plan
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem 
                          className="cursor-pointer"
                          onClick={() => router.push('/account')}
                        >
                          <User className="mr-2 h-4 w-4" />
                          <span>Account</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer"
                          onClick={() => router.push('/billing')}
                        >
                          <CreditCard className="mr-2 h-4 w-4" />
                          <span>Billing</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer"
                          onClick={() => router.push('/history')}
                        >
                          <History className="mr-2 h-4 w-4" />
                          <span>History</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer"
                          onClick={() => router.push('/settings')}
                        >
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="cursor-pointer text-red-600 focus:text-red-600"
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
                      <Button variant="ghost" className="text-sm font-medium">
                        Log in
                      </Button>
                    </Link>
                    <Link href="/signup" passHref>
                      <Button 
                        variant="default" 
                        className="text-sm font-medium bg-red-600 hover:bg-red-700 text-white"
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
            className="md:hidden"
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navItems.map((item, index) => (
              'items' in item ? (
                <div key={index}>
                  <div className="px-3 py-2 text-base font-medium">{item.label}</div>
                  {item.items?.map((subItem, subIndex) => (
                    <Link
                      key={subIndex}
                      href={subItem.href}
                      className="block px-3 py-2 pl-6 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
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
                  className="block px-3 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>
          
          {isAuthenticated ? (
            <div className="border-t border-gray-200 dark:border-gray-700 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.avatarUrl || ''} alt={user?.email || ''} />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium">{user?.email}</div>
                  <div className="text-sm font-medium text-gray-500">Free Plan</div>
                </div>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
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
                  className="w-full justify-start"
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
                  className="w-full justify-start"
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
                  className="w-full justify-start"
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
            <div className="border-t border-gray-200 dark:border-gray-700 pb-3 pt-4 px-5">
              <div className="flex flex-col space-y-2">
                <Link href="/login" passHref>
                  <Button variant="outline" className="w-full" onClick={() => setIsMenuOpen(false)}>
                    Log in
                  </Button>
                </Link>
                <Link href="/signup" passHref>
                  <Button variant="default" className="w-full bg-red-600 hover:bg-red-700" onClick={() => setIsMenuOpen(false)}>
                    Sign Up
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  )
}

