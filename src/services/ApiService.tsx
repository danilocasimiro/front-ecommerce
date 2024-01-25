import toast from 'react-hot-toast';
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
      throw error;
    }
  }

  async fetchTenants(): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/tenants', this.headers);
    } catch (error) {
      throw error;
    }
  }

  async storeTenant(dataForm: TenantForm): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.post('/tenants', dataForm, this.headers);
      toast.success('Cliente criado com sucesso');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async fetchTenant(id: string | string[] | undefined, params?: {}): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/tenants/' + id, {headers: this.headers.headers, params: params });
    } catch (error) {
      throw error;
    }
  }

  async updateTenant(id: number, dataForm: TenantDataForm): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.put('/tenants/' + id, dataForm, this.headers);
      toast.success('Cliente atualizado com sucesso');
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteTenant(id: number): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.delete('/tenants/' + id, this.headers);
      toast.success('Cliente removido com sucesso');
      return response;
    } catch (error) {
      throw error;
    }
  }

  async fetchEmployees(params?: {}): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/employees', {headers: this.headers.headers, params: params });
    } catch (error) {
      throw error;
    }
  }

  async storeEmployee(dataForm: EmployeeDataForm): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.post('/employees', dataForm, this.headers);
      toast.success('Colaborador criado com sucesso');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async fetchEmployee(id: string | string[] | undefined, params?: {}): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/employees/' + id, {headers: this.headers.headers, params: params });
    } catch (error) {
      throw error;
    }
  }

  async updateEmployee(id: number, dataForm: EmployeeDataForm): Promise<void> {
    try {
      await this.api.put('/employees/' + id, dataForm, this.headers);
      toast.success('Colaborador atualizado com sucesso');
    } catch (error: any) {
      console.log('error: ', error)
      toast.error(error.response.data.error);
    }
  }

  async deleteEmployee(id: number): Promise<void> {
    try {
      await this.api.delete('/employees/' + id, this.headers);
      toast.success('Colaborador removido com sucesso');
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  }

  async signInCompany(companyId: number): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.post('/authenticate/company_auth/' + companyId, {}, this.headers);
      toast.success('Login realizado com sucesso');
      return response;
    } catch (error) {
      throw error;
    }
  }

  async storeCompany(dataForm: CompanyDataForm): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.post('/companies', dataForm, this.headers);
      toast.success('Empresa criada com sucesso');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async fetchCompanies(): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/companies', this.headers);
    } catch (error) {
      throw error;
    }
  }

  async fetchCompany(id: string | string[] | undefined, params: {}): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/companies/' + id, {headers: this.headers.headers, params: params });
    } catch (error) {
      throw error;
    }
  }

  async updateCompany(id: string | string[] | undefined, dataForm: CompanyDataForm): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.put('/companies/' + id, dataForm, this.headers);
      toast.success('Empresa atualizada com sucesso');
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteCompany(id: number): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.delete('/companies/' + id, this.headers);
      toast.success('Empresa removida com sucesso');
      return response;
    } catch (error) {
      throw error;
    }
  }

  async storeProductType(dataForm: ProductTypeForm): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.post('/product_types', dataForm, this.headers);
      toast.success('Tipo de produto salvo com sucesso');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async fetchProductTypes(): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/product_types', this.headers);
    } catch (error) {
      throw error;
    }
  }

  async fetchProductType(id: string | string[] | undefined): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/product_types/' + id, this.headers);
    } catch (error) {
      throw error;
    }
  }

  async updateProductType(id: number, dataForm: ProductTypeForm): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.put('/product_types/' + id, dataForm, this.headers);
      toast.success('Tipo de produto atualizado com sucesso');
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteProductType(id: number): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.delete('/product_types/' + id, this.headers);
      toast.success('Tipo de produto removido com sucesso');
      return response;
    } catch (error) {
      throw error;
    }
  }

  async storeProduct(dataForm: ProductForm): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.post('/products', dataForm, this.headers);
      toast.success('Produto criado com sucesso');
      return response;
    } catch (error) {
      throw error;
    }
  }

  async fetchProducts(params?: {}): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/products', {headers: this.headers.headers, params: params });
    } catch (error) {
      throw error;
    }
  }

  async fetchProduct(id: string | string[] | undefined): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/products/' + id, this.headers);
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id: number, dataForm: ProductForm): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.put('/products/' + id, dataForm, this.headers);
      toast.success('Produto atualizado com sucesso');
      return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id: number): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.delete('/products/' + id, this.headers);
      toast.success('Produto removido com sucesso');
      return response;
    } catch (error) {
      throw error;
    }
  }

  async fetchSubscriptions(params?: {}): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/subscriptions/', {headers: this.headers.headers, params: params });
    } catch (error) {
      throw error;
    }
  }

  async storeSubscription(dataForm: SubscriptionForm): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.post('/subscriptions', dataForm, this.headers);
      toast.success('Assinatura realizada com sucesso');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async fetchSubscriptionPlan(id: string | string[] | undefined, params: {}): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/subscription_plans/' + id, {headers: this.headers.headers, params: params });
    } catch (error) {
      throw error;
    }
  }

  async fetchSubscriptionPlans(params?: {}): Promise<AxiosResponse<any>> {
    try {
      return await this.api.get('/subscription_plans/', {headers: this.headers.headers, params: params });
    } catch (error) {
      throw error;
    }
  }

  async storeSubscriptionPlan(dataForm: SubscriptionPlanForm): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.post('/subscription_plans', dataForm, this.headers);
      toast.success('Plano salvo com sucesso');
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async deleteSubscriptionPlan(id: number): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.delete('/subscription_plans/' + id, this.headers);
      toast.success('Plano removido com sucesso');
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateSubscriptionPlan(id: number, dataForm: SubscriptionPlanForm): Promise<AxiosResponse<any>> {
    try {
      const response = await this.api.put('/subscription_plans/' + id, dataForm, this.headers);
      toast.success('Plano atualizado com sucesso');
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default ApiService;
