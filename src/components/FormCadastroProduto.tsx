
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Esquema de validação com zod
const produtoSchema = z.object({
  nome: z.string().min(3, { message: "O nome deve ter pelo menos 3 caracteres" }),
  descricao: z.string().optional(),
  categoria: z.string({ required_error: "Selecione uma categoria" }),
  preco: z.coerce.number().min(0.01, { message: "O preço deve ser maior que zero" }),
  estoque: z.coerce.number().int().min(0, { message: "A quantidade não pode ser negativa" }),
  estoqueMinimo: z.coerce.number().int().min(0, { message: "O estoque mínimo não pode ser negativo" }),
  codigoBarras: z.string().optional(),
  unidade: z.string().default("UN"),
});

type ProdutoFormValues = z.infer<typeof produtoSchema>;

interface FormCadastroProdutoProps {
  produtoEditando?: any;
  onClose: () => void;
}

export function FormCadastroProduto({ produtoEditando, onClose }: FormCadastroProdutoProps) {
  // Definir valores padrão do formulário
  const defaultValues: Partial<ProdutoFormValues> = {
    nome: produtoEditando?.nome || "",
    descricao: produtoEditando?.descricao || "",
    categoria: produtoEditando?.categoria || "",
    preco: produtoEditando?.preco || 0,
    estoque: produtoEditando?.estoque || 0,
    estoqueMinimo: produtoEditando?.estoqueMinimo || 0,
    codigoBarras: produtoEditando?.codigoBarras || "",
    unidade: produtoEditando?.unidade || "UN",
  };
  
  const form = useForm<ProdutoFormValues>({
    resolver: zodResolver(produtoSchema),
    defaultValues,
  });
  
  function onSubmit(values: ProdutoFormValues) {
    // Em uma aplicação real, aqui chamaria uma API para salvar os dados
    console.log(values);
    
    // Simular sucesso e fechar o modal
    onClose();
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="nome"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Produto</FormLabel>
                <FormControl>
                  <Input placeholder="Digite o nome do produto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="categoria"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Eletrônicos">Eletrônicos</SelectItem>
                    <SelectItem value="Periféricos">Periféricos</SelectItem>
                    <SelectItem value="Móveis">Móveis</SelectItem>
                    <SelectItem value="Informática">Informática</SelectItem>
                    <SelectItem value="Papelaria">Papelaria</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="preco"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preço (R$)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="estoque"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estoque</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="estoqueMinimo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estoque Mínimo</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="codigoBarras"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Código de Barras</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="unidade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unidade</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma unidade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="UN">Unidade (UN)</SelectItem>
                    <SelectItem value="KG">Quilograma (KG)</SelectItem>
                    <SelectItem value="CX">Caixa (CX)</SelectItem>
                    <SelectItem value="PCT">Pacote (PCT)</SelectItem>
                    <SelectItem value="LT">Litro (LT)</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Digite uma descrição detalhada do produto..."
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Detalhes adicionais sobre o produto, especificações, etc.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            {produtoEditando ? 'Atualizar' : 'Cadastrar'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
