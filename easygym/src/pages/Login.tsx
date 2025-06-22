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
import Cookies from "js-cookie";
import { AuthApi } from "../api/AuthApi";

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // novo estado

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

    const handleLogin = async () => {
        if (!email || !password) {
            showToast("Por favor, insira dados válidos.", "error");
            return;
        }

        setIsLoading(true);

        try {
            const { access, refresh } = await AuthApi.login(email, password);

            if (rememberMe) {
                sessionStorage.setItem("accessToken", access);
                sessionStorage.setItem("refreshToken", refresh);
            } else {
                Cookies.set("accessToken", access, { expires: 1 });
                Cookies.set("refreshToken", refresh, { expires: 7 });
            }

            const profile = await AuthApi.getProfile(access);

            toast.success("Login realizado com sucesso!", {
                position: "bottom-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                style: { backgroundColor: "#444", color: "white" },
                onClose: () => { profile.is_staff ? navigate("/manager") : navigate("/member") }
            });
        } catch (err: any) {
            showToast(err.message || "Erro ao fazer login", "error");
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
                            <p style={{ color: "white", fontSize: 18 }}>Bem-vindo Novamente!</p>

                            <Options style={{ margin: "10px 20px 20px 20px" }}>
                                <span>Primeira vez por aqui?</span>
                                <Link onClick={() => navigate("/register")}>
                                    Cadastre-se
                                </Link>
                            </Options>

                            <InputContainer>
                                <PersonIcon style={{ marginRight: "-10px", marginLeft: "10px", position: "absolute" }} />
                                <Input
                                    name="email"
                                    style={{ paddingLeft: "45px" }}
                                    type="text"
                                    placeholder="Digite seu email ou CPF"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isLoading}
                                />
                            </InputContainer>

                            <InputContainer style={{ marginTop: "10px" }}>
                                <LockIcon style={{ marginRight: "-10px", marginLeft: "10px", position: "absolute" }} />
                                <Input
                                    name="password"
                                    style={{ paddingLeft: "45px" }}
                                    type="password"
                                    placeholder="Digite sua senha"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={isLoading}
                                />
                            </InputContainer>

                            <Options style={{ justifyContent: "space-between" }}>
                                <label style={{ display: "flex", alignItems: "center" }}>
                                    <Checkbox
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        disabled={isLoading}
                                    /> Lembrar-me
                                </label>
                                <Link onClick={() => navigate("/reset")}>Esqueceu a senha?</Link>
                            </Options>

                            <Button onClick={handleLogin} disabled={isLoading}>
                                {isLoading ? "Entrando..." : "Logar"}
                            </Button>
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
