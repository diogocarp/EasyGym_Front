import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Card, Container, Logo, Section, RootSection, Button } from "../styles/LoginStyle";
import logo from '../assets/img/home-assets/logo-quadrado-v2.png';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
import { AuthApi } from '../api/AuthApi';

const ConfirmedRegister = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [isValid, setIsValid] = useState<boolean | null>(null);
    let hasRun = false;

    useEffect(() => {
        const token = searchParams.get("token");
        if (!token) {
            showToast("Token não informado.", "error");
            setIsValid(false);
            return;
        }

        if (!hasRun) {
            hasRun = true;
            AuthApi.verifyEmail(token)
                .then(() => {
                    setIsValid(true);
                })
                .catch((err) => {
                    showToast(err.message || "Erro ao validar token.", "error");
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
                            <Logo src={logo} /><br />
                            {isValid === null && (
                                <p style={{ color: "#ababab" }}>Validando token...</p>
                            )}
                            {isValid === false && (
                                <>
                                    <p style={{ color: "white", marginBottom: 10, fontSize: 18 }}>
                                        Token inválido ou expirado... tente novamente
                                    </p>
                                </>
                            )}
                            {isValid === true && (
                                <>
                                    <p style={{ color: "white", marginBottom: 10, fontSize: 18 }}>
                                        Seu cadastro foi confirmado com sucesso!
                                    </p>
                                    <p style={{ color: "#ababab", fontSize: 14 }}>
                                        É um prazer ter você conosco
                                    </p><br />
                                    <Button style={{ width: "80%" }} onClick={() => navigate("/login")}>
                                        Prosseguir para o Login
                                    </Button>
                                </>
                            )}
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
