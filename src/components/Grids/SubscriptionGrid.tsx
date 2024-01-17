import ApiService from "@/services/ApiService";
import { useSession } from 'next-auth/react';

interface Subscription {
  id: number;
  status: string;
  start_at: string;
  end_at: string;
  subscription_plan: {
    name: string;
    price: number;
  }
}

export default function SubscriptionGrid({ subscriptions }: { subscriptions: Subscription[] }) {
  const { data: session } = useSession();

  const handleDelete = async (subscriptionId: number) => {
    const userConfirmed = window.confirm('Você realmente deseja excluir esta assinatura?');
    
    if (userConfirmed) {
      const apiService = new ApiService(session!.token);
      try {
        // TODO not implement yet
        // await apiService.deleteSubscription(subscriptionId);

        window.location.reload();
      } catch (error: any) {
        console.error(`Erro ao excluir assinatura: ${error.message}`);
      }
    }
  };

  return (
    <>
      <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Tables /</span> Basic Tables</h4>

      <div className="card">
        <h5 className="card-header">Minhas Assinaturas</h5>
        <div className="table-responsive text-nowrap">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nome do plano</th>
                <th>Status</th>
                <th>Iniciou em</th>
                <th>Termina em</th>
                <th>Preço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {subscriptions?.map(subscription => (
                <tr key={subscription.id}>
                  <td style={{ color: '#697a8d' }}>{subscription.subscription_plan.name}</td>
                  <td style={{ color: '#697a8d' }}>{subscription.status}</td>
                  <td style={{ color: '#697a8d' }}>{subscription.start_at}</td>
                  <td style={{ color: '#697a8d' }}>{subscription.end_at}</td>
                  <td style={{ color: '#697a8d' }}>{subscription.subscription_plan.price}</td>
                  <td>
                    <div className="dropdown">
                      <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                        <i className="bx bx-dots-vertical-rounded"></i>
                      </button>
                      <div className="dropdown-menu">
                        <a className="dropdown-item" href={`/product-types/${subscription.id}`}>
                        <i className="bx bx-edit-alt me-1"></i> Edit</a>
                        <a className="dropdown-item" href='#'onClick={() => handleDelete(subscription.id)}>
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