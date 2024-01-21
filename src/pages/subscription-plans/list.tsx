import React, { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
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
import SubscriptionPlanGrid from "@/components/Grids/SubscriptionPlanGrid";


export default function SubscriptionPlanList() {
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated" && session?.token) {
        try {
          const apiService = new ApiService(session.token);
          const result = await apiService.fetchSubscriptionPlans();

          setSubscriptionPlans(result.data);
        } catch (error) {
          console.error('Erro ao obter dados dos planos:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [status, session?.token]);

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
                    {loading ? (
                      <p>Carregando...</p>
                    ) : (
                      <SubscriptionPlanGrid subscriptionPlans={subscriptionPlans} />
                    )}
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
