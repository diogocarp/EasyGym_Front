import { useState, useEffect, SetStateAction } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import * as Login from "../styles/LoginStyle";
import * as Register from "../styles/RegisterStyle";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import logo from '../assets/img/home-assets/logo-quadrado-v2.png';
import { useNavigate } from "react-router-dom";
import { cpfMask, phoneMask } from "./constants/MaskConstants"
import { Close } from "@mui/icons-material";


const RegisterPage = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
    const [cpf, setCpf] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const validateEmail = (value:SetStateAction<string>) => {
        setEmail(value);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setIsEmailValid(emailRegex.test(value));
    };

    return (
        <>
            <Header />
            <Login.Section>
                <Login.Container style={{ padding: isMobile ? "0px" : "20px" }}>
                    <Login.Card style={{ width: "100%", maxWidth: "700px" }}>
                        <Login.Logo src={logo} style={{ width: "30%" }} />
                        <p style={{ color: "white", marginBottom: 20, fontSize: 22 }}>Bem-vindo!</p>
                        <p style={{ color: "gray", marginBottom: 20, fontSize: 14 }}>
                            Precisamos de alguns dados para prosseguir com seu cadastro...
                        </p>
                        <Login.Options style={{ margin: isMobile ? "20px 60px" : "20px 190px", textAlign: "center" }}>
                            Já possui cadastro?
                            <Login.Link
                                style={{ fontWeight: 900, textDecoration: "underline", marginLeft: 5 }}
                                onClick={() => navigate("/login")}
                            >
                                Fazer login
                            </Login.Link>
                        </Login.Options>

                        <Register.Form>
                            <Register.FullWidth style={{ flexDirection: isMobile ? "column" : "row" }}>
                                <Register.InputContainer>
                                    <PersonIcon />
                                    <Register.Input type="text" placeholder="Nome Completo" />
                                </Register.InputContainer>
                                <Register.InputContainer style={{ marginTop: isMobile ? "10px" : "", marginLeft: isMobile ? "" : "10px" }}>
                                    <EmailIcon />
                                    <Register.Input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => validateEmail(e.target.value)}
                                    />
                                    {isEmailValid ? <DoneOutlineIcon color="success"/> : <Close color="error"/>}
                                </Register.InputContainer>
                            </Register.FullWidth>

                            <Register.FullWidth style={{ flexDirection: isMobile ? "column" : "row" }}>
                                <Register.InputContainer style={{ width: isMobile ? "100%" : "31%" }}>
                                    <FingerprintIcon />
                                    <Register.CustomMaskedInput mask={cpfMask} placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} />
                                </Register.InputContainer>
                                <Register.InputContainer style={{ width: isMobile ? "100%" : "31%", marginTop: isMobile ? "10px" : "", marginLeft: isMobile ? "" : "10px" }}>
                                    <LocalPhoneIcon />
                                    <Register.CustomMaskedInput mask={phoneMask} placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </Register.InputContainer>
                                <Register.InputContainer style={{ width: isMobile ? "100%" : "32%", marginTop: isMobile ? "10px" : "", marginLeft: isMobile ? "" : "10px" }}>
                                    <CalendarMonthIcon />
                                    <Register.Input type="date" />
                                </Register.InputContainer>
                            </Register.FullWidth>

                            <Register.FullWidth style={{ flexDirection: isMobile ? "column" : "row" }}>
                                <Register.InputContainer>
                                    <LockIcon />
                                    <Register.Input type="password" placeholder="Senha" />
                                </Register.InputContainer>
                                <Register.InputContainer style={{ marginTop: isMobile ? "10px" : "", marginLeft: isMobile ? "" : "10px" }}>
                                    <LockIcon />
                                    <Register.Input type="password" placeholder="Confirmar Senha" />
                                </Register.InputContainer>
                            </Register.FullWidth>
                        </Register.Form>

                        <Login.Button style={{ width: "80%" }}>Cadastrar</Login.Button>
                    </Login.Card>
                </Login.Container>
            </Login.Section>
            <Footer />
        </>
    );
};

export default RegisterPage;
