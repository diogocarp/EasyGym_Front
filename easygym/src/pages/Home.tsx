import Header from "../components/Header";
import {
    Container,
    Section,
    AboutImage,
    AboutSection,
    Title,
    Text,
    ContactSection,
    ContactImage
  } from "../styles/HomeStyle";
import email from "../assets/img/home-assets/email-white.png"
import tel from "../assets/img/home-assets/telephone.png"
import home_bg_one from "../assets/img/home-assets/home-section-1.png"
import home_bg_two from "../assets/img/home-assets/home-section-2.png"

import Footer from "../components/Footer";
import Plans from "../components/home/Plans";
import { useTheme, useMediaQuery } from "@mui/material";

const HomePage = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <Container>
            <Header />
            <Section style={{ height: isMobile ? "" : "calc(100vh - 95px)"}}>
                <AboutImage src={home_bg_one} style={{marginRight: isMobile ? "0px" : "-100px"}}/>
                <AboutSection id="about">
                    <Title>Sobre Nós</Title>
                    <Text style={{textAlign:"justify"}}>Na Easy Gym, acreditamos que o fitness deve ser acessível, divertido e descomplicado para todos. Nossa academia é equipada com aparelhos modernos, aulas dinâmicas e um ambiente acolhedor para motivar você a alcançar suas metas.</Text>

                    <Text>Com planos flexíveis e uma equipe de profissionais dedicados, estamos aqui para tornar sua jornada fitness fácil e prazerosa. Venha fazer parte da nossa comunidade e descubra o poder de se sentir bem!</Text>
                </AboutSection>
            </Section>
            <Plans/>
            <Section style={{ height: isMobile ? "" : "calc(100vh - 95px)"}}>
                <ContactSection id="contact">
                    <Title>Contato</Title>
                    <Text>Quer saber mais sobre nossos planos ou agendar uma visita? Nossa equipe está pronta para ajudar você!</Text>

                    <Text> Entre em contato pelo telefone ou via e-mail. Venha descobrir como podemos tornar sua experiência fitness fácil e prazerosa!</Text>
                    <Text><img src={email} /> easygym@contato.com.br</Text>
                    <Text><img src={tel} /> +55 (11) 4781-4568</Text>
                </ContactSection>
                <ContactImage src={home_bg_two} style={{marginLeft: isMobile ? "0px" : "-100px"}} />
            </Section>
            <Footer />
        </Container>
    );

}


export default HomePage;