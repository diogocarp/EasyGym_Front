import { Container, Frequency, GymIcon, Title } from "../../styles/manager-styles/DashboardStyle";
import PlansSection from "../home/Plans";

const Plans = () => {
    return (
        <div style={{display:"flex"}}>
        <Container style={{ width: "90%"}}>
            <Frequency>
                <GymIcon fontSize="large" /><Title>Planos</Title>
            </Frequency>
            <PlansSection/>
        </Container>
        </div>
    )
}

export default Plans;