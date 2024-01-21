import Image from 'next/image'
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';
import Date from '../Formatters/Date';

export default function NavBar() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const currentPath = router.pathname;

  const handleLogout = async () => {
    if (session) {
      await signOut({ redirect: false }).then(() => {
        router.push("/login");
      });
    }
  };

  const handleCompanyLogout = async () => {
    signIn("credentials", { 
      callbackUrl: '/dashboard', 
      jwt_token: session!.token, 
      email_address: session!.user.email_address,
      name: session!.user.name,
      type: session!.user.type,
      expiration_date: session!.user.expiration_date,
      company_id: '',
      company_name: '',
      subscription_status: session!.user.subscription_status,
      id: session!.user.id,
      friendly_id: session!.user.friendly_id,
    } )
  };

  if (status === 'loading') {
    return <div>Carregando...</div>;
  }
  if (!session) {
    router.push('/login');
    return null;
  }
  
  const { user } = session;

  return (
    <>
      <nav
        className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
        id="layout-navbar"
      >
        <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 d-xl-none">
          <a className="nav-item nav-link px-0 me-xl-4" href="#">
            <i className="bx bx-menu bx-sm"></i>
          </a>
        </div>

        <div className="navbar-nav-right d-flex align-items-center" id="navbar-collapse">
          { user.company_name != 'undefined' && user.company_name && currentPath != '/subscription-plans/list' && (
            <>
              <p className="mt-3" style={{ marginRight: '2rem' }}>{user.company_name}</p>
              <button type="button" className="btn btn-danger ml-3" onClick={handleCompanyLogout}>Deslogar</button>
            </>
          )}
          { user.type != 'Admin' && user.expiration_date && currentPath != '/subscription-plans/list' && (
            <p className="mt-3" style={{ marginLeft: '2rem' }}>Sua conta expira em: <Date date={user.expiration_date}/></p>
          )}
          <ul className="navbar-nav flex-row align-items-center ms-auto">
            <li className="nav-item navbar-dropdown dropdown-user dropdown">
              <a className="nav-link dropdown-toggle hide-arrow" href="#" data-bs-toggle="dropdown">
                <div className="avatar avatar-online">
                  <Image
                    src="/avatars/1.png"
                    alt="Vercel Logo"
                    className="w-px-40 h-auto rounded-circle"
                    width={70}
                    height={60}
                    priority
                  />
                </div>
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="#">
                    <div className="d-flex">
                      <div className="flex-shrink-0 me-3">
                        <div className="avatar avatar-online">
                          <Image
                            src="/avatars/1.png"
                            alt="Vercel Logo"
                            className="w-px-40 h-auto rounded-circle"
                            width={70}
                            height={60}
                            priority
                          />
                        </div>
                      </div>
                      <div className="flex-grow-1">
                        <span className="fw-semibold d-block">{user.name}</span>
                        <small className="text-muted">{user.type}</small>
                      </div>
                    </div>
                  </a>
                </li>
                <li>
                  <div className="dropdown-divider"></div>
                </li>
                <li>
                  <a className="dropdown-item" href={`/profiles/${user.id}`}>
                    <i className="bx bx-user me-2"></i>
                    <span className="align-middle">Meu perfil</span>
                  </a>
                </li>
                { user.type == 'Tenant' && (
                <li>
                  <a className="dropdown-item" href="/subscriptions/list">
                    <i className="bx bx-cog me-2"></i>
                    <span className="align-middle">Minhas assinaturas</span>
                  </a>
                </li>
                ) }
                <li>
                  <a className="dropdown-item" href="#">
                    <i className="bx bx-cog me-2"></i>
                    <span className="align-middle">Configuraçôes</span>
                  </a>
                </li>
                <li>
                  <div className="dropdown-divider"></div>
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={handleLogout}>
                    <i className="bx bx-power-off me-2"></i>
                    <span className="align-middle">Sair</span>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}