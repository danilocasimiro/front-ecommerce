import ApiService from '../../services/ApiService';
import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

interface Configuration {
  id: number,
  maintenance_mode: boolean,
  grace_period_days: number
}

export default function SystemConfigurationForm({ configuration }: { configuration: Configuration | null | undefined }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [apiService, setApiService] = useState<ApiService | null>(null);
  const [formData, setFormData] = useState({
    maintenance_mode: false,
    grace_period_days: 0
  });

  useEffect(() => {
    if (session) {
      const api = new ApiService(session.token);
      setApiService(api);
    }
  }, [session]);

  useEffect(() => {
    if (configuration) {
      setFormData({
        maintenance_mode: configuration?.maintenance_mode ?? true,
        grace_period_days: configuration?.grace_period_days || 0,
      });
    }
  }, [configuration]);

  const handleMaintenanceModeChange = () => {
    setFormData((prevData) => ({
      ...prevData,
      maintenance_mode: !prevData.maintenance_mode,
    }));
  };

  const handleGracePeriodDaysChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setFormData((prevData) => ({
      ...prevData,
      grace_period_days: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (apiService && configuration) {
        await apiService.updateSystemConfiguration(configuration.id, formData);

        router.push('/system-configurations/' + configuration.id);
      }
    } catch (error: any) {}
  };

  if (!session) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Clientes/</span> Criar</h4>
      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <form onSubmit={handleSubmit}>
              <div className="card-header d-flex align-items-center justify-content-between">
                <h5 className="mb-0">Dados das configurações</h5>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-tenant">Modo manutenção</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <div className="form-check form-switch mt-2">
                        <input className="form-check-input" 
                          type="checkbox" 
                          checked={formData.maintenance_mode}
                          onChange={handleMaintenanceModeChange}
                          id="flexSwitchCheckDefault" 
                        />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault"
                          >Ativo?</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="exampleFormControlSelect1" className="col-sm-2 col-form-label">Período de bloqueio após assinatura expirada</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-tenant" className="input-group-text"
                      ><i className="bx bx-buildings"></i></span>
                      <input
                        type="number"
                        id="basic-icon-default-tenant"
                        className="form-control"
                        placeholder="Eletrônicos"
                        value={formData.grace_period_days}
                        onChange={handleGracePeriodDaysChange}
                        aria-label="email@example.com"
                        aria-describedby="basic-icon-default-tenant"
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