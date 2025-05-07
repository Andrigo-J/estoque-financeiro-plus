
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Package, Plus, Edit, Search, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { FormCadastroProduto } from '@/components/FormCadastroProduto';
import { toast } from "sonner";

// Dados fictícios de produtos para demonstração
const produtosFicticios = [
  { 
    id: 1, 
    nome: 'Notebook Dell Inspiron', 
    categoria: 'Eletrônicos',
    preco: 3499.90, 
    estoque: 15,
    estoqueMinimo: 5
  },
  { 
    id: 2, 
    nome: 'Monitor LG 24"', 
    categoria: 'Eletrônicos',
    preco: 899.90, 
    estoque: 3,
    estoqueMinimo: 5
  },
  { 
    id: 3, 
    nome: 'Teclado Mecânico Logitech', 
    categoria: 'Periféricos',
    preco: 349.90, 
    estoque: 8,
    estoqueMinimo: 4
  },
  { 
    id: 4, 
    nome: 'Mouse sem fio Microsoft', 
    categoria: 'Periféricos',
    preco: 129.90, 
    estoque: 12,
    estoqueMinimo: 5
  },
  { 
    id: 5, 
    nome: 'Cadeira de Escritório Ergonômica', 
    categoria: 'Móveis',
    preco: 799.90, 
    estoque: 2,
    estoqueMinimo: 3
  },
];

const Produtos = () => {
  const [busca, setBusca] = useState('');
  const [produtoEditando, setProdutoEditando] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [produtos, setProdutos] = useState(produtosFicticios);
  const [produtoParaExcluir, setProdutoParaExcluir] = useState<any>(null);

  // Filtrar produtos baseado na busca
  const produtosFiltrados = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(busca.toLowerCase()) ||
    produto.categoria.toLowerCase().includes(busca.toLowerCase())
  );

  const handleNovoProduto = () => {
    setProdutoEditando(null);
    setDialogOpen(true);
  };

  const handleEditarProduto = (produto: any) => {
    setProdutoEditando(produto);
    setDialogOpen(true);
  };
  
  const handleExcluirProduto = (produto: any) => {
    setProdutoParaExcluir(produto);
  };
  
  const confirmarExclusaoProduto = () => {
    if (produtoParaExcluir) {
      // Filtra o array removendo o produto com o ID correspondente
      const novosProdutos = produtos.filter(p => p.id !== produtoParaExcluir.id);
      setProdutos(novosProdutos);
      toast.success(`Produto "${produtoParaExcluir.nome}" excluído com sucesso!`);
      setProdutoParaExcluir(null);
    }
  };

  const formatarPreco = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(valor);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Produtos</h1>
          <p className="text-muted-foreground">
            Gerencie seu catálogo de produtos
          </p>
        </div>
        <Button onClick={handleNovoProduto}>
          <Plus className="mr-2 h-4 w-4" /> Novo Produto
        </Button>
      </div>

      {/* Barra de pesquisa */}
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="Buscar produtos..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="w-full"
          icon={Search}
        />
      </div>

      {/* Tabela de produtos */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">ID</TableHead>
              <TableHead>Produto</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead className="text-center">Estoque</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {produtosFiltrados.map((produto) => (
              <TableRow key={produto.id}>
                <TableCell className="font-medium">{produto.id}</TableCell>
                <TableCell>{produto.nome}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{produto.categoria}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  {formatarPreco(produto.preco)}
                </TableCell>
                <TableCell className="text-center">
                  <span className={`font-medium ${produto.estoque < produto.estoqueMinimo ? 'text-red-500' : 'text-green-600'}`}>
                    {produto.estoque}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditarProduto(produto)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleExcluirProduto(produto)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialog para adicionar/editar produto */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {produtoEditando ? 'Editar Produto' : 'Novo Produto'}
            </DialogTitle>
            <DialogDescription>
              {produtoEditando 
                ? 'Edite as informações do produto' 
                : 'Preencha as informações para cadastrar um novo produto'
              }
            </DialogDescription>
          </DialogHeader>

          <FormCadastroProduto 
            produtoEditando={produtoEditando} 
            onClose={() => setDialogOpen(false)} 
          />
          
        </DialogContent>
      </Dialog>
      
      {/* AlertDialog para confirmação de exclusão */}
      <AlertDialog 
        open={!!produtoParaExcluir} 
        onOpenChange={(open) => !open && setProdutoParaExcluir(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o produto "{produtoParaExcluir?.nome}"?
              Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmarExclusaoProduto}
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

export default Produtos;
