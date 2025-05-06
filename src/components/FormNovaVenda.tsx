
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, TableBody, TableCell, TableHead, 
  TableHeader, TableRow 
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus, Search } from 'lucide-react';

// Produtos fictícios para demonstração
const produtosDisponiveis = [
  { id: 1, nome: 'Notebook Dell Inspiron', preco: 3499.90, estoque: 15 },
  { id: 2, nome: 'Monitor LG 24"', preco: 899.90, estoque: 3 },
  { id: 3, nome: 'Teclado Mecânico Logitech', preco: 349.90, estoque: 8 },
  { id: 4, nome: 'Mouse sem fio Microsoft', preco: 129.90, estoque: 12 },
  { id: 5, nome: 'Cadeira de Escritório Ergonômica', preco: 799.90, estoque: 2 },
];

interface FormNovaVendaProps {
  onClose: () => void;
}

export function FormNovaVenda({ onClose }: FormNovaVendaProps) {
  const [cliente, setCliente] = useState('');
  const [busca, setBusca] = useState('');
  const [itensVenda, setItensVenda] = useState<any[]>([]);
  
  // Filtrar produtos baseado na busca
  const produtosFiltrados = produtosDisponiveis.filter(produto =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const handleAdicionarProduto = (produto: any) => {
    // Verificar se o produto já está na lista
    const itemExistente = itensVenda.find(item => item.id === produto.id);
    
    if (itemExistente) {
      // Se o produto já existe, incrementar a quantidade
      const novosItens = itensVenda.map(item => 
        item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item
      );
      setItensVenda(novosItens);
    } else {
      // Se o produto não existe, adicionar à lista
      setItensVenda([...itensVenda, { ...produto, quantidade: 1 }]);
    }
    
    // Limpar busca após adicionar
    setBusca('');
  };

  const handleRemoverItem = (id: number) => {
    setItensVenda(itensVenda.filter(item => item.id !== id));
  };

  const handleQuantidadeChange = (id: number, quantidade: number) => {
    // Não permitir valores negativos ou zero
    if (quantidade <= 0) return;
    
    const novosItens = itensVenda.map(item => 
      item.id === id ? { ...item, quantidade } : item
    );
    setItensVenda(novosItens);
  };

  const calcularSubtotal = (preco: number, quantidade: number): number => {
    return preco * quantidade;
  };

  const calcularTotal = (): number => {
    return itensVenda.reduce((total, item) => 
      total + calcularSubtotal(item.preco, item.quantidade), 0);
  };

  const handleSalvar = () => {
    // Validar se há cliente e itens
    if (!cliente || itensVenda.length === 0) {
      alert('Por favor, informe o cliente e adicione pelo menos um produto.');
      return;
    }
    
    // Em uma aplicação real, aqui chamaria uma API para salvar os dados
    const venda = {
      cliente,
      itens: itensVenda,
      total: calcularTotal(),
      data: new Date().toISOString()
    };
    console.log('Venda a ser salva:', venda);
    
    // Fechar o formulário
    onClose();
  };

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(valor);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cliente">Cliente</Label>
          <Select onValueChange={setCliente}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um cliente" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Empresa A">Empresa A</SelectItem>
              <SelectItem value="Empresa B">Empresa B</SelectItem>
              <SelectItem value="João Silva">João Silva</SelectItem>
              <SelectItem value="Maria Souza">Maria Souza</SelectItem>
              <SelectItem value="Carlos Oliveira">Carlos Oliveira</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="dataVenda">Data da Venda</Label>
          <Input 
            type="date" 
            id="dataVenda" 
            defaultValue={new Date().toISOString().split('T')[0]} 
            disabled
          />
        </div>
      </div>
      
      <div>
        <Label>Adicionar Produtos</Label>
        <div className="flex w-full items-center space-x-2 mt-1.5">
          <Input
            type="text"
            placeholder="Buscar produtos..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full"
          />
        </div>
        
        {/* Lista de produtos filtrados */}
        {busca && (
          <div className="border rounded-md mt-2 max-h-60 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead className="text-right">Preço</TableHead>
                  <TableHead className="text-center">Estoque</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {produtosFiltrados.length > 0 ? (
                  produtosFiltrados.map((produto) => (
                    <TableRow key={produto.id}>
                      <TableCell>{produto.nome}</TableCell>
                      <TableCell className="text-right">{formatarValor(produto.preco)}</TableCell>
                      <TableCell className="text-center">{produto.estoque}</TableCell>
                      <TableCell>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleAdicionarProduto(produto)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-4 text-muted-foreground">
                      Nenhum produto encontrado
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      
      {/* Itens adicionados */}
      <div>
        <h3 className="text-sm font-medium mb-2">Itens da Venda</h3>
        {itensVenda.length > 0 ? (
          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Produto</TableHead>
                  <TableHead className="text-center">Quantidade</TableHead>
                  <TableHead className="text-right">Valor Unit.</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {itensVenda.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.nome}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7"
                          onClick={() => handleQuantidadeChange(item.id, item.quantidade - 1)}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">
                          {item.quantidade}
                        </span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-7 w-7"
                          onClick={() => handleQuantidadeChange(item.id, item.quantidade + 1)}
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">{formatarValor(item.preco)}</TableCell>
                    <TableCell className="text-right font-medium">
                      {formatarValor(calcularSubtotal(item.preco, item.quantidade))}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-7 w-7"
                        onClick={() => handleRemoverItem(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="border rounded-md py-8 text-center text-muted-foreground">
            Nenhum item adicionado
          </div>
        )}
      </div>
      
      {/* Total */}
      {itensVenda.length > 0 && (
        <div className="flex justify-end text-lg">
          <span className="font-medium mr-2">Total:</span>
          <span className="font-bold">{formatarValor(calcularTotal())}</span>
        </div>
      )}
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" type="button" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="button" onClick={handleSalvar}>
          Finalizar Venda
        </Button>
      </div>
    </div>
  );
}
