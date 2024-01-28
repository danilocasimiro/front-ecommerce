import ApiService from '../../services/ApiService';
import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

interface User {
  email_address: string,
  password: string
}
interface Company {
  id: string,
  name: string
}
interface Employee {
  id: number,
  name: string,
  user: User,
  companies: Company[]
}

export default function EmployeeForm({ employee }: { employee: Employee | null | undefined }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [data, setData] = useState<{ companies: Company[] }>({ companies: [] });
  const [apiService, setApiService] = useState<ApiService | null>(null);
  const [formData, setFormData] = useState<{ name: string, user: User, companies: Company[] }>({
    name: '',
    user: {
      email_address: '',
      password: ''
    },
    companies: []
  });

  const fetchData = async (api: ApiService) => {
    try {
      const response = await api.fetchCompanies();
      const data = await response.data;

      setData({ companies: data });
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    if (session) {
      const api = new ApiService(session.token);
      setApiService(api);
      fetchData(api);
    }
  }, [session]);

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee?.name || '',
        user: {
          email_address: employee?.user?.email_address || '',
          password: employee?.user?.password || ''
        },
        companies: employee?.companies || []
      });
    }
  }, [employee]);

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
      if (apiService && employee) {
        await apiService.updateEmployee(employee.id, formData);
      } else if (apiService) {
        await apiService.storeEmployee(formData);
      }
      router.push('/employees/list');
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  const isCompanySelected = (companyId: string) => {
    return formData.companies.some((company) => company.id === companyId);
  };

  const handleCheckboxChange = (companyId: string) => {
    setFormData((prevFormData) => {
      const isCompanySelected = prevFormData.companies.some((company) => company.id === companyId);

      const updatedCompanies = isCompanySelected
        ? prevFormData.companies.filter((company) => company.id !== companyId)
        : [...prevFormData.companies, { id: companyId } as Company];

      return { ...prevFormData, companies: updatedCompanies };
    });
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
      <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Colaboradores/</span> Criar</h4>
      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <form onSubmit={handleSubmit}>
              <div className="card-header d-flex align-items-center justify-content-between">
                <h5 className="mb-0">Dados do colaborador</h5>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-employee">Nome</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-employee" className="input-group-text"
                      ><i className="bx bx-buildings"></i></span>
                      <input
                        type="text"
                        id="basic-icon-default-employee"
                        className="form-control"
                        placeholder="Eletrônicos"
                        value={formData.name}
                        onChange={handleNameChange}
                        aria-label="Eletrônicos"
                        aria-describedby="basic-icon-default-employee"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-employee">Email</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-employee" className="input-group-text"
                      ><i className="bx bx-buildings"></i></span>
                      <input
                        type="email"
                        id="basic-icon-default-employee"
                        className="form-control"
                        placeholder="Eletrônicos"
                        value={formData.user.email_address}
                        onChange={handleEmailChange}
                        aria-label="Eletrônicos"
                        aria-describedby="basic-icon-default-employee"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-employee">Password</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-employee" className="input-group-text"
                      ><i className="bx bx-buildings"></i></span>
                      <input
                        type="password"
                        id="basic-icon-default-employee"
                        className="form-control"
                        placeholder="Eletrônicos"
                        onChange={handlePasswordChange}
                        aria-label="Eletrônicos"
                        aria-describedby="basic-icon-default-employee"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="exampleFormControlSelect1" className="col-sm-2 col-form-label">Empresas</label>
                  <div className="col-sm-10">
                    <div className="col-md">
                      {data?.companies?.map((company: Company) => (
                        <div key={company.id} className="form-check mt-1">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={isCompanySelected(company.id)}
                            onChange={() => handleCheckboxChange(company.id)}
                            value={company.id}
                            id={company.id}
                          />
                          <label className="form-check-label" htmlFor="defaultCheck1"> {company.name} </label>
                        </div>
                      ))}
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