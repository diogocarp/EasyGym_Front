import { useState } from 'react';

import { useMediaQuery, useTheme } from '@mui/material';
import { Lock } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

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

  const [userData, setUserData] = useState({
    name: 'Bruno Ferreira da Silva',
    email: 'brunofs99@hotmail.com',
    cpf: '123.456.789-09',
    tel: '+55 (11) 94572-6687',
    birth: '2000-01-01',
  });

  const [formData, setFormData] = useState({ ...userData });

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

  const handleUpdateUserData = () => {
    const { name, tel, birth } = formData;
    if (!name || !tel || !birth) {
      showToast("Por favor, preencha todos os campos.", "error", 5000);
      return;
    }

    setUserData({ ...formData });
    showToast("Dados atualizados com sucesso!", "success");
  };

  const handleUpdatePassword = () => {
    if (!senhaAntiga || !novaSenha || !confirmaSenha) {
      showToast("Preencha todos os campos de senha.", "error", 5000);
      return;
    }

    if (novaSenha !== confirmaSenha) {
      showToast("As senhas não coincidem.", "error", 5000);
      return;
    }

    setSenhaAntiga('');
    setNovaSenha('');
    setConfirmaSenha('');

    showToast("Senha alterada com sucesso!", "success");
  };

  const handleFilterLogs = () => {
    if (!dataInicio || !dataFim) {
      showToast("Preencha as datas de início e fim para gerar o relatório.", "error", 5000);
      return;
    }
    showToast("Gerando relatório...", "info", 2000);
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: isMobile ? 'column' : 'row',
      flexWrap: "wrap",
      width: "100%",
      boxSizing: "border-box"
    }}>
      <Container style={{ width: "100%", padding: "10px 20px" }}>
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
                  name="name"
                  type="text"
                  placeholder="Nome Completo"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </InputContainer>
              <InputContainer>
                <EmailIcon style={{ position: "absolute", marginLeft: "10px", color: "white" }} />
                <Input
                  style={{ paddingLeft: "45px" }}
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email}
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
                  value={formData.cpf}
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
                  value={formData.tel}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, tel: e.target.value })}
                />
              </InputContainer>
              <InputContainer>
                <CalendarMonthIcon style={{ position: "absolute", marginLeft: "10px", color: "white" }} />
                <Input
                  style={{ paddingLeft: "45px" }}
                  type="date"
                  value={formData.birth}
                  onChange={e => setFormData({ ...formData, birth: e.target.value })}
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
