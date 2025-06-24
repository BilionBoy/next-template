"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { PageHeader } from "@/components/ui/page-header";
import type { User, UpdateUserData } from "@/types/user";

// Mock data - em um app real, isso viria de uma API
const mockUser: User = {
  id: "1",
  name: "João Silva",
  email: "joao.silva@empresa.com",
  role: "Administrador",
  department: "TI",
  status: "active",
  createdAt: "2024-01-15",
  updatedAt: "2024-01-15",
};

export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [formData, setFormData] = useState<UpdateUserData>({
    id: "",
    name: "",
    email: "",
    role: "",
    department: "",
    status: "active",
  });

  useEffect(() => {
    // Em um app real, você faria uma chamada à API aqui
    setFormData({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
      role: mockUser.role,
      department: mockUser.department,
      status: mockUser.status,
    });
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Implementar lógica de atualização
    console.log("Atualizar usuário:", formData);

    // Simular sucesso e redirecionar
    alert("Usuário atualizado com sucesso!");
    router.push("/users");
  };

  const handleChange = (field: keyof UpdateUserData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <Breadcrumb
        items={[{ label: "Usuários", href: "/users" }, { label: "Editar" }]}
      />

      <PageHeader title="Editar Usuário" />

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Nome Completo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="Digite o nome completo"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                E-mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                placeholder="Digite o e-mail"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Perfil <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.role}
                onChange={(e) => handleChange("role", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione uma opção</option>
                <option value="Administrador">Administrador</option>
                <option value="Usuário">Usuário</option>
                <option value="Visualizador">Visualizador</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Departamento <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.department}
                onChange={(e) => handleChange("department", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecione uma opção</option>
                <option value="TI">Tecnologia da Informação</option>
                <option value="RH">Recursos Humanos</option>
                <option value="Financeiro">Financeiro</option>
                <option value="Comercial">Comercial</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.status}
                onChange={(e) =>
                  handleChange(
                    "status",
                    e.target.value as "active" | "inactive",
                  )
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Ativo</option>
                <option value="inactive">Inativo</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-4 border-t border-gray-200 pt-6">
            <button
              type="submit"
              className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700"
            >
              Salvar
            </button>
            <button
              type="button"
              onClick={() => router.push("/users")}
              className="inline-flex items-center rounded-lg border border-gray-300 px-6 py-2 text-gray-700 transition-colors hover:bg-gray-50"
            >
              Voltar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
