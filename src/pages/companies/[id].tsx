import React, { useEffect, useState } from "react";
import Footer from '@/components/Dashboard/Footer';
import LeftMenu from '@/components/Dashboard/LeftMenu/LeftMenu';
import NavBar from '@/components/Dashboard/NavBar';
import AuthCheck from '@/components/authCheck';
import "@/assets/vendor/fonts/boxicons.css"
import "@/assets/vendor/css/core.css"
import "@/assets/vendor/css/theme-default.css"
import "@/assets/css/demo.css"
import "@/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css"
import "@/assets/vendor/libs/apex-charts/apex-charts.css"
import ApiService from '../../services/ApiService';
import { useRouter } from 'next/router';
import CompanyForm from "@/components/Forms/CompanyForm";
import Loading from "@/components/Dashboard/Loading";
import { useSession } from 'next-auth/react';

interface Company {
  id: string;
  name: string;
  address: {
    street: string,
    number: string,
    neighborhood: string,
    city: string,
    state: string,
    zip_code: string,
  }
}

export default function CompanyEdit() {
  const [company, setCompany] = useState<Company | null | undefined>();
  const router = useRouter();
  const { data: session } = useSession();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        try {
          const apiService = new ApiService(session.token);
          const result = await apiService.fetchCompany(id, { expand: 'address' });
          setCompany(result.data);
        } catch (error) {
          console.error('Erro ao obter dados da empresa:', error);
        }
      }
    };

    fetchData();
  }, [session]);

  return (
    <>
      <AuthCheck>
        <div>
          <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
              <LeftMenu />
              <div className="layout-page">
                <NavBar />

                <div className="content-wrapper">
                  <div className="container-xxl flex-grow-1 container-p-y">
                    <Loading>
                      <CompanyForm company={company} />
                    </Loading>
                  </div>
                  <Footer />
                  <div className="content-backdrop fade"></div>
                </div>
              </div>
            </div>
            <div className="layout-overlay layout-menu-toggle"></div>
          </div>
        </div>
      </AuthCheck>
    </>
  );
}
