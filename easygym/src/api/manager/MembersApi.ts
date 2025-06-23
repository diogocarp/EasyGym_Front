export type MemberType = {
  id: number;
  name: string;
  cpf: string;
  email: string;
  tel: string;
  birth: string;
  status: boolean;
};

export interface UserResponse {
  id: number;
  full_name:string;
  email: string;
  username: string;
  phone: string;
  date_of_birth: string;
  is_active: boolean;
  customer_doc: string;
  role: string;
}

export const MembersApi = {

getNewAccessToken: async (refreshToken: string): Promise<string> => {
    const res = await fetch("https://gym.mestracegonhas.com/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"refresh": refreshToken}),
    });

    console.log(JSON.stringify({"refresh": refreshToken}));

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Erro ao renovar token");
    }

    const data = await res.json();
    return data.access;
  },

  getMembers: async (auth: string): Promise<MemberType[]> => {

    const accessToken = await MembersApi.getNewAccessToken(auth);

    const response = await fetch("https://gym.mestracegonhas.com/api/users/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Erro ao buscar membros.");
    }

    const data: UserResponse[] = await response.json();

    return data.map((user) => ({
      id: user.id,
      name: user.full_name,
      email: user.email,
      cpf: user.customer_doc,
      tel: user.phone,
      birth: user.date_of_birth,
      status: user.is_active,
    }));
  },

  filterMembers: async (
    auth: string,
    filters: Partial<{
      full_name: string;
      full_name__icontains:string;
      customer_doc:string;
      customer_doc__icontains:string;
      email: string;
      email__icontains: string;
      first_name: string;
      first_name__icontains: string;
      last_name: string;
      last_name__icontains: string;
      username: string;
      username__icontains: string;
      role: string;
    }>
  ): Promise<MemberType[]> => {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(filters)) {
      if (value) query.append(key, value);
    }

    const accessToken = await MembersApi.getNewAccessToken(auth);

    const response = await fetch(`https://gym.mestracegonhas.com/api/users/?${query.toString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Erro ao filtrar membros.");
    }

    const data: UserResponse[] = await response.json();

    return data.map((user) => ({
      id: user.id,
      name: user.full_name,
      email: user.email,
      cpf: user.customer_doc.replace(/[.-]/g, ""),
      tel: user.phone,
      birth: user.date_of_birth,
      status: user.is_active
    }));
  },

  updateMember: async (auth: string, updated: MemberType): Promise<MemberType> => {

    const accessToken = await MembersApi.getNewAccessToken(auth);

    const response = await fetch(`https://gym.mestracegonhas.com/api/users/${updated.id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        full_name: updated.name,
        email: updated.email,
        phone: updated.tel,
        date_of_birth: updated.birth,
        is_active: updated.status,
        customer_doc: updated.cpf.replace(/[.-]/g, "")
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Erro ao atualizar membro.");
    }

    const user: UserResponse = await response.json();

    return {
      id: user.id,
      name: user.full_name,
      email: user.email,
      cpf: user.customer_doc,
      tel: user.phone,
      birth: user.date_of_birth,
      status: user.is_active
    };
  }
};
