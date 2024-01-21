// services/ApiService.js

import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface CompanyDataForm {
  name: string;
}
interface TenantDataForm {
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
interface TenantForm {
  name: string;
  user: {
    email_address: string;
    password: string;
  }
}
interface SubscriptionForm {
  status: string;
  subscription_plan_id: number;
}
interface EmployeeDataForm {
  name: string;
}
interface SubscriptionPlanForm {
  name: string;
  description: string;
  activation_months: number;
  price: number;
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

  async fetchUser(id: string | string[] | undefined, params?: {}): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/users/' + id, {headers: this.headers.headers, params: params });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }

  async fetchTenants(): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/tenants', this.headers);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
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

  async fetchTenant(id: string | string[] | undefined, params?: {}): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/tenants/' + id, {headers: this.headers.headers, params: params });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }

  async updateTenant(id: number, dataForm: TenantDataForm): Promise<AxiosResponse<any>> {
    try {
      return await this.api.put('/tenants/' + id, dataForm, this.headers);
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }

  async deleteTenant(id: number): Promise<AxiosResponse<any>> {
    try {
      return await this.api.delete('/tenants/' + id, this.headers);
    } catch (error) {
      console.error('Erro ao deletar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }

  async fetchEmployees(params?: {}): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/employees', {headers: this.headers.headers, params: params });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }

  async storeEmployee(dataForm: EmployeeDataForm): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.post('/employees', dataForm, this.headers);
        return response.data;
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      throw error;
    }
  }

  async fetchEmployee(id: string | string[] | undefined, params?: {}): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/employees/' + id, {headers: this.headers.headers, params: params });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }

  async updateEmployee(id: number, dataForm: EmployeeDataForm): Promise<AxiosResponse<any>> {
    try {
      return await this.api.put('/employees/' + id, dataForm, this.headers);
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }

  async deleteEmployee(id: number): Promise<AxiosResponse<any>> {
    try {
      return await this.api.delete('/employees/' + id, this.headers);
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

  async fetchSubscriptions(params?: {}): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/subscriptions/', {headers: this.headers.headers, params: params });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }

  async storeSubscription(dataForm: SubscriptionForm): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.post('/subscriptions', dataForm, this.headers);
        return response.data;
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      throw error;
    }
  }

  async fetchSubscriptionPlan(id: string | string[] | undefined, params: {}): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/subscription_plans/' + id, {headers: this.headers.headers, params: params });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }

  async fetchSubscriptionPlans(params?: {}): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/subscription_plans/', {headers: this.headers.headers, params: params });
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }

  async storeSubscriptionPlan(dataForm: SubscriptionPlanForm): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.post('/subscription_plans', dataForm, this.headers);
        return response.data;
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      throw error;
    }
  }

  async deleteSubscriptionPlan(id: number): Promise<AxiosResponse<any>> {
    try {
      return await this.api.delete('/subscription_plans/' + id, this.headers);
    } catch (error) {
      console.error('Erro ao deletar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }

  async updateSubscriptionPlan(id: number, dataForm: SubscriptionPlanForm): Promise<AxiosResponse<any>> {
    try {
      return await this.api.put('/subscription_plans/' + id, dataForm, this.headers);
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      throw error; // Rejeitar a promessa para que o chamador possa lidar com o erro
    }
  }
}

export default ApiService;
