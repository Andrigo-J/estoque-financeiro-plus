
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, DollarSign, AlertTriangle } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

// Dados de exemplo para os gráficos
const vendasMensais = [
  { mes: 'Jan', valor: 4000 },
  { mes: 'Fev', valor: 3000 },
  { mes: 'Mar', valor: 5000 },
  { mes: 'Abr', valor: 2780 },
  { mes: 'Mai', valor: 1890 },
  { mes: 'Jun', valor: 2390 },
];

const Dashboard = () => {
  // Dados fictícios para demonstração
  const estatisticas = {
    totalProdutos: 143,
    produtosBaixoEstoque: 8,
    vendasHoje: 12,
    valorVendasHoje: 'R$ 3.450,00',
    contasReceber: 'R$ 7.830,00',
    contasPagar: 'R$ 2.150,00'
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral do sistema de estoque e financeiro.
        </p>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Produtos
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas.totalProdutos}</div>
            <p className="text-xs text-muted-foreground">
              Produtos cadastrados
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-amber-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-900">
              Produtos em Baixa
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700">
              {estatisticas.produtosBaixoEstoque}
            </div>
            <p className="text-xs text-amber-600">
              Produtos com estoque crítico
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Vendas Hoje
            </CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{estatisticas.vendasHoje}</div>
            <p className="text-xs text-muted-foreground">
              {estatisticas.valorVendasHoje}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Financeiro
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-between text-sm">
              <span>A receber:</span>
              <span className="text-green-600 font-medium">{estatisticas.contasReceber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>A pagar:</span>
              <span className="text-red-600 font-medium">{estatisticas.contasPagar}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Vendas Mensais</CardTitle>
            <CardDescription>
              Total de vendas dos últimos 6 meses
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={vendasMensais}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="valor" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Produtos com Estoque Crítico</CardTitle>
            <CardDescription>
              Produtos que precisam de reposição
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { nome: 'Produto A', estoque: 3, min: 5 },
                { nome: 'Produto B', estoque: 2, min: 10 },
                { nome: 'Produto C', estoque: 5, min: 8 },
                { nome: 'Produto D', estoque: 1, min: 3 }
              ].map((produto, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{produto.nome}</p>
                    <p className="text-xs text-muted-foreground">
                      Min: {produto.min}
                    </p>
                  </div>
                  <div className="text-amber-600 font-semibold">
                    {produto.estoque} un
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
