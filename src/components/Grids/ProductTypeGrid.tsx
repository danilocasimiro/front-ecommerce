import ApiService from "@/services/ApiService";
import { useSession } from 'next-auth/react';

interface ProductType {
  id: number;
  name: string;
}

export default function ProductTypeGrid({ productTypes }: { productTypes: ProductType[] }) {
  const { data: session } = useSession();

  const handleDelete = async (productTypeId: number) => {
    const userConfirmed = window.confirm('Você realmente deseja excluir esta empresa?');
    
    if (userConfirmed) {
      const apiService = new ApiService(session!.token);
      try {
        await apiService.deleteProductType(productTypeId);

        window.location.reload();
      } catch (error: any) {
        console.error(`Erro ao excluir empresa: ${error.message}`);
      }
    }
  };

  return (
    <>
      <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Tables /</span> Basic Tables</h4>

      <div className="card">
        <h5 className="card-header">Empresas</h5>
        <div className="table-responsive text-nowrap">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {productTypes?.map(productType => (
                <tr key={productType.id}>
                  <td style={{ color: '#697a8d' }}>{productType.name}</td>
                  <td>
                    <div className="dropdown">
                      <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                        <i className="bx bx-dots-vertical-rounded"></i>
                      </button>
                      <div className="dropdown-menu">
                        <a className="dropdown-item" href={`/product-types/${productType.id}`}>
                        <i className="bx bx-edit-alt me-1"></i> Edit</a>
                        <a className="dropdown-item" href='#'onClick={() => handleDelete(productType.id)}>
                        <i className="bx bx-trash me-1"></i> Delete</a>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};