import ApiService from '../../services/ApiService';
import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

interface User {
  email_address: string,
  password: string
}
interface Affiliate {
  id: number,
  name: string,
  user: User,
}

export default function AffiliateForm({ affiliate }: { affiliate: Affiliate | null | undefined }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [apiService, setApiService] = useState<ApiService | null>(null);
  const [formData, setFormData] = useState<{ name: string, user: User }>({
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
    if (affiliate) {
      setFormData({
        name: affiliate?.name || '',
        user: {
          email_address: affiliate?.user?.email_address || '',
          password: affiliate?.user?.password || ''
        }
      });
    }
  }, [affiliate]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setFormData((prevData) => ({
      ...prevData,
      name: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (apiService && affiliate) {
        await apiService.updateAffiliate(affiliate.id, formData);
      } else if (apiService) {
        await apiService.storeAffiliate(formData);
      }
      router.push('/affiliates/list');
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
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

  return (
    <>
      <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Afiliados/</span> Criar</h4>
      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <form onSubmit={handleSubmit}>
              <div className="card-header d-flex align-items-center justify-content-between">
                <h5 className="mb-0">Dados do afiliado</h5>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-affiliate">Nome</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-affiliate" className="input-group-text"
                      ><i className="bx bx-buildings"></i></span>
                      <input
                        type="text"
                        id="basic-icon-default-affiliate"
                        className="form-control"
                        placeholder="Eletrônicos"
                        value={formData.name}
                        onChange={handleNameChange}
                        aria-label="Eletrônicos"
                        aria-describedby="basic-icon-default-affiliate"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-affiliate">Email</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-affiliate" className="input-group-text"
                      ><i className="bx bx-buildings"></i></span>
                      <input
                        type="email"
                        id="basic-icon-default-affiliate"
                        className="form-control"
                        placeholder="Eletrônicos"
                        value={formData.user.email_address}
                        onChange={handleEmailChange}
                        aria-label="Eletrônicos"
                        aria-describedby="basic-icon-default-affiliate"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-affiliate">Password</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-affiliate" className="input-group-text"
                      ><i className="bx bx-buildings"></i></span>
                      <input
                        type="password"
                        id="basic-icon-default-affiliate"
                        className="form-control"
                        placeholder="Eletrônicos"
                        onChange={handlePasswordChange}
                        aria-label="Eletrônicos"
                        aria-describedby="basic-icon-default-affiliate"
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
        </div >
      </div >
    </>
  );
};