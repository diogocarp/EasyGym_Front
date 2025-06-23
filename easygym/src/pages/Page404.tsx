import Footer from "../components/Footer";
import Header from "../components/Header";
import {  Card, Container, Logo, Section, RootSection } from "../styles/LoginStyle";
import logo from '../assets/img/home-assets/logo-quadrado-v2.png';
import confirmed from '../assets/img/home-assets/confirmed.png';
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page404 = () => {
    
    return (
        <>
            <RootSection>
                <Header />
                <Section>
                    <Container>
                        <Card>
                            <Logo src={logo} /><br/>
                            <p style={{ color: "white", marginBottom: 10, fontSize: 18 }}>Ops...</p>
                            <p style={{ color: "#ababab", fontSize: 14 }}>
                                Parece que não conseguimos achar a página que você procurava
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

export default Page404;
