"use client"

import { useState } from "react"
import { Search, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select"

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
]

export default function CID10Search() {
  const [searchTerm, setSearchTerm] = useState("")
  const [searchType, setSearchType] = useState("name")
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)

  // Filter data based on search term and type
  const filteredData = sampleCID10Data.filter((item) => {
    return searchType === "name"
      ? item.name.toLowerCase().includes(searchTerm.toLowerCase())
      : item.code.toLowerCase().includes(searchTerm.toLowerCase())
  })

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredData.length / itemsPerPage)

  return (
    <div className="container mx-auto max-w-5xl">
      <div className="mb-6 px-4 py-8 bg-primary/5 border-b border-primary/10">
        <h1 className="text-3xl font-bold mb-2">Busca CID-10</h1>
        <p className="text-muted-foreground">Pesquise códigos CID-10 por nome ou código</p>
      </div>

      <div className="space-y-4 px-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={searchType === "name" ? "Pesquisar por nome do diagnóstico..." : "Pesquisar por código..."}
                className="pl-8"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1) // Reset to first page on new search
                }}
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-9 w-9"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Limpar pesquisa</span>
                </Button>
              )}
            </div>
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

        <div className="rounded-md border bg-white shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Código</TableHead>
                <TableHead>Diagnóstico</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
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
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Mostrando {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredData.length)} de{" "}
              {filteredData.length} resultados
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Página anterior</span>
              </Button>
              <div className="text-sm font-medium">
                Página {currentPage} de {totalPages || 1}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Próxima página</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

