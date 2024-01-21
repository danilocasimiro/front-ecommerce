import ApiService from "@/services/ApiService";
import { useSession } from 'next-auth/react';
import Money from "../Formatters/Money";

interface SubscriptionPlan {
  id: number;
  name: string;
  description: string;
  activation_months: number;
  price: number;
}

export default function SubscriptionPlanGrid({ subscriptionPlans }: { subscriptionPlans: SubscriptionPlan[] }) {
  const { data: session } = useSession();

  const handleDelete = async (subscriptionPlanId: number) => {
    const userConfirmed = window.confirm('Você realmente deseja excluir este plano?');
    
    if (userConfirmed) {
      const apiService = new ApiService(session!.token);
      try {
        await apiService.deleteSubscriptionPlan(subscriptionPlanId);

        window.location.reload();
      } catch (error: any) {
        console.error(`Erro ao excluir plano: ${error.message}`);
      }
    }
  };

  return (
    <>
      <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Planos /</span> Listar</h4>

      <div className="card">
        <h5 className="card-header">Empresas</h5>
        <div className="table-responsive text-nowrap">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Meses de ativação</th>
                <th>Preço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {subscriptionPlans?.map(subscriptionPlan => (
                <tr key={subscriptionPlan.id}>
                  <td style={{ color: '#697a8d' }}>{subscriptionPlan.name}</td>
                  <td style={{ color: '#697a8d' }}>{subscriptionPlan.description}</td>
                  <td style={{ color: '#697a8d' }}>{subscriptionPlan.activation_months}</td>
                  <td style={{ color: '#697a8d' }}><Money value={subscriptionPlan.price} /></td>
                  <td>
                    <div className="dropdown">
                      <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                        <i className="bx bx-dots-vertical-rounded"></i>
                      </button>
                      <div className="dropdown-menu">
                        <a className="dropdown-item" href={`/product-types/${subscriptionPlan.id}`}>
                        <i className="bx bx-edit-alt me-1"></i> Edit</a>
                        <a className="dropdown-item" href='#'onClick={() => handleDelete(subscriptionPlan.id)}>
                        <i className="bx bx-trash me-1"></i> Delete</a>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};