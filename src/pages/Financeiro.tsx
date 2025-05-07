
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow
} from "@/components/ui/table";
import {
  Dialog, DialogContent, DialogDescription,
  DialogHeader, DialogTitle, DialogTrigger
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
import { Badge } from '@/components/ui/badge';
import { Plus, Check, DollarSign, Trash2 } from 'lucide-react';
import { FormFinanceiro } from '@/components/FormFinanceiro';
import { toast } from "sonner";

// Dados fictícios para demonstração
const contasDadosIniciais = {
  receber: [
    { 
      id: 1, 
      descricao: 'Venda #1056', 
      cliente: 'Empresa A',
      valor: 2500.0, 
      vencimento: '2025-05-15',
      status: 'pendente'
    },
    { 
      id: 2, 
      descricao: 'Venda #1032', 
      cliente: 'Empresa B',
      valor: 1200.0, 
      vencimento: '2025-05-12',
      status: 'pendente'
    },
    { 
      id: 3, 
      descricao: 'Venda #1028', 
      cliente: 'João Silva',
      valor: 450.0, 
      vencimento: '2025-05-08',
      status: 'pendente'
    },
    { 
      id: 4, 
      descricao: 'Venda #1024', 
      cliente: 'Maria Souza',
      valor: 780.0, 
      vencimento: '2025-05-03',
      status: 'atrasado'
    }
  ],
  pagar: [
    { 
      id: 1, 
      descricao: 'Aluguel', 
      fornecedor: 'Imobiliária XYZ',
      valor: 1800.0, 
      vencimento: '2025-05-10',
      status: 'pendente'
    },
    { 
      id: 2, 
      descricao: 'Energia Elétrica', 
      fornecedor: 'Companhia Elétrica',
      valor: 350.0, 
      vencimento: '2025-05-15',
      status: 'pendente'
    },
    { 
      id: 3, 
      descricao: 'Internet', 
      fornecedor: 'Provedor Net',
      valor: 120.0, 
      vencimento: '2025-05-20',
      status: 'pendente'
    }
  ]
};

const Financeiro = () => {
  const [tipoOperacao, setTipoOperacao] = useState('');
  const [itemEditando, setItemEditando] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [contasDados, setContasDados] = useState(contasDadosIniciais);
  const [contaParaExcluir, setContaParaExcluir] = useState<{id: number, tipo: string} | null>(null);

  const handleNovaConta = (tipo: string) => {
    setTipoOperacao(tipo);
    setItemEditando(null);
    setDialogOpen(true);
  };

  const handleQuitarConta = (item: any, tipo: string) => {
    // Atualiza o status para 'pago'
    const novaListaContas = [...contasDados[tipo as 'receber' | 'pagar']];
    const indice = novaListaContas.findIndex(conta => conta.id === item.id);
    
    if (indice !== -1) {
      novaListaContas[indice] = { ...novaListaContas[indice], status: 'pago' };
      
      setContasDados({
        ...contasDados,
        [tipo]: novaListaContas
      });
      
      toast.success(`Conta ${tipo === 'receber' ? 'recebida' : 'paga'} com sucesso!`);
    }
  };
  
  const handleExcluirConta = (item: any, tipo: string) => {
    setContaParaExcluir({ id: item.id, tipo });
  };
  
  const confirmarExclusaoConta = () => {
    if (contaParaExcluir) {
      const { id, tipo } = contaParaExcluir;
      const tipoChave = tipo as 'receber' | 'pagar';
      
      // Filtra a lista removendo a conta com o ID correspondente
      const novaListaContas = contasDados[tipoChave].filter(conta => conta.id !== id);
      
      setContasDados({
        ...contasDados,
        [tipo]: novaListaContas
      });
      
      toast.success(`Conta ${tipo === 'receber' ? 'a receber' : 'a pagar'} excluída com sucesso!`);
      setContaParaExcluir(null);
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
      case 'atrasado':
        return <Badge variant="destructive">Atrasado</Badge>;
      case 'pago':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Pago</Badge>;
      default:
        return <Badge variant="secondary">Pendente</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Financeiro</h1>
        <p className="text-muted-foreground">
          Gerencie contas a receber e a pagar
        </p>
      </div>

      <Tabs defaultValue="receber" className="w-full">
        <TabsList>
          <TabsTrigger value="receber">Contas a Receber</TabsTrigger>
          <TabsTrigger value="pagar">Contas a Pagar</TabsTrigger>
        </TabsList>

        <TabsContent value="receber" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Contas a Receber</h2>
            <Button onClick={() => handleNovaConta('receber')}>
              <Plus className="mr-2 h-4 w-4" /> Nova Conta
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contasDados.receber.map((conta) => (
                    <TableRow key={conta.id}>
                      <TableCell className="font-medium">{conta.descricao}</TableCell>
                      <TableCell>{conta.cliente}</TableCell>
                      <TableCell>{formatarData(conta.vencimento)}</TableCell>
                      <TableCell className="text-right">{formatarValor(conta.valor)}</TableCell>
                      <TableCell>{getBadgeStatus(conta.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          {conta.status !== 'pago' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-8 px-2 lg:px-3"
                              onClick={() => handleQuitarConta(conta, 'receber')}
                            >
                              <Check className="mr-2 h-3 w-3" /> Receber
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleExcluirConta(conta, 'receber')}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pagar" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Contas a Pagar</h2>
            <Button onClick={() => handleNovaConta('pagar')}>
              <Plus className="mr-2 h-4 w-4" /> Nova Conta
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Fornecedor</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contasDados.pagar.map((conta) => (
                    <TableRow key={conta.id}>
                      <TableCell className="font-medium">{conta.descricao}</TableCell>
                      <TableCell>{conta.fornecedor}</TableCell>
                      <TableCell>{formatarData(conta.vencimento)}</TableCell>
                      <TableCell className="text-right">{formatarValor(conta.valor)}</TableCell>
                      <TableCell>{getBadgeStatus(conta.status)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          {conta.status !== 'pago' && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="h-8 px-2 lg:px-3"
                              onClick={() => handleQuitarConta(conta, 'pagar')}
                            >
                              <DollarSign className="mr-2 h-3 w-3" /> Pagar
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="h-8 px-2 text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleExcluirConta(conta, 'pagar')}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog para adicionar nova conta */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {tipoOperacao === 'receber' ? 'Nova Conta a Receber' : 'Nova Conta a Pagar'}
            </DialogTitle>
            <DialogDescription>
              {tipoOperacao === 'receber' 
                ? 'Cadastre uma nova conta a receber' 
                : 'Cadastre uma nova conta a pagar'
              }
            </DialogDescription>
          </DialogHeader>

          <FormFinanceiro 
            tipo={tipoOperacao} 
            itemEditando={itemEditando} 
            onClose={() => setDialogOpen(false)} 
          />
          
        </DialogContent>
      </Dialog>
      
      {/* AlertDialog para confirmação de exclusão */}
      <AlertDialog 
        open={!!contaParaExcluir} 
        onOpenChange={(open) => !open && setContaParaExcluir(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta conta?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmarExclusaoConta}
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

export default Financeiro;
