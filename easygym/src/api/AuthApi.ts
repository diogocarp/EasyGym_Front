// authApi.ts

export type RegisterPayload = {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  first_name: string;
  last_name: string;
  phone: string;
  customer_doc: string;
  date_of_birth: string; // Ex: "2025-06-22"
};

export const AuthApi = {
   register: async (data: RegisterPayload) => {
      try {
         const response = await fetch("/api/users/register/", {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
         });

         if (response.ok) {
            return { success: true };
         } else {
            const errorData = await response.json();
            const messages = Object.entries(errorData)
            .map(([field, msgs]) => `${field}: ${(msgs as string[]).join(", ")}`)
            .join("\n");
            throw new Error(messages || "Dados inválidos");
         }
      } catch (error: any) {
         throw new Error(error.message || "Erro ao cadastrar usuário... Tente novamente mais tarde");
      }
   },

   verifyEmail: async (token: string) => {
      try {
         const response = await fetch("/api/confirm-email/", {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({ token })
         });

         if (response.ok) {
            return { success: true };
         } else {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Token inválido ou expirado.");
         }
      } catch (error: any) {
         throw new Error(error.message || "Erro ao confirmar e-mail.");
      }
   },

   login: async (username: string, password: string) => {
      try {
         const response = await fetch("/api/token/", {
            method: "POST",
            headers: {
               "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
         });

         if (response.ok) {
            const data = await response.json(); // { access, refresh }
            return data;
         } else {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Credenciais inválidas.");
         }
      } catch (error: any) {
         throw new Error(error.message || "Erro ao fazer login.");
      }
   },

   getProfile: async (token: string) => {
    try {
      const response = await fetch("/api/users/me/", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Erro ao obter perfil.");

      return await response.json();
    } catch (error: any) {
      throw new Error(error.message || "Erro ao buscar dados do usuário.");
    }
  }
};
