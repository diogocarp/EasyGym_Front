import Footer from "../components/Footer";
import Header from "../components/Header";
import {  Card, Container, Logo, Section } from "../styles/LoginStyle";
import logo from '../assets/img/home-assets/logo-quadrado-v2.png';
import confirmed from '../assets/img/home-assets/confirmed.png';
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConfirmedRegister = () => {
    
    return (
        <>
            <Header />
            <Section>
                <Container>
                    <Card>
                        <Logo src={logo} /><br/>
                        <img src={confirmed}/>
                        <p style={{ color: "white", marginBottom: 20, fontSize: 22 }}>Perfeito! Seu cadastro está quase finalizado</p>
                        <span>Por favor, verifique seu email para uma confirmação do seu cadastro</span>    
                       
                    </Card>
                </Container>
            </Section>
            <Footer />

            <ToastContainer />
        </>
    );
};

export default ConfirmedRegister;
