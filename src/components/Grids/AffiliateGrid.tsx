import ApiService from "@/services/ApiService";
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

interface Affiliate {
  id: number;
  name: string;
  companies: [
    company: {
      name: string
    }
  ]
}

export default function AffiliateGrid({ affiliates }: { affiliates: Affiliate[] }) {
  const { data: session } = useSession();

  const handleDelete = async (affiliateId: number) => {
    const userConfirmed = window.confirm('Você realmente deseja excluir este afiliado?');
    if (userConfirmed) {
      const apiService = new ApiService(session!.token);
      try {
        await apiService.deleteAffiliate(affiliateId);

        window.location.reload();
      } catch (error: any) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <>
      <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Colaboradores /</span> Listar</h4>

      <div className="card">
        <h5 className="card-header">Colaboradores</h5>
        <div className="table-responsive text-nowrap">
          {affiliates.length ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {affiliates?.map(affiliate => (
                  <tr key={affiliate.id}>
                    <td style={{ color: '#697a8d' }}>{affiliate.name}</td>
                    <td>
                      <div className="dropdown">
                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                          <i className="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href={`/affiliates/${affiliate.id}`}>
                            <i className="bx bx-edit-alt me-1"></i> Edit</a>
                          <a className="dropdown-item" href='#' onClick={() => handleDelete(affiliate.id)}>
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