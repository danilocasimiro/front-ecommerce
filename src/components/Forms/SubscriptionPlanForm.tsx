import ApiService from '../../services/ApiService';
import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

interface SubscriptionPlan {
  id: number,
  name: string,
  description: string,
  activation_months: number,
  price: number
}

export default function SubscriptionPlanForm({ subscriptionPlan }: { subscriptionPlan: SubscriptionPlan | null | undefined }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [apiService, setApiService] = useState<ApiService | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    activation_months: 1,
    price: 0
  });

  useEffect(() => {
    if (session) {
      const api = new ApiService(session.token);
      setApiService(api);
    }
  }, [session]);

  useEffect(() => {
    if (subscriptionPlan) {
      setFormData({
        name: subscriptionPlan?.name || '',
        description: subscriptionPlan?.description || '',
        activation_months: subscriptionPlan?.activation_months || 0,
        price: subscriptionPlan?.price || 0
      });
    }
  }, [subscriptionPlan]);

  const handleChange = (fieldName: string) => ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
        [fieldName]: value
    }));
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const numericValue = parseFloat(value.replace(/[^\d]/g, ''));
  
    if (!isNaN(numericValue)) {
      setFormData((prevData) => ({
        ...prevData,
        price: numericValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        price: prevData.price || 0,
      }));
    }
  };

  const handleNameChange = handleChange('name');
  const handleDescriptionChange = handleChange('description');
  const handleActivationMonthsChange = handleChange('activation_months');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (apiService && subscriptionPlan) {
        await apiService.updateSubscriptionPlan(subscriptionPlan.id, formData);
      } else if (apiService ) {
        await apiService.storeSubscriptionPlan(formData);
      }
      router.push('/subscription-plans/list');
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  if (!session) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Planos/</span> Criar</h4>
      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <form onSubmit={handleSubmit}>
              <div className="card-header d-flex align-items-center justify-content-between">
                <h5 className="mb-0">Dados do usuário</h5>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-subscription-plan">Nome</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-subscription-plan" className="input-group-text"
                      ><i className="bx bx-buildings"></i></span>
                      <input
                        type="text"
                        id="basic-icon-default-subscription-plan"
                        className="form-control"
                        placeholder="Eletrônicos"
                        value={formData.name}
                        onChange={handleNameChange}
                        aria-label="Eletrônicos"
                        aria-describedby="basic-icon-default-subscription-plan"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="exampleFormControlSelect1" className="col-sm-2 col-form-label">Descrição</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-subscription-plan" className="input-group-text"
                      ><i className="bx bx-buildings"></i></span>
                      <input
                        type="text"
                        id="basic-icon-default-subscription-plan"
                        className="form-control"
                        placeholder="Eletrônicos"
                        value={formData.description}
                        onChange={handleDescriptionChange}
                        aria-label="email@example.com"
                        aria-describedby="basic-icon-default-subscription-plan"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="exampleFormControlSelect1" className="col-sm-2 col-form-label">Meses de ativação</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-subscription-plan" className="input-group-text"
                      ><i className="bx bx-buildings"></i></span>
                      <input
                        type="number"
                        id="basic-icon-default-subscription-plan"
                        className="form-control"
                        placeholder="0"
                        value={formData.activation_months}
                        onChange={handleActivationMonthsChange}
                        aria-label="email@example.com"
                        aria-describedby="basic-icon-default-subscription-plan"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="exampleFormControlSelect1" className="col-sm-2 col-form-label">Preço</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-subscription-plan" className="input-group-text"
                      ><i className="bx bx-buildings"></i></span>
                      <input
                        type="text"
                        id="basic-icon-default-subscription-plan"
                        className="form-control"
                        value={new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(formData.price / 100)}
                        onChange={handleAmountChange}
                        aria-describedby="basic-icon-default-subscription-plan"
                      />
                    </div>
                  </div>
                </div>
                <div className="row justify-content-end">
                  <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary">Enviar</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div >
    </>
  );
};