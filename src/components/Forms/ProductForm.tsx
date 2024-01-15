import ApiService from '../../services/ApiService';
import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

interface Product {
  id: number,
  product_type_id: string,
  name: string,
  price: number
}

export default function ProductForm({ product }: { product: Product | null | undefined }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [apiService, setApiService] = useState<ApiService | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    product_type_id: '',
    price: 0.00
  });

  useEffect(() => {
    if (session) {
      const api = new ApiService(session.token);
      setApiService(api);
    }
  }, [session]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product?.name || '',
        product_type_id: product?.product_type_id || '',
        price: product?.price || 0.00,
      });
    }
  }, [product]);

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const numericValue = parseFloat(value.replace(/[^\d]/g, ''));
  
    if (!isNaN(numericValue)) {
      setFormData((prevData) => ({
        ...prevData,
        price: numericValue,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        price: prevData.price || 0,
      }));
    }
  };

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
      if (apiService && product) {
        await apiService.updateProduct(product.id, formData);
      } else if (apiService ) {
        await apiService.storeProduct(formData);
      }

      router.push('/products/list');
    } catch (error) {
      console.error('Erro ao enviar dados para a API:', error);
    }
  };

  const [options, setOptions] = useState<{ name: string; id: string }[]>([]);

  useEffect(() => {
    if (apiService) {
      const fetchData = async () => {
        try {
          const response = await apiService.fetchProductTypes();
          setOptions(response.data);
        } catch (error) {
          console.error('Erro ao carregar opções:', error);
        }
      };
      fetchData();
    }
  }, [apiService]);

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;

    setFormData((prevData) => ({
      ...prevData,
      product_type_id: value,
    }));
  };

  if (!session) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Produto/</span> Novo</h4>
      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Formulário de cadastro</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-product">Nome</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-product" className="input-group-text"
                      ><i className="bx bx-buildings"></i></span>
                      <input
                        type="text"
                        id="basic-icon-default-product"
                        className="form-control"
                        placeholder="Eletrônicos"
                        value={formData.name}
                        onChange={handleNameChange}
                        aria-label="Eletrônicos"
                        aria-describedby="basic-icon-default-product"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="exampleFormControlSelect1" className="col-sm-2 col-form-label">Tipo do produto</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <select
                        className="form-select"
                        id="exampleFormControlSelect1"
                        aria-label="Default select example"
                        value={formData.product_type_id}
                        onChange={handleSelectChange}
                      >
                        <option value="">Selecione...</option>
                        {options.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-product">Preço</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-product" className="input-group-text"
                      ><i className="bx bx-buildings"></i></span>
                      <input
                        type="text"
                        id="basic-icon-default-product"
                        className="form-control"
                        placeholder="Eletrônicos"
                        value={new Intl.NumberFormat('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        }).format(formData.price / 100)}
                        onChange={handleAmountChange}
                        aria-label="Eletrônicos"
                        aria-describedby="basic-icon-default-product"
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