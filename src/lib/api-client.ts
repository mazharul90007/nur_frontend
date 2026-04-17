import axios from "axios";

const base =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "http://localhost:3001";

export const api = axios.create({
  baseURL: base,
  headers: { "Content-Type": "application/json" },
  timeout: 30_000,
});
