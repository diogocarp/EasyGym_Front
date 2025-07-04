import { useState, useEffect } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { Lock } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import logoDataUrl from "../../assets/img/home-assets/logo-quadrado-v2.png";

// APIs
import { UserApi } from '../../api/member/UserApi';
import Cookies from 'js-cookie';

import {
  Button,
  ButtonContainer,
  Card,
  Container,
  CustomMaskedInput,
  Input,
  InputContainer,
  Row,
  Section,
  SectionTitle,
  SettingsIcon,
  Title,
  TitleBox
} from '../../styles/member-styles/SettingsStyles';

import { toast, ToastContainer } from 'react-toastify';

const Setting = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  const [formData, setFormData] = useState<any>({});
  const [senhaAntiga, setSenhaAntiga] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');

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

  const refreshToken = Cookies.get("refreshToken") || sessionStorage.getItem("refreshToken") || "";

  useEffect(() => {
    (async () => {
      try {
        const user = await UserApi.getUser(refreshToken);
        setFormData(user);
      } catch (err: any) {
        showToast(err.message || "Erro desconhecido", "error");
      }
    })();
  }, [refreshToken]);

  const handleUpdateUserData = async () => {
    const { full_name, phone, date_of_birth, id } = formData;
    if (!full_name || !phone || !date_of_birth || !id) {
      showToast("Por favor, preencha todos os campos.", "error", 5000);
      return;
    }

    try {
      await UserApi.updateUser(refreshToken, id, formData);
      showToast("Dados atualizados com sucesso!", "success");
    } catch (err: any) {
      showToast(err.message || "Erro desconhecido", "error");
    }
  };

  const handleUpdatePassword = async () => {
    if (!senhaAntiga || !novaSenha || !confirmaSenha) {
      showToast("Preencha todos os campos de senha.", "error", 5000);
      return;
    }

    if (novaSenha !== confirmaSenha) {
      showToast("As senhas não coincidem.", "error", 5000);
      return;
    }

    try {
      await UserApi.changePassword(refreshToken, senhaAntiga, novaSenha, confirmaSenha);
      setSenhaAntiga('');
      setNovaSenha('');
      setConfirmaSenha('');
      showToast("Senha alterada com sucesso!", "success");
    } catch (err: any) {
      showToast(err.message || "Erro desconhecido", "error");
    }
  };

  const handleFilterLogs = async () => {
    const { id } = formData;

    if (!dataInicio || !dataFim) {
      showToast("Preencha as datas de início e fim para gerar o relatório.", "error", 5000);
      return;
    }

    try {
      const result = await UserApi.getAccessLogsPdf(refreshToken, id, dataInicio, dataFim, logoDataUrl);
      console.log(result)
      //window.open(result.url, "_blank");
      showToast("Relatório gerado com sucesso!", "success", 4000);
    } catch (err: any) {
      showToast(err.message || "Erro desconhecido", "error");
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: isMobile ? 'column' : 'row',
      flexWrap: "wrap",
      width: "100%",
      boxSizing: "border-box"
    }}>
      <Container style={{ width: "100%" }}>
        <TitleBox>
          <SettingsIcon fontSize="large" />
          <Title>Configurações</Title>
        </TitleBox>
        <br/><br/>
        <Section>
          <SectionTitle>Dados pessoais</SectionTitle>
          <Card>
            <Row style={{ flexDirection: isMobile ? "column" : "row" }}>
              <InputContainer>
                <PersonIcon style={{ position: "absolute", marginLeft: "10px", color: "white" }} />
                <Input
                  style={{ paddingLeft: "45px" }}
                  name="full_name"
                  type="text"
                  placeholder="Nome"
                  value={formData.full_name || ''}
                  onChange={e => setFormData({ ...formData, full_name: e.target.value })}
                />
              </InputContainer>
              <InputContainer>
                <EmailIcon style={{ position: "absolute", marginLeft: "10px", color: "white" }} />
                <Input
                  style={{ paddingLeft: "45px" }}
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email || ''}
                  disabled
                />
              </InputContainer>
            </Row>

            <Row style={{ flexDirection: isMobile ? "column" : "row" }}>
              <InputContainer>
                <FingerprintIcon style={{ position: "absolute", marginLeft: "10px", color: "white" }} />
                <CustomMaskedInput
                  style={{ paddingLeft: "45px" }}
                  mask="000.000.000-00"
                  unmask={true}
                  placeholder="CPF"
                  value={formData.customer_doc || ''}
                  disabled
                />
              </InputContainer>
              <InputContainer>
                <LocalPhoneIcon style={{ position: "absolute", marginLeft: "10px", color: "white" }} />
                <CustomMaskedInput
                  style={{ paddingLeft: "45px" }}
                  mask="(00) 00000-0000"
                  unmask={true}
                  placeholder="Telefone"
                  value={formData.phone || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
                />
              </InputContainer>
              <InputContainer>
                <CalendarMonthIcon style={{ position: "absolute", marginLeft: "10px", color: "white" }} />
                <Input
                  style={{ paddingLeft: "45px" }}
                  type="date"
                  value={formData.date_of_birth || ''}
                  onChange={e => setFormData({ ...formData, date_of_birth: e.target.value })}
                />
              </InputContainer>
            </Row>
            <ButtonContainer>
              <Button onClick={handleUpdateUserData}>Atualizar</Button>
            </ButtonContainer>
          </Card>
        </Section>
        <br/>
        <Section style={{ display: 'flex', flexDirection: isTablet ? 'column' : 'row', gap: '1rem' }}>
          <Card style={{ flex: 1 }}>
            <SectionTitle>Alterar senha</SectionTitle>
            <Row>
              <InputContainer>
                <Lock style={{ position: "absolute", marginLeft: "10px", color: "white" }} />
                <Input
                  style={{ paddingLeft: "45px" }}
                  type="password"
                  placeholder="Senha Antiga"
                  value={senhaAntiga}
                  onChange={e => setSenhaAntiga(e.target.value)}
                  autoComplete="new-password"
                />
              </InputContainer>
            </Row>
            <Row>
              <InputContainer>
                <Lock style={{ position: "absolute", marginLeft: "10px", color: "white" }} />
                <Input
                  style={{ paddingLeft: "45px" }}
                  type="password"
                  placeholder="Nova Senha"
                  value={novaSenha}
                  onChange={e => setNovaSenha(e.target.value)}
                  autoComplete="new-password"
                />
              </InputContainer>
            </Row>
            <Row>
              <InputContainer>
                <Lock style={{ position: "absolute", marginLeft: "10px", color: "white" }} />
                <Input
                  style={{ paddingLeft: "45px" }}
                  type="password"
                  placeholder="Confirmar Nova Senha"
                  value={confirmaSenha}
                  onChange={e => setConfirmaSenha(e.target.value)}
                  autoComplete="new-password"
                />
              </InputContainer>
            </Row>
            <ButtonContainer>
              <Button onClick={handleUpdatePassword}>Atualizar</Button>
            </ButtonContainer>
          </Card>

          <Card style={{ flex: 1, height: "fit-content" }}>
            <SectionTitle>Histórico de acessos</SectionTitle>
            <Row>
              <InputContainer style={{ height: "60px" }}>
                <CalendarMonthIcon style={{ position: "absolute", marginLeft: "10px", color: "white" }} />
                <Input
                  style={{ paddingLeft: "45px" }}
                  type="date"
                  value={dataInicio}
                  onChange={e => setDataInicio(e.target.value)}
                />
              </InputContainer>
            </Row>
            <Row>
              <InputContainer style={{ height: "60px" }}>
                <CalendarMonthIcon style={{ position: "absolute", marginLeft: "10px", color: "white" }} />
                <Input
                  style={{ paddingLeft: "45px" }}
                  type="date"
                  value={dataFim}
                  onChange={e => setDataFim(e.target.value)}
                />
              </InputContainer>
            </Row>
            <ButtonContainer>
              <Button onClick={handleFilterLogs}>Filtrar</Button>
            </ButtonContainer>
          </Card>
        </Section>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Setting;
