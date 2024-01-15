import * as React from 'react';
import { useRouter } from 'next/router';

export default function CompanyLeftMenu() {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <>
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
    </>
  )
}