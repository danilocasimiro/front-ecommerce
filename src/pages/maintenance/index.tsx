import React from "react";
import "@/assets/vendor/fonts/boxicons.css"
import "@/assets/vendor/css/core.css"
import "@/assets/vendor/css/theme-default.css"
import "@/assets/css/demo.css"
import "@/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css"
import "@/assets/vendor/libs/apex-charts/apex-charts.css"

const MaintenancePage = () => {
  return (
    <div className="d-grid justify-content-center align-items-center vh-100">
      <div className="container-xxl container-p-y">
        <div className="misc-wrapper">
          <h2 className="mb-2 mx-2">Under Maintenance!</h2>
          <p className="mb-4 mx-2">
            Sorry for the inconvenience but we're performing some maintenance at the moment
          </p>
          <a href="/login" className="btn btn-primary">
            Voltar para a tela de login
          </a>
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;