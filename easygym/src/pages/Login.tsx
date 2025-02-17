import Footer from "../components/Footer";
import Header from "../components/Header";
import * as Login from "../styles/LoginStyle";
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
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style:{backgroundColor:"#444",color:"white"}
            });
        } else {
            toast.error("Por favor, insira dados válidos.", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style:{backgroundColor:"#444",color:"white"}
            });
        }
    };

    return (
        <>
            <Header />
            <Login.Section>
                <Login.Container>
                    <Login.Card>
                        <Login.Logo src={logo} />
                        <p style={{ color: "white", marginBottom: 20, fontSize: 22 }}>Bem-vindo Novamente!</p>

                        <Login.Options style={{ margin: "20px 60px" }}>
                            <span>Primeira vez por aqui?</span>
                            <Login.Link onClick={() => navigate("/register")}>
                                Cadastre-se
                            </Login.Link>
                        </Login.Options>

                        <Login.InputContainer>
                            <PersonIcon />
                            <Login.Input type="text" placeholder="Digite seu email ou CPF" onChange={(e) => setEmail(e.target.value)} />
                        </Login.InputContainer>

                        <Login.InputContainer>
                            <LockIcon />
                            <Login.Input type="password" placeholder="Digite sua senha" onChange={(e) => setPassword(e.target.value)} />
                        </Login.InputContainer>

                        <Login.Options>
                            <label>
                                <Login.Checkbox type="checkbox" /> Lembrar-me
                            </label>
                            <Login.Link>Esqueceu a senha?</Login.Link>
                        </Login.Options>

                        <Login.Button onClick={() => handleLogin()}>Logar</Login.Button>
                    </Login.Card>
                </Login.Container>
            </Login.Section>
            <Footer />

            <ToastContainer />
        </>
    );
};

export default LoginPage;
