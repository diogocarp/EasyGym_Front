import Header from "../components/Header";
import * as Home from "../styles/HomeStyle";
import email from "../assets/img/home-assets/email-white.png"
import tel from "../assets/img/home-assets/telephone.png"
import home_bg_one from "../assets/img/home-assets/home-section-1.png"
import home_bg_two from "../assets/img/home-assets/home-section-2.png"
import { plans } from "./constants/HomeContants";
import Footer from "../components/Footer";

const HomePage = () => {
    return (
        <Home.Container>
            <Header />
            <Home.Section>
                <Home.AboutImage src={home_bg_one} />
                <Home.AboutSection id="about">
                    <Home.Title>Sobre Nós</Home.Title>
                    <Home.Text>Na Easy Gym, acreditamos que o fitness deve ser acessível, divertido e descomplicado para todos. Nossa academia é equipada com aparelhos modernos, aulas dinâmicas e um ambiente acolhedor para motivar você a alcançar suas metas.</Home.Text>

                    <Home.Text>Com planos flexíveis e uma equipe de profissionais dedicados, estamos aqui para tornar sua jornada fitness fácil e prazerosa. Venha fazer parte da nossa comunidade e descubra o poder de se sentir bem!</Home.Text>
                </Home.AboutSection>
            </Home.Section>
            <Home.PlansSection id="plans">
                {plans.map((plan) => (
                    <Home.PlanCard key={plan.id}>
                        <Home.Title>Plano {plan.title}</Home.Title>
                        <Home.PlanList>
                            <Home.PlanListItem>
                                <Home.Icon src={plan.advantages[0]} /> Acesso à sauna e spa
                            </Home.PlanListItem>
                            <Home.PlanListItem>
                                <Home.Icon src={plan.advantages[1]} /> Consultas com Nutricionista
                            </Home.PlanListItem>
                            <Home.PlanListItem>
                                <Home.Icon src={plan.advantages[2]} />  Personal Trainer
                            </Home.PlanListItem>
                            <Home.PlanListItem>
                                <Home.Icon src={plan.advantages[3]} />  Área de musculação e cardio
                            </Home.PlanListItem>
                            <center><p style={{ color: "#ccc", marginBottom: 10, fontSize: 12, fontStyle: "italic" }}>{plan.fidelity}</p></center>
                        </Home.PlanList>
                        <Home.Button>Quero esse!</Home.Button>
                    </Home.PlanCard>
                ))}
            </Home.PlansSection>
            <Home.Section>
                <Home.AboutSection style={{ position: "relative", border:"none", backgroundColor:'#1a1a1a', background:"none",}}></Home.AboutSection>
                <Home.ContactSection id="contact">
                    <Home.Title>Contato</Home.Title>
                    <Home.Text>Quer saber mais sobre nossos planos ou agendar uma visita? Nossa equipe está pronta para ajudar você!</Home.Text>

                    <Home.Text> Entre em contato pelo telefone ou via e-mail. Venha descobrir como podemos tornar sua experiência fitness fácil e prazerosa!</Home.Text>
                    <Home.Text><img src={email} /> easygym@contato.com.br</Home.Text>
                    <Home.Text><img src={tel} /> +55 (11) 4781-4568</Home.Text>
                </Home.ContactSection>
                <Home.ContactImage src={home_bg_two} />
            </Home.Section>
            <Footer />
        </Home.Container>
    );

}


export default HomePage;