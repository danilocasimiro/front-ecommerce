import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function CompanyLeftMenu() {
  const router = useRouter();
  const currentPath = router.pathname;
  const { data: session } = useSession();

  const [userData, setUserData] = useState({
    company_id: ''
  });

  useEffect(() => {
    if (session) {
      setUserData({
        company_id: session.user?.company_id || ''
      });
    }
  }, [session]);

  return (
    <>
      <li className={`menu-item ${currentPath.startsWith('/companies') ? 'active' : ''}`}>
      <a id="companyLink" href={`/companies/${userData.company_id}`} className="menu-link">
          <i className="menu-icon tf-icons bx bx-home-circle"></i>
          <div data-i18n="Analytics">Empresa</div>
        </a>
      </li>
      <li className={`menu-item ${currentPath.startsWith('/product-types') ? 'active open' : ''}`}>
        <a href="#" className="menu-link menu-toggle">
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Layouts">Tipos de Produto</div>
        </a>

        <ul className="menu-sub">
          <li className={`menu-item ${currentPath === '/product-types/new' ? 'active' : ''}`}>
            <a href="/product-types/new" className="menu-link">
              <div data-i18n="Without menu">Criar</div>
            </a>
          </li>
          <li className={`menu-item ${currentPath === '/product-types/list' ? 'active' : ''}`}>
            <a href="/product-types/list" className="menu-link">
              <div data-i18n="Without navbar">Listar</div>
            </a>
          </li>
        </ul>
      </li>
      <li className={`menu-item ${currentPath.startsWith('/products') ? 'active open' : ''}`}>
        <a href="#" className="menu-link menu-toggle">
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Layouts">Produtos</div>
        </a>

        <ul className="menu-sub">
          <li className={`menu-item ${currentPath === '/products/new' ? 'active' : ''}`}>
            <a href="/products/new" className="menu-link">
              <div data-i18n="Without menu">Criar</div>
            </a>
          </li>
          <li className={`menu-item ${currentPath === '/products/list' ? 'active' : ''}`}>
            <a href="/products/list" className="menu-link">
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