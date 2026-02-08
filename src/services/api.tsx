import axios from "axios";

const client = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export async function getProducts() {
  const d = await client.get("/products");
  return d.data;
}

export async function getProduct(id: number|string) {
  const d = await client.get(`/products/${id}`);
  return d.data;
}
export async function abc() {
  const d = await client.get('/products')
  return d.data;
}
