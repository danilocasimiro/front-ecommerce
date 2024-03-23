import { useRouter } from 'next/router';

export default function AdminLeftMenu() {
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <>
      <li className={`menu-item ${currentPath.startsWith('/tenants') ? 'active open' : ''}`}>
        <a href="#" className="menu-link menu-toggle">
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Layouts">Clientes</div>
        </a>

        <ul className="menu-sub">
          <li className={`menu-item ${currentPath === '/tenants/new' ? 'active' : ''}`}>
            <a href="/tenants/new" className="menu-link">
              <div data-i18n="Without menu">Criar</div>
            </a>
          </li>
          <li className={`menu-item ${currentPath === '/tenants/list' ? 'active' : ''}`}>
            <a href="/tenants/list" className="menu-link">
              <div data-i18n="Without navbar">Listar</div>
            </a>
          </li>
        </ul>
      </li>
      <li className={`menu-item ${currentPath.startsWith('/subscription-plans') ? 'active open' : ''}`}>
        <a href="#" className="menu-link menu-toggle">
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Layouts">Planos</div>
        </a>
        <ul className="menu-sub">
          <li className={`menu-item ${currentPath === '/subscription-plans/new' ? 'active' : ''}`}>
            <a href="/subscription-plans/new" className="menu-link">
              <div data-i18n="Without menu">Criar</div>
            </a>
          </li>
          <li className={`menu-item ${currentPath === '/subscription-plans/list' ? 'active' : ''}`}>
            <a href="/subscription-plans/list" className="menu-link">
              <div data-i18n="Without navbar">Listar</div>
            </a>
          </li>
        </ul>
      </li>
      <li className={`menu-item ${currentPath.startsWith('/subscriptions') ? 'active open' : ''}`}>
        <a href="#" className="menu-link menu-toggle">
          <i className="menu-icon tf-icons bx bx-layout"></i>
          <div data-i18n="Layouts">Assinaturas</div>
        </a>
        <ul className="menu-sub">
          <li className={`menu-item ${currentPath === '/subscriptions/list' ? 'active' : ''}`}>
            <a href="/subscriptions/list" className="menu-link">
              <div data-i18n="Without navbar">Listar</div>
            </a>
          </li>
        </ul>
      </li>
      <li className={`menu-item ${currentPath.startsWith('/templates') ? 'active open' : ''}`}>
        <a href="#" className="menu-link menu-toggle">
          <i className="menu-icon tf-icons bx bx-lock-open-alt"></i>
          <div className="text-truncate" data-i18n="Templates">Templates</div>
        </a>
        <ul className="menu-sub">
          <li className={`menu-item ${currentPath.startsWith('/templates/emails') ? 'active open' : ''}`}>
            <a href="#" className="menu-link menu-toggle">
              <div className="text-truncate" data-i18n="Login">Emails</div>
            </a>
            <ul className="menu-sub">
              <li className={`menu-item ${currentPath === '/templates/emails/list' ? 'active' : ''}`}>
                <a href="/templates/emails/list" className="menu-link">
                  <div className="text-truncate" data-i18n="Basic">Listar</div>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </>
  )
}