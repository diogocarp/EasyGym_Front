import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { useMediaQuery, useTheme } from "@mui/material";
import {
  AlterButton,
  PaymentCard,
  PaymentInfo,
  PaymentLabel,
  SettingCard,
  SettingDescription,
  SettingsContainer,
  SettingTitle,
  Value,
  ValueDescription,
  Wrapper,
  Select,
  StatusDiv,
  Text,
  TitleCard,
  Container,
  MoneyIcon,
  MailIcon,
  Title,
  Input,
  InputContainer,
  PaymentsDiv,
  Tag,
  CustomMaskedInput
} from "../../styles/member-styles/PaymentStyles";
import { toast, ToastContainer } from 'react-toastify';

// APIs
import { PaymentsApi } from '../../api/member/PaymentsApi';
import Cookies from 'js-cookie';

// === VARIÁVEIS FIXAS ===
const VENCIMENTOS_FIXOS = ["6", "15", "30"];
const METODOS_PAGAMENTO = [
  { value: "credit", label: "Cartão de crédito" },
  { value: "boleto", label: "Boleto bancário" },
  { value: "pix", label: "Pix" },
];

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#333",
  boxShadow: 24,
  p: 4,
  borderRadius: "8px",
  width: "400px",
  color: "white",
};

type paymentType = {
    id: number;
    subscription: number;
    subscription_details: string;
    amount: string;
    due_date: string;
    paid_date: string;
    status: string;
    external_payment_id: string;
    invoice: string;
    payment_url: string;
    is_active: boolean;
    is_paid: string;
}

const statusMap: Record<string, string> = {
  PENDING: "Pendente",
  PAID: "Pago",
  OVERDUE: "Atrasado",
  CANCELED: "Cancelado",
  PENALTY: "Multa",
};

const Payments = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [openPaymentModal, setOpenPaymentModal] = useState(false);
  const [openDueDateModal, setOpenDueDateModal] = useState(false);

  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [pagamentos, setPagamentos] = useState<paymentType[]>([]);
  const [dueDate, setDueDate] = useState<string>(""); // Inicialmente vazio
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  
  const refreshToken = Cookies.get("refreshToken") || sessionStorage.getItem("refreshToken") || "";

  const [cardData, setCardData] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
    address: "",
  });

  const showToast = (
    message: string,
    type: 'success' | 'error' | 'info',
    duration = 3000
  ) => {
    toast[type](message, {
      position: "bottom-right",
      autoClose: duration,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: type !== 'info',
      draggable: true,
      style: { backgroundColor: "#444", color: "white" },
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const [pagamentos, metodo, vencimento] = await Promise.all([
          PaymentsApi.getPayments(refreshToken),
          PaymentsApi.getPaymentMethod(refreshToken),
          PaymentsApi.getDueDate(refreshToken),
        ]);
        setPagamentos(pagamentos);
        setPaymentMethod(metodo);
        setDueDate(vencimento);
      } catch (err: any) {
        showToast(err.message || "Erro ao carregar dados de pagamento", "error");
      }
    })();
  }, []);

  const handleSavePaymentMethod = async () => {
    if (selectedMethod === "") {
      showToast("Por favor, selecione um meio de pagamento", "error");
      return;
    }

    if (selectedMethod === "credit") {
      const camposObrigatorios = ["name", "number", "expiry", "cvv", "address"] as const;

      const camposVazios = camposObrigatorios.filter(campo => !cardData[campo].trim());

      if (camposVazios.length > 0) {
        showToast("Preencha todos os campos do cartão de crédito", "error");
        return;
      }
    }

    try {
      await PaymentsApi.updatePaymentMethod(refreshToken, selectedMethod, selectedMethod === "credit" ? cardData : undefined);

      const novoMetodo = await PaymentsApi.getPaymentMethod(refreshToken);
      setPaymentMethod(novoMetodo);
      setOpenPaymentModal(false);
      showToast("Forma de pagamento atualizada com sucesso!", "success");
    } catch (err: any) {
      showToast(err.message || "Erro ao atualizar forma de pagamento", "error");
    }

    setOpenPaymentModal(false);
  };

  const handleSendEmail = async (id: number) => {
    try {
      await PaymentsApi.sendEmail(refreshToken, id);

      showToast("Email de pagamento enviado com sucesso!", "success");
    } catch (err: any) {
      showToast(err.message || "Erro ao atualizar forma de pagamento", "error");
    }
  };

  const handleSaveDueDate = async () => {
    try {
      await PaymentsApi.updateDueDate(refreshToken, dueDate);
      showToast("Data de vencimento atualizada!", "success");
      setOpenDueDateModal(false);
    } catch (err: any) {
      showToast(err.message || "Erro ao atualizar vencimento", "error");
    }
  };

  const formatToMonthYear = (dateString: string) => {
    const [year, month] = dateString.split('-');
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    const monthName = months[parseInt(month) - 1];
    return `${monthName} ${year}`;
  }

  const formatToDayMonthYear = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }


  return (
    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", flexWrap: "wrap", width: "100%" }}>
      <Wrapper>
        <Container>
          <TitleCard>
            <MoneyIcon fontSize="large" />
            <Title>Pagamentos</Title>
          </TitleCard>

          <PaymentsDiv>
            {pagamentos.length == 0 && (
              <PaymentCard>
                <PaymentInfo>
                  <div>Nenhum fatura pendente</div>
                </PaymentInfo>
              </PaymentCard>
            )}
            {pagamentos.length > 0 && pagamentos.map((p, i) => (
              <PaymentCard key={i}>
                <PaymentInfo>
                  <div><strong>{formatToMonthYear(p.due_date)}</strong></div>
                  <PaymentLabel>Vencimento {formatToDayMonthYear(p.due_date)}</PaymentLabel>
                </PaymentInfo>
                <Value>
                  <Text style={{ marginBottom: "10px", fontWeight: "bold" }}>Valor</Text>
                  <ValueDescription>{p.amount}</ValueDescription>
                </Value>
                <Value>
                  <Text style={{ marginBottom: "10px", fontWeight: "bold" }}>Data de Pagamento</Text>
                  <ValueDescription>{(p.paid_date) ? formatToDayMonthYear(p.paid_date) : "N/A"}</ValueDescription>
                </Value>
                <StatusDiv>
                  <Text style={{ marginBottom: "10px", fontWeight: "bold" }}>Status</Text>
                  <Tag status={p.status}>{statusMap[p.status] || p.status}</Tag>
                </StatusDiv>
                <Value>
                  {(p.status !== "PAID" && p.status !== "CANCELED") && (
                    <>
                      <Text style={{ marginBottom: "10px", fontWeight: "bold" }}>Enviar email</Text>
                      <MailIcon onClick={() => handleSendEmail(p.id)} style={{ cursor: "pointer" }} fontSize="medium" />
                    </>
                  )}
                </Value>
              </PaymentCard>
            ))}
          </PaymentsDiv>

          <SettingsContainer>
            <SettingCard>
              <SettingTitle>Forma de pagamento</SettingTitle>
              <SettingDescription>{paymentMethod}</SettingDescription>
              <AlterButton onClick={() => {
                setCardData({ name: "", number: "", expiry: "", cvv: "", address: "" });
                setSelectedMethod("");
                setOpenPaymentModal(true);
              }}>
                Alterar
              </AlterButton>
            </SettingCard>

            <SettingCard>
              <SettingTitle>Data de vencimento</SettingTitle>
              <SettingDescription>{`Todo dia ${dueDate} do mês`}</SettingDescription>
              <AlterButton onClick={() => setOpenDueDateModal(true)}>Alterar</AlterButton>
            </SettingCard>
          </SettingsContainer>
        </Container>

        {/* Modal de Forma de Pagamento */}
        <Modal open={openPaymentModal} onClose={() => setOpenPaymentModal(false)}>
          <Box sx={modalStyle}>
            <h3>Cadastrar nova forma de pagamento</h3>
            <br/>
            <label>Escolha a forma de pagamento:</label>
            <Select value={selectedMethod} onChange={(e) => setSelectedMethod(e.target.value)}>
              <option value="">Selecione</option>
              {METODOS_PAGAMENTO.map(m => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </Select>

            {selectedMethod === "credit" && (
                <>
                  <InputContainer>
                    <Input
                      placeholder="Nome no cartão"
                      value={cardData.name}
                      onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                    />
                  </InputContainer>

                  <InputContainer>
                    <CustomMaskedInput
                      placeholder="Número do cartão"
                      value={cardData.number}
                      mask="0000 0000 0000 0000"
                      unmask={true}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardData({ ...cardData, number: e.target.value })}
                    />
                  </InputContainer>

                  <div style={{ display: "flex", gap: "10px" }}>
                    <InputContainer style={{ flex: 1 }}>
                      <CustomMaskedInput
                        placeholder="Validade (MM/AA)"
                        value={cardData.expiry}
                        mask="00/00"
                        unmask={true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardData({ ...cardData, expiry: e.target.value })}
                      />
                    </InputContainer>

                    <InputContainer style={{ flex: 1 }}>
                      <CustomMaskedInput
                        placeholder="CVV"
                        value={cardData.cvv}
                        mask="000"
                        unmask={true}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCardData({ ...cardData, cvv: e.target.value })}
                      />
                    </InputContainer>
                  </div>

                  <InputContainer>
                    <Input
                      placeholder="Endereço de cobrança"
                      value={cardData.address}
                      onChange={(e) => setCardData({ ...cardData, address: e.target.value })}
                    />
                  </InputContainer>
                </>
              )}

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1.5rem" }}>
              <AlterButton onClick={() => setOpenPaymentModal(false)}>Cancelar</AlterButton>
              <AlterButton onClick={handleSavePaymentMethod}>Salvar</AlterButton>
            </div>
          </Box>
        </Modal>

        {/* Modal de Vencimento */}
        <Modal open={openDueDateModal} onClose={() => setOpenDueDateModal(false)}>
          <Box sx={modalStyle}>
            <h3>Editar Data de Vencimento</h3>
            <Select value={dueDate} onChange={(e) => setDueDate(e.target.value)}>
              {VENCIMENTOS_FIXOS.map(v => (
                <option key={v} value={v}>{`Dia ${v} do mês`}</option>
              ))}
            </Select>
            <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1.5rem" }}>
              <AlterButton onClick={() => setOpenDueDateModal(false)}>Cancelar</AlterButton>
              <AlterButton onClick={handleSaveDueDate}>Salvar</AlterButton>
            </div>
          </Box>
        </Modal>
      </Wrapper>
      <ToastContainer />
    </div>
  );
};

export default Payments;
