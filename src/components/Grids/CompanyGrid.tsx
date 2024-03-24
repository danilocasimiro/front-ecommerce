import ApiService from "@/services/ApiService";
import { useSession, signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

interface Company {
  id: number;
  name: string;
}

export default function CompanyGrid({ companies }: { companies: Company[] }) {
  const { data: session } = useSession();

  const handleDelete = async (companyId: number) => {
    const userConfirmed = window.confirm('Você realmente deseja excluir esta empresa?');

    if (userConfirmed) {
      const apiService = new ApiService(session!.token);
      try {
        await apiService.deleteCompany(companyId);

        window.location.reload();
      } catch (error: any) {
        toast.error(error.response.data.error);
      }
    }
  };

  const handleSignIn = async (companyId: number) => {
    const userConfirmed = window.confirm('Você realmente deseja logar nesta empresa?');

    if (userConfirmed) {
      const apiService = new ApiService(session!.token);
      try {
        var response = await apiService.signInCompany(companyId);

        const decodedToken = JSON.parse(atob(response.data.split('.')[1]));

        signIn("credentials", {
          callbackUrl: '/dashboard',
          jwt_token: response.data,
          email_address: decodedToken.user.email_address,
          name: decodedToken.user.name,
          type: decodedToken.user.type,
          expiration_date: decodedToken.user.expiration_date,
          company_id: decodedToken.user.company_id,
          company_name: decodedToken.user.company_name,
          subscription_status: decodedToken.user.subscription_status,
          id: decodedToken.user.id,
          friendly_id: decodedToken.user.friendly_id,
          menu: JSON.stringify(decodedToken.user.menu)
        })

      } catch (error: any) {
        console.error(`Erro ao logar empresa: ${error.message}`);
      }
    }
  };

  return (
    <>
      <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Empresa /</span> Listar</h4>

      <div className="card">
        <h5 className="card-header">Empresas</h5>
        <div className="table-responsive text-nowrap">
          {companies.length ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {companies?.map(company => (
                  <tr key={company.id}>
                    <td style={{ color: '#697a8d' }}>{company.name}</td>
                    <td>
                      <div className="dropdown">
                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                          <i className="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href='#' onClick={() => handleSignIn(company.id)}>
                            <i className="bx bx-log-in me-1"></i> Logar</a>
                          <a className="dropdown-item" href={`/companies/${company.id}`}>
                            <i className="bx bx-edit-alt me-1"></i> Edit</a>
                          <a className="dropdown-item" href='#' onClick={() => handleDelete(company.id)}>
                            <i className="bx bx-trash me-1"></i> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center">
              <p>Não encontrado.</p>
            </div>
          )
          }
        </div>
      </div>
    </>
  );
};