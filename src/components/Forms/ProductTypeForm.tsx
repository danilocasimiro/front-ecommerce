import ApiService from '../../services/ApiService';
import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

interface ProductType {
  id: number,
  name: string
}

export default function ProductTypeForm({ productType }: { productType: ProductType | null | undefined }) {
  const router = useRouter();
  const { data: session } = useSession();

  const [formData, setFormData] = useState({
    name: ''
  });

  useEffect(() => {
    if (productType) {
      setFormData({
        name: productType?.name || '',
      });
    }
  }, [productType]);

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
      if (productType) {
        await apiService.updateProductType(productType.id, formData);
      } else {
        await apiService.storeProductType(formData);
      }

      router.push('/product-types/list');
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Tipo de Produto/</span> Nova</h4>
      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Formulário de cadastro</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-product-type">Nome</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-product-type2" className="input-group-text"
                      ><i className="bx bx-buildings"></i></span>
                      <input
                        type="text"
                        id="basic-icon-default-product-type"
                        className="form-control"
                        placeholder="Eletrônicos"
                        value={formData.name}
                        onChange={handleNameChange}
                        aria-label="Eletrônicos"
                        aria-describedby="basic-icon-default-product-type2"
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