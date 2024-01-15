import ApiService from '../../services/ApiService';
import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

interface Profile {
  id: number,
  name: string,
  user: {
    email_address: string
  }
}

export default function ProfileForm({ profile }: { profile: Profile | null | undefined }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [apiService, setApiService] = useState<ApiService | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    user: {
      email_address: ''
    }
  });

  useEffect(() => {
    if (session) {
      const api = new ApiService(session.token);
      setApiService(api);
    }
  }, [session]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile?.name || '',
        user: {
          email_address: profile?.user?.email_address || ''
        }
      });
    }
  }, [profile]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setFormData((prevData) => ({
      ...prevData,
      name: value,
    }));
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setFormData((prevData) => ({
      ...prevData,
      user: {
        email_address: value
      }
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (apiService && profile) {
        await apiService.updateProfile(profile.id, formData);
        router.push('/profiles/' + profile.id);
      }

    } catch (error) {
      console.error('Erro ao enviar dados para a API:', error);
    }
  };

  if (!session) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Perfil/</span> Usuário</h4>
      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Dados do usuário</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-profile">Nome</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-profile" className="input-group-text"
                      ><i className="bx bx-buildings"></i></span>
                      <input
                        type="text"
                        id="basic-icon-default-profile"
                        className="form-control"
                        placeholder="Eletrônicos"
                        value={formData.name}
                        onChange={handleNameChange}
                        aria-label="Eletrônicos"
                        aria-describedby="basic-icon-default-profile"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="exampleFormControlSelect1" className="col-sm-2 col-form-label">Email</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-profile" className="input-group-text"
                      ><i className="bx bx-buildings"></i></span>
                      <input
                        type="email"
                        id="basic-icon-default-profile"
                        className="form-control"
                        placeholder="Eletrônicos"
                        value={formData.user.email_address}
                        onChange={handleEmailChange}
                        aria-label="email@example.com"
                        aria-describedby="basic-icon-default-profile"
                      />
                    </div>
                  </div>
                </div>

                <div className="row justify-content-end">
                  <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary">Enviar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};