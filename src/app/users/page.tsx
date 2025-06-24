"use client";

import { useState } from "react";
import Link from "next/link";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { PageHeader } from "@/components/ui/page-header";
import { SearchBar } from "@/components/ui/search-bar";
import { DataTable } from "@/components/ui/data-table";
import type { User } from "@/types/user";

// Ícones SVG
const PlusIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);

const EditIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const TrashIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
    />
  </svg>
);

// Dados mockados
const mockUsers: User[] = [
  {
    id: "1",
    name: "João Silva",
    email: "joao.silva@empresa.com",
    role: "Administrador",
    department: "TI",
    status: "active",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Maria Santos",
    email: "maria.santos@empresa.com",
    role: "Usuário",
    department: "RH",
    status: "active",
    createdAt: "2024-01-16",
    updatedAt: "2024-01-16",
  },
  {
    id: "3",
    name: "Pedro Costa",
    email: "pedro.costa@empresa.com",
    role: "Usuário",
    department: "Financeiro",
    status: "inactive",
    createdAt: "2024-01-17",
    updatedAt: "2024-01-17",
  },
];

const columns = [
  { key: "name", label: "Nome", sortable: true },
  { key: "email", label: "E-mail", sortable: true },
  { key: "role", label: "Perfil", sortable: true },
  { key: "department", label: "Departamento", sortable: true },
  { key: "status", label: "Status", sortable: true },
  { key: "createdAt", label: "Data Criação", sortable: true },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const renderActions = (user: User) => (
    <div className="flex items-center space-x-2">
      <Link
        href={`/users/${user.id}/edit`}
        className="rounded p-1 text-blue-600 hover:bg-blue-50"
        title="Editar"
      >
        <EditIcon />
      </Link>
      <button
        onClick={() => handleDelete(user.id)}
        className="rounded p-1 text-red-600 hover:bg-red-50"
        title="Excluir"
      >
        <TrashIcon />
      </button>
    </div>
  );

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      // Implementar lógica de exclusão
      console.log("Excluir usuário:", id);
    }
  };

  return (
    <div>
      <Breadcrumb items={[{ label: "Usuários" }]} />

      <PageHeader
        title="Usuários"
        description="Gerencie os usuários do sistema"
        action={
          <Link
            href="/users/create"
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            <PlusIcon />
            Incluir
          </Link>
        }
      />

      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="max-w-md flex-1">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Pesquisar usuários..."
            />
          </div>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
            Relatórios
          </button>
        </div>

        <DataTable
          columns={columns}
          data={filteredUsers}
          actions={renderActions}
          currentPage={currentPage}
          totalPages={Math.ceil(filteredUsers.length / 10)}
          onPageChange={setCurrentPage}
          totalItems={filteredUsers.length}
        />
      </div>
    </div>
  );
}
