import * as React from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router';
import CompanyLeftMenu from './CompanyLeftMenu';
import { useSession } from 'next-auth/react';
import UserLeftMenu from './UserLeftMenu';

export default function LeftMenu() {
  const router = useRouter();
  const currentPath = router.pathname;
  const { data: session } = useSession();

  return (
    <>
      <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
        <div className="app-brand demo">
          <a href="index.html" className="app-brand-link">
            <span className="app-brand-logo demo">
              <Image
                src="/dashboard/image/logo.jpg"
                alt="Vercel Logo"
                className="dark:invert"
                width={70}
                height={60}
                priority
              />
            </span>
            <span className="app-brand-text demo menu-text fw-bolder ms-2">Sneat</span>
          </a>

          <a href="#" className="layout-menu-toggle menu-link text-large ms-auto d-block d-xl-none">
            <i className="bx bx-chevron-left bx-sm align-middle"></i>
          </a>
        </div>

        <div className="menu-inner-shadow"></div>

        <ul className="menu-inner py-1">
          <li className={`menu-item ${currentPath === '/dashboard' ? 'active' : ''}`}>
            <a href="/dashboard" className="menu-link">
              <i className="menu-icon tf-icons bx bx-home-circle"></i>
              <div data-i18n="Analytics">Dashboard</div>
            </a>
          </li>
          {session?.user?.company_name ? (
            <CompanyLeftMenu />
          ) : (
            <UserLeftMenu />
          )}
        </ul>
      </aside>
    </>
  )
}