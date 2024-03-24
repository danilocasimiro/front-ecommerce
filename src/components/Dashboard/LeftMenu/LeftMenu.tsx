import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import SubLeftMenu from './SubLeftMenu';

interface MenuItem {
  id: string;
  company: number;
  icon: string;
  label: string;
  link: string;
  parent_id: string;
}

export default function LeftMenu() {
  const router = useRouter();
  const currentPath = router.pathname;
  const { data: session } = useSession();
  const [menu, setMenu] = useState<MenuItem[]>([]);

  const fetchPath = (currentMenuId: string | number) => {
    const filteredChildren = menu.filter(objeto => objeto.parent_id === currentMenuId)[0];
    const parts = filteredChildren.link.split("/");

    return parts[1];
  }

  useEffect(() => {
    if (session?.user.menu) {
      setMenu(session.user.menu);
    }
  }, [session?.user.menu]);

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
          {menu.map((item, index) => (
            item.parent_id == null && (
              <li key={index} className={`menu-item ${currentPath.includes(fetchPath(item.id)) ? 'active open' : ''}`}>
                <a href="#" className="menu-link menu-toggle">
                  <i className={`menu-icon tf-icons ${item.icon}`}></i>
                  <div data-i18n="Layouts">{item.label}</div>
                </a>
                <SubLeftMenu parent_id={item.id}></SubLeftMenu>
              </li>
            )
          ))}
        </ul>
      </aside>
    </>
  )
}