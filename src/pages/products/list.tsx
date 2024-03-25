import React, { useEffect, useState } from "react";
import { useSession } from 'next-auth/react';
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
import ProductGrid from "@/components/Grids/ProductGrid";
import ApiService from '../../services/ApiService';
import Loading from "@/components/Dashboard/Loading";
import Pagination from "@/components/Pagination";

interface ExtraQuery {
  before?: number;
  after?: number;
}

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [firstId, setFirstId] = useState();
  const [lastId, setLastId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { data: session } = useSession();

  const fetchData = async (extraQuery: ExtraQuery) => {
    if (session) {
      try {
        const apiService = new ApiService(session.token);
        const result = await apiService.fetchProducts({ expand: 'product_type', ...extraQuery });
        setTotalPages(result.headers['total-pages'])
        setProducts(result.data);

        if (result.data.length > 0) {
          setFirstId(result.data[0].id)
          setLastId(result.data[result.data.length - 1].id)
          updateCurrentPage(extraQuery);
        }
      } catch (error) {
        console.error('Erro ao obter dados do colaborador:', error);
      }
    }
  };

  function updateCurrentPage(extraQuery: ExtraQuery) {
    if (extraQuery.after) {
      setCurrentPage(currentPage + 1);
    }
    if (extraQuery.before) {
      setCurrentPage(currentPage - 1);
    }
  }

  useEffect(() => {
    fetchData({});
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
                      <ProductGrid products={products} />
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        firstId={firstId}
                        lastId={lastId}
                        fetchData={fetchData}
                        quantityModels={products.length}
                      />
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
