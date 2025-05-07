
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
import { Package, Plus, Edit, Search, Trash2, Tags } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { FormCadastroProduto } from '@/components/FormCadastroProduto';
import { GerenciadorCategorias } from '@/components/GerenciadorCategorias';
import { toast } from "sonner";

// Dados iniciais vazios
const produtosFicticios = [];

const Produtos = () => {
  const [busca, setBusca] = useState('');
  const [produtoEditando, setProdutoEditando] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [categoriasDialogOpen, setCategoriasDialogOpen] = useState(false);
  const [produtos, setProdutos] = useState(produtosFicticios);
  const [produtoParaExcluir, setProdutoParaExcluir] = useState<any>(null);
  const [categorias, setCategorias] = useState<string[]>([]);

  // Filtrar produtos baseado na busca
  const produtosFiltrados = produtos.filter(produto =>
    produto.nome?.toLowerCase().includes(busca.toLowerCase()) ||
    produto.categoria?.toLowerCase().includes(busca.toLowerCase())
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

  const handleAdicionarCategoria = (categoria: string) => {
    setCategorias([...categorias, categoria]);
  };

  const handleRemoverCategoria = (categoria: string) => {
    // Verificar se a categoria está sendo usada por algum produto
    const categoriaEmUso = produtos.some(produto => produto.categoria === categoria);
    
    if (categoriaEmUso) {
      toast.error(`Não é possível remover a categoria "${categoria}" pois está sendo usada por produtos.`);
      return;
    }
    
    setCategorias(categorias.filter(c => c !== categoria));
    toast.success(`Categoria "${categoria}" removida com sucesso!`);
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
        <div className="flex gap-2">
          <Button onClick={() => setCategoriasDialogOpen(true)} variant="outline">
            <Tags className="mr-2 h-4 w-4" /> Categorias
          </Button>
          <Button onClick={handleNovoProduto}>
            <Plus className="mr-2 h-4 w-4" /> Novo Produto
          </Button>
        </div>
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

      {/* Mensagem quando não há produtos */}
      {produtos.length === 0 && (
        <div className="text-center py-10">
          <Package className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-2 text-lg font-medium">Nenhum produto cadastrado</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Comece adicionando um novo produto ao seu catálogo.
          </p>
          <div className="mt-6">
            <Button onClick={handleNovoProduto}>
              <Plus className="mr-2 h-4 w-4" /> Adicionar Produto
            </Button>
          </div>
        </div>
      )}

      {/* Tabela de produtos (só aparece quando houver produtos) */}
      {produtos.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Estoque</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {produtosFiltrados.map((produto) => (
              <TableRow key={produto.id}>
                <TableCell className="font-medium">{produto.nome}</TableCell>
                <TableCell>
                  {produto.categoria ? (
                    <Badge variant="outline">{produto.categoria}</Badge>
                  ) : (
                    <span className="text-muted-foreground">Sem categoria</span>
                  )}
                </TableCell>
                <TableCell>{formatarPreco(produto.preco)}</TableCell>
                <TableCell>
                  {produto.estoque <= produto.estoqueMinimo ? (
                    <span className="text-red-500">{produto.estoque}</span>
                  ) : (
                    produto.estoque
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditarProduto(produto)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Editar</span>
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleExcluirProduto(produto)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Excluir</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

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
            categorias={categorias}
          />
          
        </DialogContent>
      </Dialog>

      {/* Dialog para gerenciar categorias */}
      <Dialog open={categoriasDialogOpen} onOpenChange={setCategoriasDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Gerenciar Categorias</DialogTitle>
            <DialogDescription>
              Adicione ou remova categorias para seus produtos
            </DialogDescription>
          </DialogHeader>

          <GerenciadorCategorias 
            categorias={categorias} 
            onAdicionarCategoria={handleAdicionarCategoria}
            onRemoverCategoria={handleRemoverCategoria}
          />
          
          <div className="flex justify-end">
            <Button 
              onClick={() => setCategoriasDialogOpen(false)}
              className="mt-4"
            >
              Fechar
            </Button>
          </div>
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
