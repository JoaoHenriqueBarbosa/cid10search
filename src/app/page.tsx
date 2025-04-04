"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

// Sample data for demonstration
const sampleCID10Data = [
  { code: "A00", name: "Cholera" },
  { code: "A15", name: "Respiratory tuberculosis" },
  { code: "B01", name: "Varicella [chickenpox]" },
  { code: "C50", name: "Malignant neoplasm of breast" },
  { code: "E11", name: "Type 2 diabetes mellitus" },
  { code: "F32", name: "Depressive episode" },
  { code: "G40", name: "Epilepsy" },
  { code: "I21", name: "Acute myocardial infarction" },
  { code: "J45", name: "Asthma" },
  { code: "K29", name: "Gastritis and duodenitis" },
  { code: "L40", name: "Psoriasis" },
  { code: "M54", name: "Dorsalgia" },
];

export default function CID10Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("name");

  // Filter data based on search term and type
  const filteredData = sampleCID10Data.filter((item) => {
    return searchType === "name"
      ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
      : item.code.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="flex flex-col">
        <div className="mb-6 py-4 bg-secondary border-b border-primary/10">
          <div className="container mx-auto max-w-5xl px-4">
            <h1 className="text-3xl font-bold mb-2">Busca CID-10</h1>
            <p className="text-muted-foreground">
              Pesquise códigos CID-10 por nome ou código
            </p>
          </div>
        </div>
        <div className="flex justify-between gap-3 mb-3 px-6">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={
                searchType === "name"
                  ? "Pesquisar por nome do diagnóstico..."
                  : "Pesquisar por código..."
              }
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={searchType} onValueChange={setSearchType}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Pesquisar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Nome</SelectItem>
                <SelectItem value="code">Código</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div>
        <div className="container mx-auto max-w-5xl flex-1 px-6 pb-6">
          <div className="rounded-md border bg-white shadow-sm">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Código</TableHead>
                  <TableHead>Diagnóstico</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((item) => (
                    <TableRow key={item.code}>
                      <TableCell className="font-medium">{item.code}</TableCell>
                      <TableCell>{item.name}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} className="h-24 text-center">
                      Nenhum resultado encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {filteredData.length > 0 && (
            <div className="flex items-center justify-between pt-3">
              <div className="text-sm text-muted-foreground">
                {filteredData.length} resultados encontrados
              </div>
            </div>
          )}
        </div>
      </div>
      <footer className="py-4 bg-secondary border-t border-primary/10">
        <div className="container mx-auto max-w-5xl px-4">
          <p className="text-sm text-center text-muted-foreground">
            Buscador CID-10 oferecido por Dr. Marcelo Amarante
          </p>
        </div>
      </footer>
    </div>
  );
}
