
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Produtos from "./pages/Produtos";
import Vendas from "./pages/Vendas";
import Financeiro from "./pages/Financeiro";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <Layout>
              <Dashboard />
            </Layout>
          } />
          <Route path="/produtos" element={
            <Layout>
              <Produtos />
            </Layout>
          } />
          <Route path="/vendas" element={
            <Layout>
              <Vendas />
            </Layout>
          } />
          <Route path="/financeiro" element={
            <Layout>
              <Financeiro />
            </Layout>
          } />
          <Route path="/configuracoes" element={
            <Layout>
              <div className="space-y-6">
                <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
                <p>Configurações do sistema (em desenvolvimento)</p>
              </div>
            </Layout>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

