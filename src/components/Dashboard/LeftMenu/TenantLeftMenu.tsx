import * as React from 'react';
import { useRouter } from 'next/router';

export default function TenantLeftMenu() {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <>
      <li className={`menu-item ${currentPath.startsWith('/companies') ? 'active open' : ''}`}>
        <a href="#" className="menu-link menu-toggle">
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Layouts">Empresas</div>
        </a>

        <ul className="menu-sub">
          <li className={`menu-item ${currentPath === '/companies/new' ? 'active' : ''}`}>
            <a href="/companies/new" className="menu-link">
              <div data-i18n="Without menu">Criar</div>
            </a>
          </li>
          <li className={`menu-item ${currentPath === '/companies/list' ? 'active' : ''}`}>
            <a href="/companies/list" className="menu-link">
              <div data-i18n="Without navbar">Listar</div>
            </a>
          </li>
        </ul>
      </li>
      <li className={`menu-item ${currentPath.startsWith('/employees') ? 'active open' : ''}`}>
        <a href="#" className="menu-link menu-toggle">
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Layouts">Colaboradores</div>
        </a>

        <ul className="menu-sub">
          <li className={`menu-item ${currentPath === '/employees/new' ? 'active' : ''}`}>
            <a href="/employees/new" className="menu-link">
              <div data-i18n="Without menu">Criar</div>
            </a>
          </li>
          <li className={`menu-item ${currentPath === '/employees/list' ? 'active' : ''}`}>
            <a href="/employees/list" className="menu-link">
              <div data-i18n="Without navbar">Listar</div>
            </a>
          </li>
        </ul>
      </li>
    </>
  )
}