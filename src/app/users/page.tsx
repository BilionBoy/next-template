"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  MoreHorizontal,
  Edit,
  Trash2,
  Filter,
  Download,
  Users,
  UserCheck,
  UserX,
  Building2,
  Mail,
  Calendar,
  Eye,
  ChevronDown,
} from "lucide-react";

import { DataTable } from "@/components/ui/data-table";
import type { User } from "@/types/user";

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
  {
    id: "4",
    name: "Ana Oliveira",
    email: "ana.oliveira@empresa.com",
    role: "Gerente",
    department: "Comercial",
    status: "active",
    createdAt: "2024-01-18",
    updatedAt: "2024-01-18",
  },
  {
    id: "5",
    name: "Carlos Mendes",
    email: "carlos.mendes@empresa.com",
    role: "Usuário",
    department: "Marketing",
    status: "active",
    createdAt: "2024-01-19",
    updatedAt: "2024-01-19",
  },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const activeUsers = mockUsers.filter(
    (user) => user.status === "active",
  ).length;
  const inactiveUsers = mockUsers.filter(
    (user) => user.status === "inactive",
  ).length;
  const totalUsers = mockUsers.length;

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este usuário?")) {
      console.log("Excluir usuário:", id);
    }
  };

  const columns = [
    {
      key: "user",
      label: "Usuário",
      sortable: true,
    },
    {
      key: "role",
      label: "Perfil",
      sortable: true,
    },
    {
      key: "department",
      label: "Departamento",
      sortable: true,
    },
    {
      key: "status",
      label: "Status",
      sortable: true,
    },
    {
      key: "createdAt",
      label: "Data Criação",
      sortable: true,
    },
  ];

  const formatUserData = filteredUsers.map((user) => ({
    ...user,
    user: (
      <div className="flex items-center space-x-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-semibold text-white">
          {getInitials(user.name)}
        </div>
        <div>
          <div className="font-semibold text-gray-900">{user.name}</div>
          <div className="flex items-center text-sm text-gray-500">
            <Mail className="mr-1 h-3 w-3" />
            {user.email}
          </div>
        </div>
      </div>
    ),
    role: (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          user.role === "Administrador"
            ? "bg-purple-100 text-purple-800"
            : user.role === "Gerente"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-800"
        }`}
      >
        {user.role}
      </span>
    ),
    department: (
      <div className="flex items-center text-gray-900">
        <Building2 className="mr-2 h-4 w-4 text-gray-400" />
        {user.department}
      </div>
    ),
    status: (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          user.status === "active"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {user.status === "active" ? (
          <>
            <UserCheck className="mr-1 h-3 w-3" />
            Ativo
          </>
        ) : (
          <>
            <UserX className="mr-1 h-3 w-3" />
            Inativo
          </>
        )}
      </span>
    ),
    createdAt: (
      <div className="flex items-center text-sm text-gray-500">
        <Calendar className="mr-1 h-3 w-3" />
        {new Date(user.createdAt).toLocaleDateString("pt-BR")}
      </div>
    ),
  }));

  const renderActions = (user: User) => (
    <div className="relative">
      <button
        className="rounded-lg p-2 transition-colors hover:bg-gray-100"
        onClick={() => {
          // Toggle dropdown logic here
        }}
      >
        <MoreHorizontal className="h-4 w-4 text-gray-500" />
      </button>
      {/* Dropdown menu would go here */}
      <div className="absolute right-0 z-10 mt-2 hidden w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
        <div className="py-1">
          <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            <Eye className="mr-2 h-4 w-4" />
            Visualizar
          </button>
          <Link
            href={`/users/${user.id}/edit`}
            className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <Edit className="mr-2 h-4 w-4" />
            Editar
          </Link>
          <button
            onClick={() => handleDelete(user.id)}
            className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Excluir
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <p className="mt-1 text-gray-600">
            Gerencie usuários, permissões e acessos do sistema
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </button>
          <Link
            href="/users/create"
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            <Plus className="mr-2 h-4 w-4" />
            Novo Usuário
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total de Usuários
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {totalUsers}
              </p>
              <p className="mt-1 text-sm text-gray-500">+2 novos este mês</p>
            </div>
            <div className="rounded-lg bg-blue-100 p-3">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Usuários Ativos
              </p>
              <p className="mt-2 text-3xl font-bold text-green-600">
                {activeUsers}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {Math.round((activeUsers / totalUsers) * 100)}% do total
              </p>
            </div>
            <div className="rounded-lg bg-green-100 p-3">
              <UserCheck className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Usuários Inativos
              </p>
              <p className="mt-2 text-3xl font-bold text-red-600">
                {inactiveUsers}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {Math.round((inactiveUsers / totalUsers) * 100)}% do total
              </p>
            </div>
            <div className="rounded-lg bg-red-100 p-3">
              <UserX className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Lista de Usuários
              </h2>
              <p className="text-sm text-gray-600">
                {filteredUsers.length} usuário(s) encontrado(s)
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <input
                type="text"
                placeholder="Buscar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center space-x-3">
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-8 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todos os Status</option>
                  <option value="active">Ativos</option>
                  <option value="inactive">Inativos</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              </div>

              <div className="relative">
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-8 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">Todos os Perfis</option>
                  <option value="Administrador">Administrador</option>
                  <option value="Gerente">Gerente</option>
                  <option value="Usuário">Usuário</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              </div>

              <button className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">
                <Filter className="mr-2 h-4 w-4" />
                Filtros
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <DataTable
            columns={columns}
            data={formatUserData}
            actions={renderActions}
            currentPage={currentPage}
            totalPages={Math.ceil(filteredUsers.length / 10)}
            onPageChange={setCurrentPage}
            totalItems={filteredUsers.length}
          />

          {filteredUsers.length === 0 && (
            <div className="py-12 text-center">
              <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
                <Users className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Nenhum usuário encontrado
              </h3>
              <p className="mb-6 text-gray-500">
                Tente ajustar os filtros ou criar um novo usuário.
              </p>
              <Link
                href="/users/create"
                className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Novo Usuário
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
