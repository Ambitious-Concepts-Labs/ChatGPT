"use client";
import Dashboard from "../../components/Dashboard";
import Layout from "../../components/Layout";
import { DataProvider } from "../../utils/DataContext";

const index = () => {
  return (
    <DataProvider>
      <Layout>
        <Dashboard />
      </Layout>
    </DataProvider>
  );
};

export default index;
