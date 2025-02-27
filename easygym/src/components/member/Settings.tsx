
import { Container, Frequency, SettingsIcon, Title } from "../../styles/manager-styles/DashboardStyle";
import Notification from "../painel/Notification";

const Setting = () => {
    return (
        <div style={{display:"flex"}}>
        <Container style={{ width: "30%" }}>
        </Container>
        <Container style={{ width: "90%" }}>
            <Frequency>
                <SettingsIcon fontSize="large" /><Title>Configurações</Title>
            </Frequency>
        </Container>
        <Notification/>
        </div>
    )
}

export default Setting;