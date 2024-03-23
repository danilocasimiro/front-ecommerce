import React from "react";
import Footer from '@/components/Dashboard/Footer';
import LeftMenu from '@/components/Dashboard/LeftMenu/LeftMenu';
import NavBar from '@/components/Dashboard/NavBar';
import AuthCheck from '@/components/AuthCheck';
import "@/assets/vendor/fonts/boxicons.css"
import "@/assets/vendor/css/core.css"
import "@/assets/vendor/css/theme-default.css"
import "@/assets/css/demo.css"
import "@/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css"
import "@/assets/vendor/libs/apex-charts/apex-charts.css"
import VerifyTenantSubscriptionExpiration from "@/components/VerifyTenantSubscriptionExpiration";

export default function Dashboard() {
  return (
    <>
      <AuthCheck>
        <VerifyTenantSubscriptionExpiration>
          <div>
            <div className="layout-wrapper layout-content-navbar">
              <div className="layout-container">
                <LeftMenu />
                <div className="layout-page">
                  <NavBar />

                  <div className="content-wrapper">
                    <div className="container-xxl flex-grow-1 container-p-y"></div>
                    <Footer />
                    <div className="content-backdrop fade"></div>
                  </div>
                </div>
              </div>

              <div className="layout-overlay layout-menu-toggle"></div>
            </div>
          </div>
        </VerifyTenantSubscriptionExpiration>
      </AuthCheck>
    </>
  );
}
