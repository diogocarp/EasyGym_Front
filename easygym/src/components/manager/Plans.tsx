import { Container, Frequency, GymIcon, Title } from "../../styles/manager-styles/DashboardStyle";
import PlansSection from "../home/Plans";

const Plans = () => {
    return (
        <div style={{display:"flex"}}>
        <Container style={{ width: "30%" }}>
        </Container>
        <Container style={{ width: "90%", height:"100vh" }}>
            <Frequency>
                <GymIcon fontSize="large" /><Title>Meu Plano</Title>
            </Frequency>
            <PlansSection/>
        </Container>
        </div>
    )
}

export default Plans;