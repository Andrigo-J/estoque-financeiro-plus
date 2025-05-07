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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Eye, Search, Trash2, ShoppingBag } from 'lucide-react';
import { FormNovaVenda } from '@/components/FormNovaVenda';
import { toast } from "sonner";

// Dados vazios para inicialização
const vendasIniciais = [];

// Resumo de vendas zerado
const resumoVendas = {
  dia: 0,
  semana: 0,
  mes: 0,
  quantidade: {
    dia: 0,
    semana: 0,
    mes: 0
  }
};

const Vendas = () => {
  const [busca, setBusca] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [vendaDetalhes, setVendaDetalhes] = useState<any>(null);
  const [vendas, setVendas] = useState(vendasIniciais);
  const [vendaParaExcluir, setVendaParaExcluir] = useState<any>(null);

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
  
  const handleExcluirVenda = (venda: any) => {
    setVendaParaExcluir(venda);
  };
  
  const confirmarExclusaoVenda = () => {
    if (vendaParaExcluir) {
      // Filtra o array removendo a venda com o ID correspondente
      const novasVendas = vendas.filter(v => v.id !== vendaParaExcluir.id);
      setVendas(novasVendas);
      toast.success(`Venda #${vendaParaExcluir.id} excluída com sucesso!`);
      setVendaParaExcluir(null);
    }
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
              {formatarValor(0)}
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

      {/* Mensagem quando não há vendas */}
      <div className="text-center py-10">
        <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-2 text-lg font-medium">Nenhuma venda registrada</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Comece registrando uma nova venda.
        </p>
        <div className="mt-6">
          <Button onClick={handleNovaVenda}>
            <Plus className="mr-2 h-4 w-4" /> Registrar Venda
          </Button>
        </div>
      </div>

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
      
      {/* AlertDialog para confirmação de exclusão */}
      <AlertDialog 
        open={!!vendaParaExcluir} 
        onOpenChange={(open) => !open && setVendaParaExcluir(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a venda #{vendaParaExcluir?.id}?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmarExclusaoVenda}
              className="bg-red-500 hover:bg-red-600"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Vendas;
