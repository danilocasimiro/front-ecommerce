import ApiService from '../../services/ApiService';
import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

interface Tenant {
  id: number,
  name: string,
  user: {
    email_address: string,
    password: string
  }
}

export default function TenantForm({ tenant }: { tenant: Tenant | null | undefined }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [apiService, setApiService] = useState<ApiService | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    user: {
      email_address: '',
      password: ''
    }
  });

  useEffect(() => {
    if (session) {
      const api = new ApiService(session.token);
      setApiService(api);
    }
  }, [session]);

  useEffect(() => {
    if (tenant) {
      setFormData({
        name: tenant?.name || '',
        user: {
          email_address: tenant?.user?.email_address || '',
          password: tenant?.user?.password || ''
        }
      });
    }
  }, [tenant]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setFormData((prevData) => ({
      ...prevData,
      name: value,
    }));
  };

  const handleChange = (fieldName: string) => ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      user: {
        ...prevData.user,
        [fieldName]: value
      }
    }));
  };

  const handleEmailChange = handleChange('email_address');
  const handlePasswordChange = handleChange('password');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (apiService && tenant) {
        await apiService.updateTenant(tenant.id, formData);
      } else if (apiService ) {
        await apiService.storeTenant(formData);
      }
      router.push('/tenants/lists');
    } catch (error) {
      console.error('Erro ao enviar dados para a API:', error);
    }
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
                <h5 className="mb-0">Dados do usuário</h5>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-tenant">Nome</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-tenant" className="input-group-text"
                      ><i className="bx bx-buildings"></i></span>
                      <input
                        type="text"
                        id="basic-icon-default-tenant"
                        className="form-control"
                        placeholder="Eletrônicos"
                        value={formData.name}
                        onChange={handleNameChange}
                        aria-label="Eletrônicos"
                        aria-describedby="basic-icon-default-tenant"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="exampleFormControlSelect1" className="col-sm-2 col-form-label">Email</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-tenant" className="input-group-text"
                      ><i className="bx bx-buildings"></i></span>
                      <input
                        type="email"
                        id="basic-icon-default-tenant"
                        className="form-control"
                        placeholder="Eletrônicos"
                        value={formData.user.email_address}
                        onChange={handleEmailChange}
                        aria-label="email@example.com"
                        aria-describedby="basic-icon-default-tenant"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="exampleFormControlSelect1" className="col-sm-2 col-form-label">Senha</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-tenant" className="input-group-text"
                      ><i className="bx bx-buildings"></i></span>
                      <input
                        type="password"
                        id="basic-icon-default-tenant"
                        className="form-control"
                        placeholder=""
                        onChange={handlePasswordChange}
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