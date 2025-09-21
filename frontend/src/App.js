import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Analytics from "./components/Analytics";
import IssuesTable from "./components/IssuesTable";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ProtectedRoute>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/table" element={<IssuesTable />} />
            </Routes>
          </Layout>
        </ProtectedRoute>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
