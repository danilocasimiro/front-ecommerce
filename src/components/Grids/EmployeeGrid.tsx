import ApiService from "@/services/ApiService";
import { useSession } from 'next-auth/react';

interface Employee {
  id: number;
  name: string;
  employable_type: string;
  employable_id: string,
  employable: {
    name: string
  }
}

export default function EmployeeGrid({ employees }: { employees: Employee[] }) {
  const { data: session } = useSession();

  const handleDelete = async (employeeId: number) => {
    const userConfirmed = window.confirm('Você realmente deseja excluir este colaborador?');

    if (userConfirmed) {
      const apiService = new ApiService(session!.token);
      try {
        await apiService.deleteEmployee(employeeId);

        window.location.reload();
      } catch (error: any) {
        console.error(`Erro ao excluir colaborador: ${error.message}`);
      }
    }
  };

  return (
    <>
      <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Colaboradores /</span> Listar</h4>

      <div className="card">
        <h5 className="card-header">Colaboradores</h5>
        <div className="table-responsive text-nowrap">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Nível</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody className="table-border-bottom-0">
              {employees?.map(employee => (
                <tr key={employee.id}>
                  <td style={{ color: '#697a8d' }}>{employee.name}</td>
                  <td style={{ color: '#697a8d' }}>
                    {employee.employable_type == 'Company' ? `Colaborador Empresa: ${employee.employable?.name}`: 'Colaborador Sistema'}</td>
                  <td>
                    <div className="dropdown">
                      <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                        <i className="bx bx-dots-vertical-rounded"></i>
                      </button>
                      <div className="dropdown-menu">
                        <a className="dropdown-item" href={`/employees/${employee.id}`}>
                          <i className="bx bx-edit-alt me-1"></i> Edit</a>
                        <a className="dropdown-item" href='#' onClick={() => handleDelete(employee.id)}>
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