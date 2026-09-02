import { useState } from "react";
import { ToastType, mostrarNotificacao } from "@iagokcruz/componentes-kit";
import { fakeApiCall } from "../fakeApi";
import { initialProducts } from "../data/initialProducts";
import type { Product } from "../types/product";

/** Estado e ações de CRUD dos produtos exibidos na grid — extraído da página pra deixar o
 * componente focado só em layout/composição. */
export function useProducts() {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  function createDraft(): Product {
    const nextId = products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1;
    return { id: nextId, codigo: "", nome: "", categoria: "", quantidade: 0, preco: 0, status: "Opção 1" };
  }

  async function createProduct(newProduct: Product) {
    await fakeApiCall(newProduct);
    setProducts((current) => [...current, newProduct]);
    mostrarNotificacao(ToastType.Sucesso, `"${newProduct.nome}" criado com sucesso.`);
  }

  async function removeProduct(product: Product) {
    await fakeApiCall(product);
    setProducts((current) => current.filter((item) => item.id !== product.id));
    mostrarNotificacao(ToastType.Informacao, `"${product.nome}" excluído.`);
  }

  async function saveProduct(edited: Product) {
    await fakeApiCall(edited);
    setProducts((current) => current.map((item) => (item.id === edited.id ? edited : item)));
    mostrarNotificacao(ToastType.Sucesso, `"${edited.nome}" atualizado com sucesso.`);
  }

  function duplicateProduct(product: Product) {
    const nextId = Math.max(...products.map((p) => p.id)) + 1;
    setProducts((current) => [...current, { ...product, id: nextId, nome: `${product.nome} (cópia)` }]);
    mostrarNotificacao(ToastType.Informacao, `"${product.nome}" duplicado.`);
  }

  return { products, createDraft, createProduct, removeProduct, saveProduct, duplicateProduct };
}
