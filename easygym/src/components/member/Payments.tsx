import { Container, Frequency, MoneyIcon, Title } from "../../styles/manager-styles/DashboardStyle";
import Notification from "../painel/Notification";

const Payments = () => {
    return (
        <div style={{display:"flex"}}>
        <Container style={{ width: "30%" }}>
        </Container>
        <Container style={{ width: "90%" }}>
            <Frequency>
                <MoneyIcon fontSize="large" /><Title>Pagamento</Title>
            </Frequency>
            
        </Container>
        <Notification/>
        </div>
    )
}

export default Payments;