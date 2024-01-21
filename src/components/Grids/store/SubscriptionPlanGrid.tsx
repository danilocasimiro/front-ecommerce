import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Money from '../../Formatters/Money';
import ApiService from "@/services/ApiService";
import { useSession } from 'next-auth/react';

interface subscriptionPlans {
  id: number | undefined;
  name: string;
  description: string;
  activation_months: number;
  price: number;
}

export default function SubscriptionPlanGrid({ subscriptionPlans }: { subscriptionPlans: subscriptionPlans[] }) {
  const [expirationDates, setExpirationDates] = useState<string[]>([]);
  const { data: session } = useSession();
  const [currentSubscriptionPlan, setCurrentSubscriptionPlan] = useState({
    id: 0,
    name: '',
    description: '',
    activation_months: 0,
    price: 0
  });

  useEffect(() => {
    const fetchExpirationDates = async () => {
      const dates = await Promise.all(
        subscriptionPlans.map(async (subscriptionPlan) => {
          const currentDate = new Date();
          const expirationDate = new Date(currentDate);

          expirationDate.setMonth(expirationDate.getMonth() + subscriptionPlan.activation_months);

          return expirationDate.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          });
        })
      );

      setExpirationDates(dates);
    };

    fetchExpirationDates();
  }, [subscriptionPlans]);

  const handleSubscriptionPlanData = async (subscriptionPlan: subscriptionPlans) => {
    setCurrentSubscriptionPlan({
      id: subscriptionPlan?.id || 0,
      name: subscriptionPlan?.name || '',
      description: subscriptionPlan?.description || '',
      activation_months: subscriptionPlan?.activation_months || 0,
      price: subscriptionPlan?.price || 0.00,
    });
  };

  const handleSubmitSubscription = async (status: string) => {
    const apiService = new ApiService(session!.token);
    try {
      await apiService.storeSubscription({
        subscription_plan_id: currentSubscriptionPlan.id,
        status: status
      });

      window.location.reload();
    } catch (error: any) {
      console.error(`Erro ao excluir assinatura: ${error.message}`);
    }
  };

  return (
    <>
      <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Planos</span></h4>
      <div className="row mb-5">
        {subscriptionPlans?.map((subscriptionPlan, index) => (
          <div key={subscriptionPlan.id} className="col-md-6 col-lg-4 mb-3">
            <div className="card text-center">
              <div className="card-header">Plano</div>
              <div className="card-body">
                <h5 className="card-title">{subscriptionPlan.name}</h5>
                <p className="card-text">{subscriptionPlan.description}</p>
                <p className="card-text"><Money value={subscriptionPlan.price} /></p>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#exLargeModal"
                  onClick={() => handleSubscriptionPlanData(subscriptionPlan)}
                >
                  Comprar
                </button>
              </div>
              <div className="card-footer text-muted">
                Até {expirationDates[index]}
              </div>
            </div>
            <div className="modal fade" id="exLargeModal" tabIndex={-1} aria-hidden="true">
              <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel4">Carrinho</h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="row g-3">
                      <div className="col-xl-6">
                        <div className="nav-align-top mb-4">
                          <div className="col-md mb-4 mb-md-0">
                            <small className="text-light fw-semibold">Forma de pagamento</small>
                            <div className="accordion mt-3" id="accordionExample">
                              <div className="card accordion-item active">
                                <h2 className="accordion-header" id="headingOne">
                                  <button
                                    type="button"
                                    className="accordion-button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#accordionOne"
                                    aria-expanded="true"
                                    aria-controls="accordionOne"
                                  >
                                    Boleto
                                    <Image
                                      src="/img/boleto-icon.png"
                                      alt="Vercel Logo"
                                      className="w-px-40 h-auto rounded-circle"
                                      width={70}
                                      height={60}
                                      priority
                                      style={{ marginLeft: '1rem' }}
                                    />
                                  </button>
                                </h2>

                                <div
                                  id="accordionOne"
                                  className="accordion-collapse collapse show"
                                  data-bs-parent="#accordionExample"
                                >
                                  <div className="accordion-body">
                                    <p>Será enviado o boleto para pagamento em seu email</p>
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      onClick={() => handleSubmitSubscription('pending')}
                                    >
                                      Enviar
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="card accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                  <button
                                    type="button"
                                    className="accordion-button collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#accordionTwo"
                                    aria-expanded="false"
                                    aria-controls="accordionTwo"
                                  >
                                    Pix
                                    <Image
                                      src="/img/pix-icon.png"
                                      alt="Vercel Logo"
                                      className="w-px-40 h-auto rounded-circle"
                                      width={70}
                                      height={60}
                                      priority
                                      style={{ marginLeft: '1rem' }}
                                    />
                                  </button>
                                </h2>
                                <div
                                  id="accordionTwo"
                                  className="accordion-collapse collapse"
                                  aria-labelledby="headingTwo"
                                  data-bs-parent="#accordionExample"
                                >
                                  <div className="accordion-body">
                                    <p>Este é o código pix, a aprovação ocorrerá em minutos.</p>
                                    <p>00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426655440000 5204000053039865802BR5913Fulano de Tal6008BRASILIA62070503***63041D3D</p>
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      onClick={() => handleSubmitSubscription('active')}
                                    >
                                      Concluir pedido
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="card accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                  <button
                                    type="button"
                                    className="accordion-button collapsed"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#accordionThree"
                                    aria-expanded="false"
                                    aria-controls="accordionThree"
                                  >
                                    Cartão de crédito
                                    <div className="icons">
                                      <img src="https://i.imgur.com/2ISgYja.png" width="30" />
                                      <img src="https://i.imgur.com/W1vtnOV.png" width="30" />
                                      <img src="https://i.imgur.com/35tC99g.png" width="30" />
                                      <img src="https://i.imgur.com/2ISgYja.png" width="30" />
                                    </div>
                                  </button>
                                </h2>
                                <div
                                  id="accordionThree"
                                  className="accordion-collapse collapse"
                                  aria-labelledby="headingThree"
                                  data-bs-parent="#accordionExample"
                                >
                                  <div className="accordion-body">
                                    <div className="card-body payment-card-body">
                                      <span className="font-weight-normal card-text">Número do cartão</span>
                                      <div className="input">
                                        <i className="fa fa-credit-card"></i>
                                        <input type="text" className="form-control" placeholder="0000 0000 0000 0000" />
                                      </div>
                                      <div className="row mt-3 mb-3">
                                        <div className="col-md-6">
                                          <span className="font-weight-normal card-text">Data de expiração</span>
                                          <div className="input">
                                            <i className="fa fa-calendar"></i>
                                            <input type="text" className="form-control" placeholder="MM/YY" />
                                          </div>
                                        </div>
                                        <div className="col-md-6">
                                          <span className="font-weight-normal card-text">CVC/CVV</span>
                                          <div className="input">
                                            <i className="fa fa-lock"></i>
                                            <input type="text" className="form-control" placeholder="000" />
                                          </div>
                                        </div>
                                      </div>
                                      <span className="text-muted certificate-text"><i className="fa fa-lock"></i> Your transaction is secured with ssl certificate</span>
                                    </div>
                                    <button
                                      type="button"
                                      className="btn btn-primary"
                                      onClick={() => handleSubmitSubscription('active')}
                                    >
                                      Concluir pedido
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-6">
                      <small className="text-light fw-semibold">Resumo do pedido</small>
                        <div className="card mt-3">
                          <div className="d-flex justify-content-between p-3">
                            <div className="d-flex flex-column">
                              <span>Produtos</span>
                            </div>
                          </div>
                          <hr className="mt-0 line" />
                          <div className="p-3">
                            <div className="d-flex justify-content-between mb-2">
                              <span>{currentSubscriptionPlan.name}</span>
                              <span><Money value={currentSubscriptionPlan.price}/></span>
                            </div>
                          </div>
                          <hr className="mt-0 line" />
                          <div className="p-3 d-flex justify-content-between">
                            <div className="d-flex flex-column">
                              <span>Total a pagar: </span>
                            </div>
                            <span><Money value={currentSubscriptionPlan.price}/></span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div >
    </>
  );
};
