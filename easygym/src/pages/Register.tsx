import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Button, Card, Container, Link, Logo, Options, Section, RootSection } from "../styles/LoginStyle";
import { CustomMaskedInput, Form, FullWidth, Input, InputContainer } from "../styles/RegisterStyle"
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import logo from '../assets/img/home-assets/logo-quadrado-v2.png';
import { useNavigate } from "react-router-dom";
import { Close } from "@mui/icons-material";
import { ValidateInputType, regexPatterns } from "./constants/MaskConstants";
import User from "../models/User";
import { toast, ToastContainer } from "react-toastify";

import { AuthApi } from '../api/AuthApi';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 500);
    const [user] = useState(new User("", "", new Date(), "", "", ""));
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isCpfValid, setIsCpfValid] = useState(false);
    const [isTelValid, setIsTelValid] = useState(false);
    const [isDateValid, setIsDateValid] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const validateInput: ValidateInputType = (value: any, setter, validator, pattern) => {
        setter(value);
        validator(pattern.test(value));
    };

    const handlePass = (value: string) => {
        if (user.getPassword() !== value || user.getPassword() == "" || confirmPassword == "") {
            setIsPasswordValid(false);
        } else {
            setIsPasswordValid(true);

        }
        setConfirmPassword(value);

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

    const handleRegister = async () => {
        if (user.getName().trim() == '' || !(user.getName().trim().indexOf(' ') > -1)) {
            showToast("Por favor, insira um nome e sobrenome válido", "error");
            return;
        }
        if (!isEmailValid) {
            showToast("Por favor, insira um e-mail válido", "error");
            return;
        }
        if (!isCpfValid) {
            showToast("Por favor, insira um CPF válido", "error");
            return;
        }
        if (!isTelValid) {
            showToast("Por favor, insira um telefone válido", "error");
            return;
        }
        if (!isDateValid) {
            showToast("Por favor, insira uma data de nascimento válida", "error");
            return;
        }
        if (!isPasswordValid) {
            showToast("As senhas não coincidem", "error");
            return;
        }

        const [firstName, ...lastNameArr] = user.getName().trim().split(" ");
        const lastName = lastNameArr.join(" ") || "Sobrenome";

        const payload = {
            username: user.getEmail(),
            email: user.getEmail(),
            password: user.getPassword(),
            password_confirmation: confirmPassword,
            first_name: firstName,
            last_name: lastName,
            phone: user.getTel(),
            customer_doc: user.getCpf(),
            date_of_birth: user.getBirth().toISOString().split("T")[0]
        };

        try {
            await AuthApi.register(payload);
            toast.success("Cadastro realizado com sucesso!", {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: { backgroundColor: "#444", color: "white" },
                onClose: () => navigate("/confirm")
            });
        } catch (err: any) {
            showToast(err.message || "Erro desconhecido", "error");
        }
    };

    return (
        <>
            <RootSection>
                <Header />
                <Section>
                    <Container style={{ padding: isMobile ? "0px" : "20px" }}>
                        <Card style={{ width: "100%", maxWidth: "700px" }}>
                            <Logo src={logo} />
                            <p style={{ color: "white", marginBottom: 10, fontSize: 18 }}>Bem-vindo!</p>
                            <p style={{ color: "#ababab", marginBottom: 20, fontSize: 14 }}>
                                Precisamos de alguns dados para prosseguir com seu cadastro...
                            </p>
                            <Options style={{ margin: "10px 20px 20px 20px", textAlign: "center" }}>
                                Já possui cadastro?
                                <Link
                                    style={{ marginLeft: 5 }}
                                    onClick={() => navigate("/login")}
                                >
                                    Fazer login
                                </Link>
                            </Options>

                            <Form>
                                <FullWidth style={{ flexDirection: isMobile ? "column" : "row" }}>
                                    <InputContainer>
                                        <PersonIcon style={{ marginRight: "-10px", marginLeft: "10px", position: "absolute"}} />
                                        <Input style={{ paddingLeft: "45px" }} type="text" placeholder="Nome Completo" onChange={(e) => user.setName(e.target.value)} />
                                    </InputContainer>
                                    <InputContainer>
                                        <EmailIcon style={{ marginRight: "-10px", marginLeft: "10px", position: "absolute"}} />
                                        <Input style={{ paddingLeft: "45px" }}
                                            type="email"
                                            placeholder="Email"
                                            onChange={(e) => validateInput(e.target.value, () => user.setEmail(e.target.value), setIsEmailValid, regexPatterns.emailPattern)}
                                        />
                                        {isEmailValid ? <DoneOutlineIcon color="success" /> : <Close color="error" />}
                                    </InputContainer>
                                </FullWidth>

                                <FullWidth style={{ flexDirection: isMobile ? "column" : "row" }}>
                                    <InputContainer>
                                        <FingerprintIcon style={{ marginRight: "-10px", marginLeft: "10px", position: "absolute"}} />
                                        <CustomMaskedInput style={{ paddingLeft: "45px" }}
                                            mask="000.000.000-00"
                                            unmask={true}
                                            placeholder="CPF"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => validateInput(e.target.value, () => user.setCpf(e.target.value), setIsCpfValid, regexPatterns.cpfPattern)}
                                        />
                                        {isCpfValid ? <DoneOutlineIcon color="success" /> : <Close color="error" />}
                                    </InputContainer>
                                    <InputContainer>
                                        <LocalPhoneIcon style={{ marginRight: "-10px", marginLeft: "10px", position: "absolute"}} />
                                        <CustomMaskedInput style={{ paddingLeft: "45px" }}
                                            mask="(00) 00000-0000"
                                            unmask={true}
                                            placeholder="Telefone"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => validateInput(e.target.value, () => user.setTel(e.target.value), setIsTelValid, regexPatterns.phonePattern)}
                                        />
                                        {isTelValid ? <DoneOutlineIcon color="success" /> : <Close color="error" />}
                                    </InputContainer>
                                    <InputContainer>
                                        <CalendarMonthIcon style={{ marginRight: "-10px", marginLeft: "10px", position: "absolute"}} />
                                        <Input style={{ paddingLeft: "45px" }}
                                            type="date"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => validateInput(e.target.value, () => user.setBirth(new Date(e.target.value)), setIsDateValid, regexPatterns.datePattern)}
                                        />
                                        {isDateValid ? <DoneOutlineIcon color="success" /> : <Close color="error" />}
                                    </InputContainer>
                                </FullWidth>

                                <FullWidth style={{ flexDirection: isMobile ? "column" : "row" }}>
                                    <InputContainer>
                                        <LockIcon style={{ marginRight: "-10px", marginLeft: "10px", position: "absolute"}} />
                                        <Input style={{ paddingLeft: "45px" }}
                                            type="password"
                                            placeholder="Senha"

                                            onChange={(e) => user.setPassword(e.target.value)}
                                        />
                                    </InputContainer>
                                    <InputContainer>
                                        <LockIcon style={{ marginRight: "-10px", marginLeft: "10px", position: "absolute"}} />
                                        <Input style={{ paddingLeft: "45px" }}
                                            type="password"
                                            placeholder="Confirmar Senha"
                                            value={confirmPassword} onChange={(e) => handlePass(e.target.value)}
                                        />
                                        {isPasswordValid ? <DoneOutlineIcon color="success" /> : <Close color="error" />}
                                    </InputContainer>
                                </FullWidth>
                            </Form>

                            <Button style={{ width: "80%" }} onClick={() => handleRegister()}>Cadastrar</Button>
                        </Card>
                    </Container>
                </Section>
                <Footer />
            </RootSection>
            <ToastContainer />
        </>
    );
};

export default RegisterPage;
