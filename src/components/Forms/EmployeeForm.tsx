import ApiService from '../../services/ApiService';
import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

interface Employee {
  id: number,
  name: string,
  employable_type: string,
  employable_id: string,
  employable: {
    name: string
  }
}

export default function EmployeeForm({ employee }: { employee: Employee | null | undefined }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [options, setOptions] = useState<{ name: string; id: string }[]>([]);
  const [apiService, setApiService] = useState<ApiService | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    employable_id: ''
  });

  const fetchData = async (api: ApiService) => {
    try {
      const response = await api.fetchCompanies();
      setOptions(response.data);
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
        employable_id: employee?.employable_id || ''
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
      } else if (apiService ) {
        await apiService.storeEmployee(formData);
      }
      router.push('/employees/lists');
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  if (!session) {
    return <div>Carregando...</div>;
  }

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;

    setFormData((prevData) => ({
      ...prevData,
      employable_id: value,
    }));
  };

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
                  <label htmlFor="exampleFormControlSelect1" className="col-sm-2 col-form-label">Empresa</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <select
                        className="form-select"
                        id="exampleFormControlSelect1"
                        aria-label="Default select example"
                        value={formData.employable_id}
                        onChange={handleSelectChange}
                      >
                        <option value="">Acesso a todas as empresas...</option>
                        {options.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
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