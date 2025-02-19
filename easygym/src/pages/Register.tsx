import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {Button,Card,Container,Link,Logo,Options,Section} from "../styles/LoginStyle";
import {CustomMaskedInput,Form,FullWidth,Input,InputContainer} from "../styles/RegisterStyle"
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

    const validateInput: ValidateInputType = (value:any, setter, validator, pattern) => {
        setter(value);
        validator(pattern.test(value));
    };

    const handlePass = (value:string) => {
        if (user.getPassword() !== value || user.getPassword() == "" || confirmPassword == "") {
            setIsPasswordValid(false);
        } else {
            setIsPasswordValid(true); 
            
        }
        setConfirmPassword(value);
        
    };
    
    const handleRegister = () => {
        if (!isEmailValid) {
            toast.error("Por favor, insira um e-mail válido.", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style:{backgroundColor:"#444",color:"white"}
            });
            return;
        }
        if (!isCpfValid) {
            toast.error("Por favor, insira um CPF válido.", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style:{backgroundColor:"#444",color:"white"}
            });
            return;
        }
        if (!isTelValid) {
            toast.error("Por favor, insira um telefone válido.", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style:{backgroundColor:"#444",color:"white"}
            });
            return;
        }
        if (!isDateValid) {
            toast.error("Por favor, insira uma data de nascimento válida.", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style:{backgroundColor:"#444",color:"white"}
            });
            return;
        }
        if (!isPasswordValid) {
            toast.error("As senhas não coincidem.", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style:{backgroundColor:"#444",color:"white"}
            });
            return;
        }
        
        toast.success("Cadastro realizado com sucesso!", {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            style:{backgroundColor:"#444",color:"white"},
            onClose: () => navigate("/login")
        });
        console.log(user.toString())
    };

    return (
        <>
            <Header />
            <Section>
                <Container style={{ padding: isMobile ? "0px" : "20px" }}>
                    <Card style={{ width: "100%", maxWidth: "700px" }}>
                        <Logo src={logo} style={{ width: "30%" }} />
                        <p style={{ color: "white", marginBottom: 20, fontSize: 22 }}>Bem-vindo!</p>
                        <p style={{ color: "gray", marginBottom: 20, fontSize: 14 }}>
                            Precisamos de alguns dados para prosseguir com seu cadastro...
                        </p>
                        <Options style={{ margin: isMobile ? "20px 60px" : "20px 190px", textAlign: "center" }}>
                            Já possui cadastro?
                            <Link
                                style={{ fontWeight: 900, textDecoration: "underline", marginLeft: 5 }}
                                onClick={() => navigate("/login")}
                            >
                                Fazer login
                            </Link>
                        </Options>

                        <Form>
                            <FullWidth style={{ flexDirection: isMobile ? "column" : "row" }}>
                                <InputContainer>
                                    <PersonIcon />
                                    <Input type="text" placeholder="Nome Completo" onChange={(e) => user.setName(e.target.value)} />
                                </InputContainer>
                                <InputContainer style={{ marginTop: isMobile ? "10px" : "", marginLeft: isMobile ? "" : "10px" }}>
                                    <EmailIcon />
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                         onChange={(e) => validateInput(e.target.value, () => user.setEmail(e.target.value), setIsEmailValid, regexPatterns.emailPattern)}
                                    />
                                    {isEmailValid ? <DoneOutlineIcon color="success" /> : <Close color="error" />}
                                </InputContainer>
                            </FullWidth>

                            <FullWidth style={{ flexDirection: isMobile ? "column" : "row" }}>
                                <InputContainer style={{ width: isMobile ? "100%" : "31%" }}>
                                    <FingerprintIcon />
                                    <CustomMaskedInput
                                        mask="000.000.000-00"
                                        unmask={true}
                                        placeholder="CPF"
                                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => validateInput(e.target.value, () => user.setCpf(e.target.value), setIsCpfValid, regexPatterns.cpfPattern)}
                                    />
                                    {isCpfValid ? <DoneOutlineIcon color="success" /> : <Close color="error" />}
                                </InputContainer>
                                <InputContainer style={{ width: isMobile ? "100%" : "31%", marginTop: isMobile ? "10px" : "", marginLeft: isMobile ? "" : "10px" }}>
                                    <LocalPhoneIcon />
                                    <CustomMaskedInput
                                        mask="(00) 00000-0000"
                                        unmask={true}
                                        placeholder="Telefone"
                                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => validateInput(e.target.value, () => user.setTel(e.target.value), setIsTelValid, regexPatterns.phonePattern)}
                                    />
                                    {isTelValid ? <DoneOutlineIcon color="success" /> : <Close color="error" />}
                                </InputContainer>
                                <InputContainer style={{ width: isMobile ? "100%" : "32%", marginTop: isMobile ? "10px" : "", marginLeft: isMobile ? "" : "10px" }}>
                                    <CalendarMonthIcon />
                                    <Input
                                        type="date"
                                         onChange={(e:React.ChangeEvent<HTMLInputElement>) => validateInput(e.target.value, () => user.setBirth(new Date(e.target.value)), setIsDateValid, regexPatterns.datePattern)}
                                    />
                                    {isDateValid ? <DoneOutlineIcon color="success" /> : <Close color="error" />}
                                </InputContainer>
                            </FullWidth>

                            <FullWidth style={{ flexDirection: isMobile ? "column" : "row" }}>
                                <InputContainer>
                                    <LockIcon />
                                    <Input
                                        type="password"
                                        placeholder="Senha"
                                        
                                     onChange={(e) => user.setPassword(e.target.value)}
                                    />
                                </InputContainer>
                                <InputContainer style={{ marginTop: isMobile ? "10px" : "", marginLeft: isMobile ? "" : "10px" }}>
                                    <LockIcon />
                                    <Input
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
            <ToastContainer />
        </>
    );
};

export default RegisterPage;
