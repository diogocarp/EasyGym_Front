import Footer from "../components/Footer";
import Header from "../components/Header";
import {  Card, Container, Logo, Section, RootSection } from "../styles/LoginStyle";
import logo from '../assets/img/home-assets/logo-quadrado-v2.png';
import confirmed from '../assets/img/home-assets/confirmed.png';
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConfirmedReset = () => {
    
    return (
        <>
            <RootSection>
                <Header />
                <Section>
                    <Container>
                        <Card>
                            <Logo src={logo} /><br/>
                            <img src={confirmed}/><br/><br/>
                            <p style={{ color: "white", marginBottom: 10, fontSize: 18 }}>Email de redefinição enviado!</p>
                            <p style={{ color: "#ababab", fontSize: 14 }}>
                                Por favor, verifique seu email para prosseguir com a redefinição de senha
                            </p>
                        
                        </Card>
                    </Container>
                </Section>
                <Footer />
            </RootSection>

            <ToastContainer />
        </>
    );
};

export default ConfirmedReset;
