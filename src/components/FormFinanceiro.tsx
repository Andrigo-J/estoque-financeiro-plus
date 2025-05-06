
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const financeiroSchema = z.object({
  descricao: z.string().min(3, { message: "A descrição deve ter pelo menos 3 caracteres" }),
  entidade: z.string().min(2, { message: "Informe um nome válido" }),
  valor: z.coerce.number().positive({ message: "O valor deve ser maior que zero" }),
  vencimento: z.string().min(1, { message: "Selecione uma data de vencimento" }),
  observacoes: z.string().optional(),
});

type FinanceiroFormValues = z.infer<typeof financeiroSchema>;

interface FormFinanceiroProps {
  tipo: string;
  itemEditando?: any;
  onClose: () => void;
}

export function FormFinanceiro({ tipo, itemEditando, onClose }: FormFinanceiroProps) {
  const isReceber = tipo === 'receber';
  
  // Definir valores padrão do formulário
  const defaultValues: Partial<FinanceiroFormValues> = {
    descricao: itemEditando?.descricao || "",
    entidade: itemEditando ? (isReceber ? itemEditando.cliente : itemEditando.fornecedor) : "",
    valor: itemEditando?.valor || 0,
    vencimento: itemEditando?.vencimento || new Date().toISOString().split('T')[0],
    observacoes: itemEditando?.observacoes || "",
  };
  
  const form = useForm<FinanceiroFormValues>({
    resolver: zodResolver(financeiroSchema),
    defaultValues,
  });
  
  function onSubmit(values: FinanceiroFormValues) {
    // Em uma aplicação real, aqui chamaria uma API para salvar os dados
    console.log(values);
    
    // Simular sucesso e fechar o modal
    onClose();
  }
  
  const entidadeLabel = isReceber ? "Cliente" : "Fornecedor";
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="descricao"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input placeholder={`Descrição da ${isReceber ? 'venda' : 'despesa'}`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="entidade"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{entidadeLabel}</FormLabel>
                <FormControl>
                  <Input placeholder={`Nome do ${entidadeLabel.toLowerCase()}`} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="valor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor (R$)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="vencimento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Data de Vencimento</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="observacoes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações</FormLabel>
              <FormControl>
                <Input placeholder="Observações adicionais (opcional)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit">
            {itemEditando ? 'Atualizar' : 'Cadastrar'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
