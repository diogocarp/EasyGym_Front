import Header from "../components/Header";
import {
    Container,
    Section,
    AboutImage,
    AboutSection,
    Title,
    Text,
    PlansSection,
    PlanCard,
    PlanList,
    PlanListItem,
    Icon,
    Button,
    ContactSection,
    ContactImage
  } from "../styles/HomeStyle";
import email from "../assets/img/home-assets/email-white.png"
import tel from "../assets/img/home-assets/telephone.png"
import home_bg_one from "../assets/img/home-assets/home-section-1.png"
import home_bg_two from "../assets/img/home-assets/home-section-2.png"
import { plans } from "./constants/HomeContants";
import Footer from "../components/Footer";

const HomePage = () => {
    return (
        <Container>
            <Header />
            <Section>
                <AboutImage src={home_bg_one} />
                <AboutSection id="about">
                    <Title>Sobre Nós</Title>
                    <Text>Na Easy Gym, acreditamos que o fitness deve ser acessível, divertido e descomplicado para todos. Nossa academia é equipada com aparelhos modernos, aulas dinâmicas e um ambiente acolhedor para motivar você a alcançar suas metas.</Text>

                    <Text>Com planos flexíveis e uma equipe de profissionais dedicados, estamos aqui para tornar sua jornada fitness fácil e prazerosa. Venha fazer parte da nossa comunidade e descubra o poder de se sentir bem!</Text>
                </AboutSection>
            </Section>
            <PlansSection id="plans">
                {plans.map((plan) => (
                    <PlanCard key={plan.id}>
                        <Title>Plano {plan.title}</Title>
                        <PlanList>
                            <PlanListItem>
                                <Icon src={plan.advantages[0]} /> Acesso à sauna e spa
                            </PlanListItem>
                            <PlanListItem>
                                <Icon src={plan.advantages[1]} /> Consultas com Nutricionista
                            </PlanListItem>
                            <PlanListItem>
                                <Icon src={plan.advantages[2]} />  Personal Trainer
                            </PlanListItem>
                            <PlanListItem>
                                <Icon src={plan.advantages[3]} />  Área de musculação e cardio
                            </PlanListItem>
                            <center><p style={{ color: "#ccc", marginBottom: 10, fontSize: 12, fontStyle: "italic" }}>{plan.fidelity}</p></center>
                        </PlanList>
                        <Button>Quero esse!</Button>
                    </PlanCard>
                ))}
            </PlansSection>
            <Section>
                <AboutSection style={{ position: "relative", border:"none", backgroundColor:'#1a1a1a', background:"none",}}></AboutSection>
                <ContactSection id="contact">
                    <Title>Contato</Title>
                    <Text>Quer saber mais sobre nossos planos ou agendar uma visita? Nossa equipe está pronta para ajudar você!</Text>

                    <Text> Entre em contato pelo telefone ou via e-mail. Venha descobrir como podemos tornar sua experiência fitness fácil e prazerosa!</Text>
                    <Text><img src={email} /> easygym@contato.com.br</Text>
                    <Text><img src={tel} /> +55 (11) 4781-4568</Text>
                </ContactSection>
                <ContactImage src={home_bg_two} />
            </Section>
            <Footer />
        </Container>
    );

}


export default HomePage;