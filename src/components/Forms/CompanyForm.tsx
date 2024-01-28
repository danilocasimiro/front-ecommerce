import ApiService from '../../services/ApiService';
import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

interface Company {
  id: string,
  name: string,
  address: {
    street: string,
    number: string,
    neighborhood: string,
    city: string,
    state: string,
    zip_code: string,
  }
}

export default function CompanyForm({ company }: { company: Company | null | undefined }) {
  const { data: session } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    address: {
      street: '',
      number: '',
      neighborhood: '',
      city: '',
      state: '',
      zip_code: ''
    }
  });

  useEffect(() => {
    if (company) {
      setFormData({
        name: company?.name || '',
        address: {
          street: company?.address?.street || '',
          number: company?.address?.number || '',
          neighborhood: company?.address?.neighborhood || '',
          city: company?.address?.city || '',
          state: company?.address?.state || '',
          zip_code: company?.address?.zip_code || '',
        } 
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

  const handleAddressChange = (fieldName: string) => ({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [fieldName]: value
      }
    }));
  };

  const handleStreetChange = handleAddressChange('street');
  const handleNumberChange = handleAddressChange('number');
  const handleNeightborhoodChange = handleAddressChange('neighborhood');
  const handleCityChange = handleAddressChange('city');
  const handleStateChange = handleAddressChange('state');
  const handleZipCodeChange = handleAddressChange('zip_code');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiService = new ApiService(session!.token);

    try {
      if (company) {
        await apiService.updateCompany(company.id, formData);
      } else {
        await apiService.storeCompany(formData);
      }
      window.location.reload();
    } catch (error: any) {
      window.location.reload();
    }
  };

  return (
    <>
      <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Empresa/</span> Nova</h4>

      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <form onSubmit={handleSubmit}>
              <div className="card-header d-flex align-items-center justify-content-between">
                <h5 className="mb-0">Formulário de cadastro</h5>
              </div>
              <div className="card-body">
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
              </div>
              <div className="card-header d-flex align-items-center justify-content-between">
                <h5 className="mb-0">Dados de endereço</h5>
              </div>
              <div className="card-body">
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-profile">Rua</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-profile" className="input-group-text"
                      ><i className="bx bx-buildings"></i></span>
                      <input
                        type="text"
                        id="basic-icon-default-profile"
                        className="form-control"
                        value={formData.address.street}
                        onChange={handleStreetChange}
                        aria-label="Eletrônicos"
                        aria-describedby="basic-icon-default-profile"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="exampleFormControlSelect1" className="col-sm-2 col-form-label">Número</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-profile" className="input-group-text"
                      ><i className="bx bx-buildings"></i></span>
                      <input
                        type="text"
                        id="basic-icon-default-profile"
                        className="form-control"
                        value={formData.address.number}
                        onChange={handleNumberChange}
                        aria-label="email@example.com"
                        aria-describedby="basic-icon-default-profile"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="exampleFormControlSelect1" className="col-sm-2 col-form-label">Bairro</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-profile" className="input-group-text"
                      ><i className="bx bx-buildings"></i></span>
                      <input
                        type="text"
                        id="basic-icon-default-profile"
                        className="form-control"
                        value={formData.address.neighborhood}
                        onChange={handleNeightborhoodChange}
                        aria-label="email@example.com"
                        aria-describedby="basic-icon-default-profile"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="exampleFormControlSelect1" className="col-sm-2 col-form-label">Cidade</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-profile" className="input-group-text"
                      ><i className="bx bx-buildings"></i></span>
                      <input
                        type="text"
                        id="basic-icon-default-profile"
                        className="form-control"
                        value={formData.address.city}
                        onChange={handleCityChange}
                        aria-label="email@example.com"
                        aria-describedby="basic-icon-default-profile"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="exampleFormControlSelect1" className="col-sm-2 col-form-label">Estado</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-profile" className="input-group-text"
                      ><i className="bx bx-buildings"></i></span>
                      <input
                        type="text"
                        id="basic-icon-default-profile"
                        className="form-control"
                        value={formData.address.state}
                        onChange={handleStateChange}
                        aria-label="email@example.com"
                        aria-describedby="basic-icon-default-profile"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="exampleFormControlSelect1" className="col-sm-2 col-form-label">CEP</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-profile" className="input-group-text"
                      ><i className="bx bx-buildings"></i></span>
                      <input
                        type="text"
                        id="basic-icon-default-profile"
                        className="form-control"
                        value={formData.address.zip_code}
                        onChange={handleZipCodeChange}
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};