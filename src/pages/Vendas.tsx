
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { 
  Dialog, DialogContent, DialogDescription, 
  DialogHeader, DialogTitle 
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Eye, Search } from 'lucide-react';
import { FormNovaVenda } from '@/components/FormNovaVenda';

// Dados fictícios para demonstração
const vendas = [
  {
    id: 1056,
    cliente: "Empresa A",
    data: "2025-05-06",
    total: 2500.0,
    status: "finalizada",
    itens: 5
  },
  {
    id: 1055,
    cliente: "João Silva",
    data: "2025-05-05",
    total: 450.0,
    status: "finalizada",
    itens: 2
  },
  {
    id: 1054,
    cliente: "Maria Souza",
    data: "2025-05-05",
    total: 780.0,
    status: "finalizada",
    itens: 3
  },
  {
    id: 1053,
    cliente: "Empresa B",
    data: "2025-05-04",
    total: 1200.0,
    status: "finalizada",
    itens: 7
  },
  {
    id: 1052,
    cliente: "Carlos Oliveira",
    data: "2025-05-03",
    total: 350.0,
    status: "cancelada",
    itens: 2
  }
];

const resumoVendas = {
  dia: 3730.0,
  semana: 5280.0,
  mes: 12450.0,
  quantidade: {
    dia: 3,
    semana: 5,
    mes: 12
  }
};

const Vendas = () => {
  const [busca, setBusca] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [vendaDetalhes, setVendaDetalhes] = useState<any>(null);

  // Filtrar vendas baseado na busca
  const vendasFiltradas = vendas.filter(venda =>
    venda.cliente.toLowerCase().includes(busca.toLowerCase()) ||
    venda.id.toString().includes(busca)
  );

  const handleNovaVenda = () => {
    setDialogOpen(true);
  };
  
  const handleVerDetalhes = (venda: any) => {
    setVendaDetalhes(venda);
  };

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR');
  };

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(valor);
  };

  const getBadgeStatus = (status: string) => {
    switch (status) {
      case 'finalizada':
        return <Badge className="bg-green-100 text-green-800">Finalizada</Badge>;
      case 'cancelada':
        return <Badge variant="destructive">Cancelada</Badge>;
      case 'pendente':
        return <Badge variant="secondary">Pendente</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Vendas</h1>
          <p className="text-muted-foreground">
            Gerencie todas as vendas realizadas
          </p>
        </div>
        <Button onClick={handleNovaVenda}>
          <Plus className="mr-2 h-4 w-4" /> Nova Venda
        </Button>
      </div>

      {/* Cards de resumo */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Vendas Hoje</div>
            <div className="text-2xl font-bold mt-1">{formatarValor(resumoVendas.dia)}</div>
            <div className="text-xs mt-1">{resumoVendas.quantidade.dia} vendas</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Vendas na Semana</div>
            <div className="text-2xl font-bold mt-1">{formatarValor(resumoVendas.semana)}</div>
            <div className="text-xs mt-1">{resumoVendas.quantidade.semana} vendas</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Vendas no Mês</div>
            <div className="text-2xl font-bold mt-1">{formatarValor(resumoVendas.mes)}</div>
            <div className="text-xs mt-1">{resumoVendas.quantidade.mes} vendas</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Ticket Médio</div>
            <div className="text-2xl font-bold mt-1">
              {formatarValor(resumoVendas.mes / resumoVendas.quantidade.mes)}
            </div>
            <div className="text-xs mt-1">Média do mês</div>
          </CardContent>
        </Card>
      </div>

      {/* Barra de pesquisa */}
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="Buscar vendas..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full"
          icon={Search}
        />
      </div>

      {/* Tabela de vendas */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Venda #</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-center">Itens</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendasFiltradas.map((venda) => (
                <TableRow key={venda.id}>
                  <TableCell className="font-medium">{venda.id}</TableCell>
                  <TableCell>{venda.cliente}</TableCell>
                  <TableCell>{formatarData(venda.data)}</TableCell>
                  <TableCell className="text-center">{venda.itens}</TableCell>
                  <TableCell className="text-right font-medium">{formatarValor(venda.total)}</TableCell>
                  <TableCell>{getBadgeStatus(venda.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleVerDetalhes(venda)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Dialog para nova venda */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Nova Venda</DialogTitle>
            <DialogDescription>
              Registre uma nova venda de produtos
            </DialogDescription>
          </DialogHeader>

          <FormNovaVenda onClose={() => setDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* Dialog para detalhes da venda */}
      {vendaDetalhes && (
        <Dialog open={!!vendaDetalhes} onOpenChange={() => setVendaDetalhes(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detalhes da Venda #{vendaDetalhes.id}</DialogTitle>
              <DialogDescription>
                Informações detalhadas sobre a venda
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Cliente</h3>
                  <p>{vendaDetalhes.cliente}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Data</h3>
                  <p>{formatarData(vendaDetalhes.data)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                  <p>{getBadgeStatus(vendaDetalhes.status)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Total</h3>
                  <p className="font-bold">{formatarValor(vendaDetalhes.total)}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Itens da Venda</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Produto</TableHead>
                      <TableHead className="text-center">Qtd</TableHead>
                      <TableHead className="text-right">Valor Unit.</TableHead>
                      <TableHead className="text-right">Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {/* Dados fictícios de itens */}
                    <TableRow>
                      <TableCell>Produto 1</TableCell>
                      <TableCell className="text-center">2</TableCell>
                      <TableCell className="text-right">R$ 250,00</TableCell>
                      <TableCell className="text-right">R$ 500,00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Produto 2</TableCell>
                      <TableCell className="text-center">1</TableCell>
                      <TableCell className="text-right">R$ 800,00</TableCell>
                      <TableCell className="text-right">R$ 800,00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Produto 3</TableCell>
                      <TableCell className="text-center">3</TableCell>
                      <TableCell className="text-right">R$ 400,00</TableCell>
                      <TableCell className="text-right">R$ 1.200,00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setVendaDetalhes(null)}>
                  Fechar
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Vendas;
