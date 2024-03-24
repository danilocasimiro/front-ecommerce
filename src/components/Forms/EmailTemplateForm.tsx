import ApiService from '../../services/ApiService';
import React, { useEffect, useState, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { Editor } from '@tinymce/tinymce-react';

interface EmailTemplate {
  id: number,
  subject: string,
  body: string,
  allow_variables: string
}

export default function EmailTemplateForm({ emailTemplate }: { emailTemplate: EmailTemplate | null | undefined }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    subject: '',
    body: '',
    allow_variables: ''
  });

  useEffect(() => {
    if (emailTemplate) {
      setFormData({
        subject: emailTemplate?.subject || '',
        body: emailTemplate?.body || '',
        allow_variables: emailTemplate?.allow_variables || '',
      });
    }
  }, [emailTemplate]);

  const handleChangeSubject = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      subject: event.target.value
    }));
  };
  
  const handleChangeBody = (newContent :string) => {
    setFormData({ ...formData, body: newContent });
  };
  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiService = new ApiService(session!.token);

    try {
      if (emailTemplate) {
        await apiService.updateEmailTemplate(emailTemplate.id, formData);
      }

      router.push('/email-templates/list');
    } catch (error: any) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light">Templates/</span><span className="text-muted fw-light">Emails/</span> Edição</h4>
      <div className="row">
        <div className="col-xxl">
          <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="mb-0">Formulário de atualização</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-product-type">Assunto</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <span id="basic-icon-default-product-type2" className="input-group-text"
                      ><i className="bx bx-buildings"></i></span>
                      <input
                        type="text"
                        id="basic-icon-default-product-type"
                        className="form-control"
                        placeholder="Eletrônicos"
                        value={formData.subject}
                        onChange={handleChangeSubject}
                        aria-label="Eletrônicos"
                        aria-describedby="basic-icon-default-product-type2"
                      />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label" htmlFor="basic-icon-default-product-type">Corpo</label>
                  <div className="col-sm-10">
                    <div className="input-group input-group-merge">
                      <Editor
                        apiKey='80o12eu4n4gcyg1g2fialyll93ihrrftw9wpnhptbgnu7hi9'
                        init={{
                          plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                          tinycomments_mode: 'embedded',
                          tinycomments_author: 'Author name',
                          mergetags_list: [
                            { value: 'First.Name', title: 'First Name' },
                            { value: 'Email', title: 'Email' },
                          ],
                          ai_request: (request: any, respondWith: any) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                        }}
                        initialValue={formData.body}
                        onChange={(event) => {
                          const newContent = event.target.getContent();
                          handleChangeBody(newContent);
                        }}
                      />
                      <p>Atributos disponíveis: {formData.allow_variables}</p>
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