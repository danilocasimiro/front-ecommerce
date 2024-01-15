import ApiService from '../../services/ApiService';
import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

interface Company {
  id: string,
  name: string
}

export default function CompanyForm({ company }: { company: Company | null | undefined }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    name: ''
  });

  useEffect(() => {
    if (company) {
      setFormData({
        name: company?.name || '',
      });
    }
  }, [company]);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setFormData((prevData) => ({
      ...prevData,
      name: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiService = new ApiService(session!.token);

    try {
      if (company) {
        await apiService.updateCompany(company.id, formData);
      } else {
        await apiService.storeCompany(formData);
      }

      router.push('/companies/list');
    } catch (error) {
      console.error('Erro ao enviar dados para a API:', error);
    }
  };

  return (
    <>
      <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Empresa/</span> Nova</h4>

      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Formulário de cadastro</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-company">Nome</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-company2" className="input-group-text"
                      ><i className="bx bx-buildings"></i></span>
                      <input
                        type="text"
                        id="basic-icon-default-company"
                        className="form-control"
                        placeholder="ACME Inc."
                        value={formData.name}
                        onChange={handleNameChange}
                        aria-label="ACME Inc."
                        aria-describedby="basic-icon-default-company2"
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