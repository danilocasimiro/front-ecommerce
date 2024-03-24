import ApiService from "@/services/ApiService";
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

interface ProductType {
  id: number,
  name: string
}

interface Product {
  id: number;
  name: string;
  product_type: ProductType;
  price: number;
  stock: string;
}

export default function ProductGrid({ products }: { products: Product[] }) {
  const { data: session } = useSession();

  const handleDelete = async (productId: number) => {
    const userConfirmed = window.confirm('Você realmente deseja excluir este produto?');

    if (userConfirmed) {
      const apiService = new ApiService(session!.token);
      try {
        await apiService.deleteProduct(productId);

        window.location.reload();
      } catch (error: any) {
        toast.error(error.response.data.error);
      }
    }
  };

  return (
    <>
      <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Produto /</span> Listar</h4>

      <div className="card">
        <h5 className="card-header">Produtos</h5>
        <div className="table-responsive text-nowrap">
          {products.length ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Tipo do produto</th>
                  <th>Preço</th>
                  <th>Estoque</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {products?.map(product => (
                  <tr key={product.id}>
                    <td style={{ color: '#697a8d' }}>{product.name}</td>
                    <td style={{ color: '#697a8d' }}>
                      <a href={`/product-types/${product.product_type.id}`}>
                        {product.product_type.name}
                      </a>
                    </td>
                    <td style={{ color: '#697a8d' }}>
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(product.price / 100)}
                    </td>
                    <td style={{ color: '#697a8d' }}>{product.stock}</td>
                    <td>
                      <div className="dropdown">
                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                          <i className="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href={`/products/${product.id}`}>
                            <i className="bx bx-edit-alt me-1"></i> Edit</a>
                          <a className="dropdown-item" href='#' onClick={() => handleDelete(product.id)}>
                            <i className="bx bx-trash me-1"></i> Delete</a>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center">
              <p>Não encontrado.</p>
            </div>
          )
          }
        </div>
      </div>
    </>
  );
};