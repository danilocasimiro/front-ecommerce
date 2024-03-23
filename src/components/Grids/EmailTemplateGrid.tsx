interface EmailTemplate {
  id: number;
  action: string;
}

export default function EmailTemplateGrid({ emailTemplates }: { emailTemplates: EmailTemplate[] }) {
  return (
    <>
      <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Templates /</span> Emails</h4>

      <div className="card">
        <h5 className="card-header">Empresas</h5>
        <div className="table-responsive text-nowrap">
          {emailTemplates.length ? (
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Ação</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody className="table-border-bottom-0">
                {emailTemplates?.map(emailTemplate => (
                  <tr key={emailTemplate.id}>
                    <td style={{ color: '#697a8d' }}>{emailTemplate.action}</td>
                    <td>
                      <div className="dropdown">
                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                          <i className="bx bx-dots-vertical-rounded"></i>
                        </button>
                        <div className="dropdown-menu">
                          <a className="dropdown-item" href={`/templates/emails/${emailTemplate.id}`}>
                            <i className="bx bx-edit-alt me-1"></i> Edit
                          </a>
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