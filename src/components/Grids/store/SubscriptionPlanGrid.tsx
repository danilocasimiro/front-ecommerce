import React, { useEffect, useState } from 'react';
import SubscriptionPlanModalGrid from './SubscriptionPlanModalGrid';
import Money from '@/components/Formatters/Money';

interface subscriptionPlans {
  id: number | undefined;
  name: string;
  description: string;
  activation_months: number;
  price: number;
}

export default function SubscriptionPlanGrid({ subscriptionPlans }: { subscriptionPlans: subscriptionPlans[] }) {
  const [expirationDates, setExpirationDates] = useState<string[]>([]);

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

  const [currentSubscriptionPlan, setCurrentSubscriptionPlan] = useState({
    id: 0,
    name: '',
    description: '',
    activation_months: 0,
    price: 0
  });
  
  const handleSubscriptionPlanData = async (subscriptionPlan: subscriptionPlans) => {
    setCurrentSubscriptionPlan({
      id: subscriptionPlan?.id || 0,
      name: subscriptionPlan?.name || '',
      description: subscriptionPlan?.description || '',
      activation_months: subscriptionPlan?.activation_months || 0,
      price: subscriptionPlan?.price || 0.00,
    });
  };

  return (
    <>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
          <div className="card overflow-hidden">
            <div className="pb-sm-5 pb-2 rounded-top">
              <div className="container py-5">
                <h2 className="text-center mb-2 mt-0 mt-md-4">Escolha o plano certo para você</h2>
                <p className="text-center pb-3"> Comece conosco - é perfeito para indivíduos e equipes. Escolha um plano de assinatura que atenda às suas necessidades. </p>
                <div className="row mx-0 gy-3 px-lg-5">
                  {subscriptionPlans?.map((subscriptionPlan, index) => (
                    <>
                      <div className="col-lg mb-md-0 mb-4">
                        <SubscriptionPlanModalGrid subscriptionPlan={subscriptionPlan} currentSubscriptionPlan={currentSubscriptionPlan} />
                        <div className="card border rounded shadow-none">
                          <div className="card-body">
                            <div className="my-3 pt-2 text-center">
                              <img src="../../assets/img/icons/unicons/bookmark.png" alt="Starter Image" height="80" />
                            </div>
                            <h3 className="card-title text-center text-capitalize mb-1">{subscriptionPlan.name}</h3>
                            <p className="text-center">{subscriptionPlan.description}</p>
                            <div className="text-center">
                              <div className="d-flex justify-content-center">
                                <sup className="h6 pricing-currency mt-3 mb-0 me-1 text-primary">R$</sup>
                                <h1 className="display-4 mb-0 text-primary">{<Money value={subscriptionPlan.price} />}</h1>
                                <sub className="h6 pricing-duration mt-auto mb-2 text-muted fw-normal">/month</sub>
                              </div>
                            </div>

                            <ul className="ps-3 my-4 list-unstyled">
                              <li className="mb-2"><span className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i className="bx bx-check bx-xs"></i></span> 100 responses a month</li>
                              <li className="mb-2"><span className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i className="bx bx-check bx-xs"></i></span> Unlimited forms and surveys</li>
                              <li className="mb-2"><span className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i className="bx bx-check bx-xs"></i></span> Unlimited fields</li>
                              <li className="mb-2"><span className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i className="bx bx-check bx-xs"></i></span> Basic form creation tools</li>
                              <li className="mb-0"><span className="badge badge-center w-px-20 h-px-20 rounded-pill bg-label-primary me-2"><i className="bx bx-check bx-xs"></i></span> Up to 2 subdomains</li>
                            </ul>

                            <div className="card-footer text-muted">
                              Valido até {expirationDates[index]}
                            </div>

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
                        </div>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-backdrop fade"></div>
      </div>
    </>
  );
};
