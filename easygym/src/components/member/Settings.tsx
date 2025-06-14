import { useState } from 'react';
import { useMediaQuery, useTheme, Modal, Box } from '@mui/material';
import {
  Container, Frequency, SettingsIcon, Title
} from "../../styles/manager-styles/DashboardStyle";
import {
  Button, ButtonContainer, Card, Field, Input, Row, Section, SectionTitle, NotificationWrapper,Wrapper,
} from "../../styles/member-styles/SettingsStyles";
import Notification from "../painel/Notification";
import { CalendarMonth, Dock, Lock, Mail, Person, Phone } from "@mui/icons-material";
import { AlterButton } from '../../styles/member-styles/PaymentStyles';
import { InputContainer } from '../../styles/LoginStyle';

const modalStyle = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#1e1e1e',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
  padding: '2rem',
  borderRadius: '16px',
  width: '95%',
  maxWidth: '600px',
  maxHeight: '90vh',
  overflowY: 'auto',
  color: 'white',
  transition: 'all 0.3s ease-in-out',
  border: '1px solid rgba(255, 255, 255, 0.1)',

};

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

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [tempUserData, setTempUserData] = useState(userData);

  const handleSave = () => {
  setUserData({ ...tempUserData });
  setEditModalOpen(false);
};

  return (
    <div style={{
      display: "flex",
      flexDirection: isMobile ? 'column' : 'row',
      flexWrap: "wrap",
      width: "100%",
      boxSizing: "border-box"
    }}>
      <Container style={{ width: isMobile ? "100%" : "30%" }} />
      <Wrapper>
      <Container style={{ width: isMobile ? "100%" : "70%" }}>
        <Frequency>
          <SettingsIcon fontSize="large" />
          <Title>Configurações</Title>
        </Frequency>

        <Section>
          <SectionTitle>Dados pessoais</SectionTitle>
          <Card>
            <Row>
              <Field><Person /><Input value={userData.name} readOnly /></Field>
              <Field><Mail /><Input value={userData.email} readOnly /></Field>
            </Row>
            <Row>
              <Field><Dock /><Input value={userData.cpf} readOnly /></Field>
              <Field><Phone /><Input value={userData.tel} readOnly /></Field>
              <Field><CalendarMonth /><Input value={userData.birth} readOnly /></Field>
            </Row>
            <ButtonContainer>
              <Button onClick={() => {
                setTempUserData(userData);
                setEditModalOpen(true);
              }}>Atualizar</Button>
            </ButtonContainer>
          </Card>
        </Section>

        <Section style={{ display: 'flex', flexDirection: isTablet ? 'column' : 'row', gap: '2rem' }}>
          <Card style={{ flex: 1 }}>
            <SectionTitle>Alterar senha</SectionTitle>
            <Field><Lock /><Input type="password" placeholder="Senha Antiga" /></Field>
            <Field><Lock /><Input type="password" placeholder="Nova Senha" /></Field>
            <Field><Lock /><Input type="password" placeholder="Confirmar Nova Senha" /></Field>
            <ButtonContainer>
              <Button>Atualizar</Button>
            </ButtonContainer>
          </Card>

          <Card style={{ flex: 1 }}>
            <SectionTitle>Histórico de acessos</SectionTitle>
            <Field><CalendarMonth /><Input type="date" placeholder="Data inicial" /></Field>
            <Field><CalendarMonth /><Input type="date" placeholder="Data final" /></Field>
            <ButtonContainer>
              <Button>Filtrar</Button>
            </ButtonContainer>
          </Card>
        </Section>
      </Container>

     

      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
  <Box sx={modalStyle}>
    <h2 style={{ marginBottom: '1.5rem', color: 'white' }}>Editar dados</h2>

    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <InputContainer>
        <Input
          style={{ color: 'white' }}
          type="text"
          placeholder="Nome"
          value={tempUserData.name}
          onChange={(e) => setTempUserData({ ...tempUserData, name: e.target.value })}
        />
      </InputContainer>
      <InputContainer>
        <Input
          style={{ color: 'white' }}
          type="email"
          placeholder="Email"
          value={tempUserData.email}
          onChange={(e) => setTempUserData({ ...tempUserData, email: e.target.value })}
        />
      </InputContainer>
      <InputContainer>
        <Input
          style={{ color: 'white' }}
          type="text"
          placeholder="CPF"
          value={tempUserData.cpf}
          onChange={(e) => setTempUserData({ ...tempUserData, cpf: e.target.value })}
        />
      </InputContainer>
      <InputContainer>
        <Input
          style={{ color: 'white' }}
          type="tel"
          placeholder="Telefone"
          value={tempUserData.tel}
          onChange={(e) => setTempUserData({ ...tempUserData, tel: e.target.value })}
        />
      </InputContainer>
      <InputContainer>
        <Input
          style={{ color: 'white' }}
          type="date"
          placeholder="Nascimento"
          value={tempUserData.birth}
          onChange={(e) => setTempUserData({ ...tempUserData, birth: e.target.value })}
        />
      </InputContainer>
    </div>

    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
      <AlterButton onClick={() => setEditModalOpen(false)}>Cancelar</AlterButton>
      <AlterButton onClick={handleSave}>Salvar</AlterButton>
    </div>
  </Box>
</Modal>

      <NotificationWrapper>
          <Notification />
        </NotificationWrapper>
      </Wrapper>
    </div>
  );
};

export default Setting;
