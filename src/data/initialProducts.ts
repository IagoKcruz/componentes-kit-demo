import type { Product } from "../types/product";

export const initialProducts: Product[] = [
  { id: 1, codigo: "100-0001", nome: "Objeto 1", categoria: "Opção 1", quantidade: 10, preco: 24.9, status: "Opção 1" },
  { id: 2, codigo: "100-0002", nome: "Objeto 2", categoria: "Opção 1", quantidade: 5, preco: 8.5, status: "Opção 1" },
  { id: 3, codigo: "200-0001", nome: "Objeto 3", categoria: "Opção 2", quantidade: 2, preco: 12.3, status: "Opção 2" },
  { id: 4, codigo: "200-0002", nome: "Objeto 4", categoria: "Opção 2", quantidade: 18, preco: 6.2, status: "Opção 1" },
  { id: 5, codigo: "300-0001", nome: "Objeto 5", categoria: "Opção 3", quantidade: 7, preco: 15.9, status: "Opção 1" },
  { id: 6, codigo: "400-0001", nome: "Objeto 6", categoria: "Opção 4", quantidade: 0, preco: 4.8, status: "Opção 2" },
];
