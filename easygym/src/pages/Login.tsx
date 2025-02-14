import Footer from "../components/Footer";
import Header from "../components/Header";
import * as Login from "../styles/LoginStyle";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import logo from '../assets/img/home-assets/logo-quadrado-v2.png';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <Login.Section>
                <Login.Container>
                    <Login.Card>
                        <Login.Logo src={logo} />
                        <p style={{ color: "white", marginBottom: 20, fontSize: 22 }}>Bem-vindo Novamente!</p>
                        
                        <Login.Options style={{margin:"20px 60px"}}>
                            <span>Primeira vez por aqui?</span>
                            <Login.Link onClick={() => navigate("/register")}>
                                Cadastre-se
                            </Login.Link>
                        </Login.Options>

                        <Login.InputContainer>
                            <PersonIcon />
                            <Login.Input type="text" placeholder="Digite seu email ou CPF" />
                        </Login.InputContainer>

                        <Login.InputContainer>
                            <LockIcon />
                            <Login.Input type="password" placeholder="Digite sua senha" />
                        </Login.InputContainer>

                        <Login.Options>
                            <label>
                                <Login.Checkbox type="checkbox" /> Lembrar-me
                            </label>
                            <Login.Link>Esqueceu a senha?</Login.Link>
                        </Login.Options>

                        <Login.Button>Logar</Login.Button>
                    </Login.Card>
                </Login.Container>
            </Login.Section>
            <Footer />
        </>
    );
};

export default LoginPage;
