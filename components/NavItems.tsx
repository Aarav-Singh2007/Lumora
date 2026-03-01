'use client';

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "../lib/utils";

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Companions', href: '/companions' },
  { label: 'Quizes', href: '/Quizpage' },
  { label: 'My Journey', href: '/my-journey' },
  { label: 'Analyzer', href: '/lab' },
  { label: 'Planner', href: '/planner' }
]

const NavItems = () => {
  const pathname = usePathname();


  return (
    <nav className='flex items-center gap-4'>
      {navItems.map(({ label, href }) => (
        <Link href={href} 
        key={label} 
        className={cn(pathname=== href? "font-bold text-red-500" : "")}
        >
          {label}</Link>
      ))}
    </nav>
  )
}

export default NavItems