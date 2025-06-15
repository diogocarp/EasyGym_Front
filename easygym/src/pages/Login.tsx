import Footer from "../components/Footer";
import Header from "../components/Header";
import { Button, Card, Checkbox, Container, Input, InputContainer, Link, Logo, Options, Section, RootSection } from "../styles/LoginStyle";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import logo from '../assets/img/home-assets/logo-quadrado-v2.png';
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";

const LoginPage = () => {
    
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = () => {

        if (email && password) {
            toast.success("Login realizado com sucesso!", {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: { backgroundColor: "#444", color: "white" },
                onClose: () => { password == "admin" ? navigate("/manager") : navigate("/member")}
            });
        } else {
            toast.error("Por favor, insira dados válidos.", {
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
            <RootSection>
                <Header />
                <Section>
                    <Container>
                        <Card>
                            <Logo src={logo} />
                            <p style={{ color: "white", fontSize: 18 }}>Bem-vindo Novamente!</p>

                            <Options style={{ margin: "10px 20px 20px 20px" }}>
                                <span>Primeira vez por aqui?</span>
                                <Link onClick={() => navigate("/register")}>
                                    Cadastre-se
                                </Link>
                            </Options>

                            <InputContainer>
                                <PersonIcon style={{ marginRight: "-10px", marginLeft: "10px", position: "absolute"}} />
                                <Input style={{ paddingLeft: "45px" }} type="text" placeholder="Digite seu email ou CPF" onChange={(e) => setEmail(e.target.value)} />
                            </InputContainer>

                            <InputContainer style={{marginTop: "10px"}}>
                                <LockIcon style={{ marginRight: "-10px", marginLeft: "10px", position: "absolute"}} />
                                <Input style={{ paddingLeft: "45px" }} type="password" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)} />
                            </InputContainer>

                            <Options style={{justifyContent: "space-between"}}>
                                <label style={{display: "flex", alignItems: "center"}}>
                                    <Checkbox type="checkbox" /> Lembrar-me
                                </label>
                                <Link onClick={() => navigate("/reset")}>Esqueceu a senha?</Link>
                            </Options>

                            <Button onClick={() => handleLogin()}>Logar</Button>
                            
                        </Card>
                        
                    </Container>
                
                </Section>
                
                <Footer />
            </RootSection>

            <ToastContainer />
        </>
    );
};

export default LoginPage;
