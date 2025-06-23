import Footer from "../components/Footer";
import Header from "../components/Header";
import { Button, Card, Container, Input, InputContainer, Logo, Section, RootSection } from "../styles/LoginStyle";
import logo from '../assets/img/home-assets/logo-quadrado-v2.png';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { Email } from "@mui/icons-material";
import { AuthApi } from '../api/AuthApi';

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    
    
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

    const handleReset = async () => {

        setIsLoading(true);

        if (email) {
            try {
                await AuthApi.sendReset(email);
                toast.success("Recuperação de senha enviada com sucesso!", {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    style: { backgroundColor: "#444", color: "white" },
                    onClose: () => navigate("/confirmReset")
                });
            } catch (err: any) {
                showToast(err.message || "Erro desconhecido", "error");
                setIsLoading(false);
            }
        } else {
            showToast("Por favor, insira um email válido.", "error");
            setIsLoading(false);
        }
    };

    return (
        <>
            <RootSection>
                <Header />
                <Section>
                    <Container>
                        <Card>
                            <Logo src={logo} />
                            <p style={{ color: "white", marginBottom: 20, fontSize: 18 }}>Redefinição de senha</p>
                            <p style={{ color: "#ababab", marginBottom: 20, fontSize: 14 }}>
                                Informe um email para enviarmos um link de redefinição
                            </p>

                            <InputContainer>
                                <Email style={{ marginRight: "-10px", marginLeft: "10px", position: "absolute"}} />
                                <Input disabled={isLoading} style={{ paddingLeft: "45px" }} type="text" placeholder="Digite seu email" onChange={(e) => setEmail(e.target.value)} />
                            </InputContainer>

                            <Button onClick={() => handleReset()} disabled={isLoading}>{isLoading ? "Carregando..." : "Enviar"}</Button>
                        </Card>
                    </Container>
                </Section>
                <Footer />
            </RootSection>

            <ToastContainer />
        </>
    );
};

export default ResetPasswordPage;
