import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Card, Container, Logo, Section, RootSection, Button, Row, ButtonContainer, Input, InputContainer } from "../styles/LoginStyle";
import logo from '../assets/img/home-assets/logo-quadrado-v2.png';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from "react-toastify";
import { AuthApi } from '../api/AuthApi';
import { Lock } from '@mui/icons-material';

const ConfirmedReset = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [novaSenha, setNovaSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');
    let hasRun = false;

    const handleUpdatePassword = async () => {
        const token = searchParams.get("token");
        if (!token) {
            showToast("Token não informado.", "error");
            return;
        }
        
        if (!novaSenha || !confirmaSenha) {
        showToast("Preencha todos os campos de senha.", "error", 5000);
        return;
        }

        if (novaSenha !== confirmaSenha) {
        showToast("As senhas não coincidem.", "error", 5000);
        return;
        }

        if (!hasRun) {
            hasRun = true;
            AuthApi.resetPassword(token, novaSenha, confirmaSenha)
                .then(() => {
                    toast.success("Senha alterada com sucesso!", {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    style: { backgroundColor: "#444", color: "white" },
                    onClose: () => navigate("/login")
                });
                })
                .catch((err) => {
                    showToast(err.message || "Erro ao validar token.", "error");
                });
        }
    };

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
                            <p style={{ color: "white", marginBottom: 10, fontSize: 18 }}>
                                Esqueceu a senha?
                            </p>
                            <p style={{ color: "#ababab", fontSize: 14 }}>
                                Por favor, preencha os campos abaixo para redefinir
                            </p><br />
                            <Row>
                            <InputContainer style={{marginBottom: 10}}>
                                <Lock style={{ position: "absolute", marginLeft: "10px", color: "white" }} />
                                <Input
                                style={{ paddingLeft: "45px" }}
                                type="password"
                                placeholder="Nova Senha"
                                value={novaSenha}
                                onChange={e => setNovaSenha(e.target.value)}
                                autoComplete="new-password"
                                />
                            </InputContainer>
                            </Row>
                            <Row>
                            <InputContainer>
                                <Lock style={{ position: "absolute", marginLeft: "10px", color: "white" }} />
                                <Input
                                style={{ paddingLeft: "45px" }}
                                type="password"
                                placeholder="Confirmar Nova Senha"
                                value={confirmaSenha}
                                onChange={e => setConfirmaSenha(e.target.value)}
                                autoComplete="new-password"
                                />
                            </InputContainer>
                            </Row>
                            <ButtonContainer>
                            <Button onClick={handleUpdatePassword}>Atualizar</Button>
                            </ButtonContainer>
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
