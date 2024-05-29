'use client';

import Link from 'next/link';
import { SignOut } from '@/utils/auth-helpers/server';
import { handleRequest } from '@/utils/auth-helpers/client';
// Removed the Logo import since we're using an image directly
import { usePathname, useRouter } from 'next/navigation';
import { getRedirectMethod } from '@/utils/auth-helpers/settings';
import s from './Navbar.module.css';

interface NavlinksProps {
  user?: any;
}

export default function Navlinks({ user }: NavlinksProps) {
  const router = getRedirectMethod() === 'client' ? useRouter() : null;

  return (
    <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
      <div className="flex items-center flex-1">
        <Link href="/" className={s.logo} aria-label="Home">
          {/* Here we use an <img> tag directly instead of the Logo component */}
          <img src="https://img.mytsi.org/i/tbLk576.png" alt="Logo" style={{ height: '50px' }} />
        </Link>
        <nav className="ml-6 space-x-2 lg:block">
          {user && (
            <>
              <Link href="/account" className={s.link}>
                Account
              </Link>
              <Link href="/private" className={s.link}>
                Studio
              </Link>
              <Link href="#about" className={s.link}>
                About
              </Link>
            </>
          )}
        </nav>
      </div>
      <div className="flex justify-end space-x-8">
        {user ? (
          <form onSubmit={(e) => handleRequest(e, SignOut, router)}>
            <input type="hidden" name="pathName" value={usePathname()} />
            <button type="submit" className={s.link}>
              Sign out
            </button>
          </form>
        ) : (
          <Link href="/signin" className={s.link}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}