import jsPDF from "jspdf";

export const UserApi = {
  // GET /api/users/me/
  getUser: async (refreshToken: string) => {
    const accessToken = await UserApi.getNewAccessToken(refreshToken);
    const res = await fetch("/api/users/me/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.detail || "Erro ao buscar usuário");
    }

    const user = await res.json();
    const { full_name, email, phone, customer_doc, date_of_birth, id } = user;
    return { full_name, email, phone, customer_doc, date_of_birth, id };
  },

  // PATCH /api/users/{id}/
  updateUser: async (
    refreshToken: string,
    id: number,
    updatedData: { full_name: string; phone: string; date_of_birth: string }
  ) => {
    const accessToken = await UserApi.getNewAccessToken(refreshToken);
    const res = await fetch(`/api/users/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Erro ao atualizar usuário");
    }

    return await res.json();
  },

  // POST /api/users/change-password/
  changePassword: async (
    refreshToken: string,
    current_password: string,
    new_password: string,
    password_confirmation: string
  ) => {
    const accessToken = await UserApi.getNewAccessToken(refreshToken);
    const res = await fetch("/api/users/change-password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ current_password, new_password, password_confirmation }),
    });

    const responseBody = await res.json();
    if (!res.ok) {
      const message = responseBody.message || "Erro ao trocar senha";
      throw new Error(message);
    }

    return responseBody;
  },

  // GET /api/access-logs/
  getAccessLogsPdf: async (
    refreshToken: string,
    userId: number,
    start: string,
    end: string
  ) => {
    const accessToken = await UserApi.getNewAccessToken(refreshToken);
    const url = `/api/access-logs/?user_id=${userId}&timestamp__gte=${start}&timestamp__lte=${end}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Erro ao buscar logs de acesso");
    }

    const logs = await res.json();

    const formatDateTime = (isoString: string) => {
      const date = new Date(isoString);
      const data = date.toLocaleDateString("pt-BR");
      const hora = date.toLocaleTimeString("pt-BR", { hour12: false });
      return [data, hora];
    };

    // Gera o PDF
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Log de acessos", 10, 10);
    doc.setFontSize(12);
    doc.text("Data | Hora", 10, 20);

    let y = 30;
    logs.forEach((log: any) => {
      const [data, hora] = formatDateTime(log.timestamp);
      doc.text(`${data} | ${hora}`, 10, y);
      y += 10;
      if (y > 280) { // adiciona nova página se necessário
        doc.addPage();
        y = 20;
      }
    });

    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, "-");
    doc.save(`log-de-acessos-${timestamp}.pdf`);
  },

  getNewAccessToken: async (refreshToken: string): Promise<string> => {
    const res = await fetch("/api/token/refresh/", {
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
    console.log(data);
    return data.access;
  },
};