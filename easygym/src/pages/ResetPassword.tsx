import Footer from "../components/Footer";
import Header from "../components/Header";
import { Button, Card, Container, Input, InputContainer, Logo, Section } from "../styles/LoginStyle";
import logo from '../assets/img/home-assets/logo-quadrado-v2.png';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { Email } from "@mui/icons-material";

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {

        if (email) {
            toast.success("Recuperação de senha enviada com sucesso!", {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: { backgroundColor: "#444", color: "white" },
                onClose: () => navigate("/confirmed")
            });
        } else {
            toast.error("Por favor, insira um email válido.", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: { backgroundColor: "#444", color: "white" }
            });
        }
    };

    return (
        <>
            <Header />
            <Section>
                <Container>
                    <Card>
                        <Logo src={logo} />
                        <p style={{ color: "white", marginBottom: 20, fontSize: 22 }}>Redefinição de senha</p>

                        <span>Informe um email para enviarmos um link de redefinição</span>

                        <InputContainer>
                            <Email />
                            <Input type="text" placeholder="Digite seu email" onChange={(e) => setEmail(e.target.value)} />
                        </InputContainer>

                        <Button onClick={() => handleLogin()}>Enviar</Button>
                    </Card>
                </Container>
            </Section>
            <Footer />

            <ToastContainer />
        </>
    );
};

export default ResetPasswordPage;
