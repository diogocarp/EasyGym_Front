import Footer from "../components/Footer";
import Header from "../components/Header";
import { Button, Card, Checkbox, Container, Input, InputContainer, Link, Logo, Options, Section } from "../styles/LoginStyle";
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
                onClose: () => navigate("/member")
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
            <Header />
            <Section>
                <Container>
                    <Card>
                        <Logo src={logo} />
                        <p style={{ color: "white", marginBottom: 20, fontSize: 22 }}>Bem-vindo Novamente!</p>

                        <Options style={{ margin: "20px 60px" }}>
                            <span>Primeira vez por aqui?</span>
                            <Link onClick={() => navigate("/register")}>
                                Cadastre-se
                            </Link>
                        </Options>

                        <InputContainer>
                            <PersonIcon />
                            <Input type="text" placeholder="Digite seu email ou CPF" onChange={(e) => setEmail(e.target.value)} />
                        </InputContainer>

                        <InputContainer>
                            <LockIcon />
                            <Input type="password" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)} />
                        </InputContainer>

                        <Options>
                            <label>
                                <Checkbox type="checkbox" /> Lembrar-me
                            </label>
                            <Link onClick={() => navigate("/reset")}>Esqueceu a senha?</Link>
                        </Options>

                        <Button onClick={() => handleLogin()}>Logar</Button>
                        <Button style={{width:"200px", marginLeft:"20px",marginTop:"50px"}} onClick={() => navigate("/manager")}>Logar como Operador</Button>
                    </Card>
                    
                </Container>
            
            </Section>
            
            <Footer />

            <ToastContainer />
        </>
    );
};

export default LoginPage;
