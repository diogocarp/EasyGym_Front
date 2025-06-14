import { Box, Container, InfoIcon, Text, Title } from "../../styles/manager-styles/NotificationStyle";

const mockNotifications = [
  {
    id: 1,
    message: "A academia fechará 14:00 dia 01/11/24 devido ao feriado",
  },
  {
    id: 2,
    message: "Renove seu plano com 10% de desconto até 30/10/24",
  },
  {
    id: 3,
    message: "Aulas de spinning suspensas temporariamente",
  },
];

const Notification = () => {
  return (
    <Container>
      <Title>Notificações</Title>
      {mockNotifications.map((n) => (
        <Box key={n.id}>
          <InfoIcon>ℹ️</InfoIcon>
          <Text>{n.message}</Text>
        </Box>
      ))}
    </Container>
  );
};

export default Notification;
