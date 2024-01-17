// services/ApiService.js

import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface CompanyDataForm {
  name: string;
}
interface ProductTypeForm {
  name: string;
}
interface ProductForm {
  name: string;
  product_type_id: string;
  price: number;
}
interface ProfileForm {
  name: string;
  user: {
    email_address: string;
  }
}
interface TenantForm {
  name: string;
  user: {
    email_address: string;
    password: string;
  }
}

class ApiService {
  private api: AxiosInstance;
  private headers;

  constructor(token: string | null) {
    this.api = axios.create({
      baseURL: 'http://localhost:3001/', // Substitua pela URL real da sua API
    });
    this.headers = {
      headers: {
        'Authorization': `Bearer ${token}`, // Adicione o token aos cabeçalhos
        'Content-Type': 'application/json', // Adapte conforme necessário
      },
    }
  }

  async storeCompany(dataForm: CompanyDataForm): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.post('/companies', dataForm, this.headers);
        return response.data;
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }

  async fetchCompanies(): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/companies', this.headers);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }

  async fetchCompany(id: string | string[] | undefined, params: {}): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/companies/' + id, {headers: this.headers.headers, params: params });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }

  async updateCompany(id: string | string[] | undefined, dataForm: CompanyDataForm): Promise<AxiosResponse<any>> {
    try {
      return await this.api.put('/companies/' + id, dataForm, this.headers);
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }

  async deleteCompany(id: number): Promise<AxiosResponse<any>> {
    try {
      return await this.api.delete('/companies/' + id, this.headers);
    } catch (error) {
      console.error('Erro ao deletar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }
  
  async signInCompany(companyId: number): Promise<AxiosResponse<any>> {
    try {
      return await this.api.post('/authenticate/company_auth/' + companyId, {}, this.headers);
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }

  async storeProductType(dataForm: ProductTypeForm): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.post('/product_types', dataForm, this.headers);
        return response.data;
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }

  async fetchProductTypes(): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/product_types', this.headers);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }

  async fetchProductType(id: string | string[] | undefined): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/product_types/' + id, this.headers);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }

  async updateProductType(id: number, dataForm: ProductTypeForm): Promise<AxiosResponse<any>> {
    try {
      return await this.api.put('/product_types/' + id, dataForm, this.headers);
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }

  async deleteProductType(id: number): Promise<AxiosResponse<any>> {
    try {
      return await this.api.delete('/product_types/' + id, this.headers);
    } catch (error) {
      console.error('Erro ao deletar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }

  async storeProduct(dataForm: ProductForm): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.post('/products', dataForm, this.headers);
        return response.data;
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }

  async fetchProducts(params?: {}): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/products', {headers: this.headers.headers, params: params });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }

  async fetchProduct(id: string | string[] | undefined): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/products/' + id, this.headers);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }

  async updateProduct(id: number, dataForm: ProductForm): Promise<AxiosResponse<any>> {
    try {
      return await this.api.put('/products/' + id, dataForm, this.headers);
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }

  async deleteProduct(id: number): Promise<AxiosResponse<any>> {
    try {
      return await this.api.delete('/products/' + id, this.headers);
    } catch (error) {
      console.error('Erro ao deletar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }

  async storeTenant(dataForm: TenantForm): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.post('/tenants', dataForm, this.headers);
        return response.data;
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      throw error;
    }
  }

  async updateProfile(id: number, dataForm: ProfileForm): Promise<AxiosResponse<any>> {
    try {
      return await this.api.put('/tenants/' + id, dataForm, this.headers);
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }

  async fetchTenant(id: string | string[] | undefined, params: {}): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/tenants/' + id, {headers: this.headers.headers, params: params });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }

  async fetchSubscriptions(params?: {}): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/subscriptions/', {headers: this.headers.headers, params: params });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }
}

export default ApiService;
