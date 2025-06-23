import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const UserApi = {
  // GET /api/users/me/
  getUser: async (refreshToken: string) => {
    const accessToken = await UserApi.getNewAccessToken(refreshToken);
    const res = await fetch("https://gym.mestracegonhas.com/api/users/me/", {
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
    const res = await fetch(`https://gym.mestracegonhas.com/api/users/${id}/`, {
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
    const res = await fetch("https://gym.mestracegonhas.com/api/users/change-password/", {
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
  getNewAccessToken: async (refreshToken: string): Promise<string> => {
    const res = await fetch("https://gym.mestracegonhas.com/api/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Erro ao renovar token");
    }

    const data = await res.json();
    return data.access;
  },

  getAccessLogsPdf: async (
    refreshToken: string,
    userId: number,
    start: string,
    end: string,
    logoDataUrl?: string
  ) => {
    // Obtem access token
    const accessToken = await UserApi.getNewAccessToken(refreshToken);

    // Monta URL para consulta dos logs com filtros de data e usuário
    const url = `https://gym.mestracegonhas.com/api/access-logs/?user_id=${userId}&timestamp__gte=${start}&timestamp__lte=${end}`;

    // Faz requisição
    const res = await fetch(url, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Erro ao buscar logs de acesso");
    }

    // Recebe os logs JSON
    const logs: Array<{
      timestamp: string;
      user_name?: string;
      user_id?: number;
      allowed: boolean;
    }> = await res.json();

    // Função auxiliar para formatar data e hora
    const formatDateTime = (isoString: string): [string, string] => {
      const date = new Date(isoString);
      const data = date.toLocaleDateString("pt-BR");
      const hora = date.toLocaleTimeString("pt-BR", { hour12: false });
      return [data, hora];
    };

    // Cria documento PDF
    const doc = new jsPDF();

    // Adiciona logo se houver
    if (logoDataUrl) {
      doc.addImage(logoDataUrl, "PNG", 10, 5, 30, 20);
    }

    // Título com estilo
    doc.setTextColor("#DD212F");
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Log de Acessos", 60, 20);

    // Subtítulo com data e hora da geração
    doc.setTextColor("#444444");
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Relatório gerado em: ${new Date().toLocaleString("pt-BR")}`, 60, 28);

    // Define colunas da tabela
    const tableColumn = ["Data", "Hora", "Status"];

    // Monta as linhas da tabela
    const tableRows = logs.map((log) => {
      const [data, hora] = formatDateTime(log.timestamp);
      const status = log.allowed ? "Permitido" : "Negado";
      return [data, hora, status];
    });

    // Usa autoTable para inserir a tabela no PDF
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      theme: "striped",
      headStyles: { fillColor: "#DD212F", textColor: "#fff" },
      styles: { fontSize: 10 },
      margin: { left: 10, right: 10 },
    });

    // Gera timestamp para nome do arquivo
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

    // Salva PDF
    doc.save(`log-de-acessos-${timestamp}.pdf`);
  },
};