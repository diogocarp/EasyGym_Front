import { Box, Container, InfoIcon, Text, Title } from "../../styles/manager-styles/NotificationStyle"

const Notification = () => {
    return (
        <Container>
            <Title>Notificações</Title>
            <Box>
                <InfoIcon>ℹ️</InfoIcon>
                <Text>A academia fechará 14:00 dia 01/11/24 devido ao feriado</Text>
            </Box>
        </Container>
    )
}

export default Notification;