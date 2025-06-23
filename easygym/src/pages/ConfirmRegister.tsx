import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {  Card, Container, Logo, Section, RootSection } from "../styles/LoginStyle";
import logo from '../assets/img/home-assets/logo-quadrado-v2.png';
import confirmed from '../assets/img/home-assets/confirmed.png';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
import { AuthApi } from '../api/AuthApi';

const ConfirmedRegister = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState<boolean | null>(null);
    let hasRun = false;

    useEffect(() => {
        const email = searchParams.get("email");
        if (!email) {
            showToast("Email não informado.", "error");
            setIsValid(false);
            return;
        }

        if (!hasRun) {
            hasRun = true;
            AuthApi.resendEmail(email)
                .then(() => {
                    setIsValid(true);
                })
                .catch((err) => {
                    showToast(err.message || "Erro ao reenviar email.", "error");
                    setIsValid(false);
                });
        }
    }, [searchParams]);
    
    const showToast = (
        message: string,
        type: 'success' | 'error' | 'info',
        duration = 3000
    ) => {
        toast[type](message, {
            position: "bottom-right",
            autoClose: duration,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: type !== 'info',
            draggable: true,
            style: { backgroundColor: "#444", color: "white" },
        });
    };
    
    return (
        <>
            <RootSection>
                <Header />
                <Section>
                    <Container>
                        <Card>
                            <Logo src={logo} /><br/>
                            <img src={confirmed}/><br/><br/>
                            <p style={{ color: "white", marginBottom: 10, fontSize: 18 }}>Perfeito! Seu cadastro está quase finalizado</p>
                            <p style={{ color: "#ababab", fontSize: 14 }}>
                                Por favor, verifique seu email para uma confirmação do seu cadastro
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

export default ConfirmedRegister;
