
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Plus, Tags, Trash2 } from "lucide-react";

interface GerenciadorCategoriasProps {
  categorias: string[];
  onAdicionarCategoria: (categoria: string) => void;
  onRemoverCategoria: (categoria: string) => void;
}

export function GerenciadorCategorias({
  categorias,
  onAdicionarCategoria,
  onRemoverCategoria
}: GerenciadorCategoriasProps) {
  const [novaCategoria, setNovaCategoria] = useState('');

  const handleAdicionarCategoria = () => {
    const categoria = novaCategoria.trim();
    
    if (categoria === '') {
      toast.error('Por favor, digite o nome da categoria.');
      return;
    }
    
    if (categorias.includes(categoria)) {
      toast.error('Esta categoria já existe.');
      return;
    }
    
    onAdicionarCategoria(categoria);
    setNovaCategoria('');
    toast.success(`Categoria "${categoria}" adicionada com sucesso!`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          value={novaCategoria}
          onChange={(e) => setNovaCategoria(e.target.value)}
          placeholder="Nova categoria..."
          className="flex-grow"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdicionarCategoria();
            }
          }}
        />
        <Button onClick={handleAdicionarCategoria}>
          <Plus className="mr-2 h-4 w-4" />
          Adicionar
        </Button>
      </div>
      
      {categorias.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Tags className="mx-auto h-12 w-12 opacity-50" />
          <p className="mt-2">Nenhuma categoria cadastrada</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 mt-4">
          {categorias.map((categoria) => (
            <Badge 
              key={categoria} 
              variant="secondary"
              className="flex items-center gap-1 p-2 text-sm"
            >
              {categoria}
              <Button
                variant="ghost"
                size="sm"
                className="h-5 w-5 p-0 ml-1 hover:bg-destructive hover:text-white rounded-full"
                onClick={() => onRemoverCategoria(categoria)}
              >
                <Trash2 className="h-3 w-3" />
                <span className="sr-only">Remover {categoria}</span>
              </Button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
