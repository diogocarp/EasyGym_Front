import PersonIcon from '@mui/icons-material/Person';
import { Container, Frequency, SettingsIcon, Title } from "../../styles/manager-styles/DashboardStyle";
import { Button, ButtonContainer, Card, Field, Input, Row, Section, SectionTitle } from "../../styles/member-styles/SettingsStyles";
import Notification from "../painel/Notification";
import { CalendarMonth, Dock, Lock, Mail, Phone } from "@mui/icons-material";


const Setting = () => {

    const userData = {
        nome: 'Bruno Ferreira da Silva',
        email: 'brunofs99@hotmail.com',
        cpf: '123.456.789-09',
        telefone: '+55 (11) 94572-6687',
        nascimento: '01/01/2000',
      };

    return (
        <div style={{display:"flex"}}>
        <Container style={{ width: "30%" }}>
        </Container>
        <Container style={{ width: "90%" }}>
            <Frequency>
                <SettingsIcon fontSize="large" /><Title>Configurações</Title>
            </Frequency>
            <Section>
        <SectionTitle>Dados pessoais</SectionTitle>
        <Card>
          <Row>
            <Field><PersonIcon /><Input value={userData.nome} readOnly /></Field>
            <Field><Mail /><Input value={userData.email} readOnly /></Field>
          </Row>
          <Row>
            <Field><Dock /><Input value={userData.cpf} readOnly /></Field>
            <Field><Phone /><Input value={userData.telefone} readOnly /></Field>
            <Field><CalendarMonth /><Input value={userData.nascimento} readOnly /></Field>
          </Row>
          <ButtonContainer>
          <Button>Atualizar</Button>
          </ButtonContainer>
        </Card>
      </Section>

      <Section style={{ display: 'flex', gap: '2rem' }}>
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
        <Notification/>
        </div>
    )
}

export default Setting;