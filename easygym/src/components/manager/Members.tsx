import { Container, Frequency, Title } from "../../styles/manager-styles/DashboardStyle"
import { Actions, Button, Card, Grid, Member, MemberInfo, MembersIcon, FilterContainer,SearchButton } from "../../styles/manager-styles/MembersStyle";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { Input, InputContainer } from "../../styles/LoginStyle";
import PersonIcon from '@mui/icons-material/Person';
import { FileCopy } from "@mui/icons-material";
import { useState } from "react";

const Members = () => {

    const students = [
        { name: "Bruno Ferreira da Silva", cpf: "123.456.789-09" },
        { name: "Marinez Rodrigues Pereira", cpf: "123.456.789-09" },
        { name: "Luciano Lopes dos Anjos", cpf: "123.456.789-09" },
        { name: "José Leandro Anderson Mendes", cpf: "123.456.789-09" },
        { name: "Davi Oliver da Luz", cpf: "123.456.789-09" },
        { name: "Hugo Cláudio Igor da Cunha", cpf: "123.456.789-09" },
        { name: "Camila Luciana Luciana Peixoto", cpf: "123.456.789-09" },
        { name: "Letícia Cláudia Campos", cpf: "123.456.789-09" }
    ];

    //const navigate = useNavigate();
    const [, setEmail] = useState("");
    const [, setPassword] = useState("");

    return (
        <div style={{ display: "flex" }}>
            <Container style={{ width: "25%" }}>
            </Container>
            <Container style={{ width: "90%" }}>
                <Frequency>
                    <MembersIcon fontSize="large" /><Title>Alunos</Title>
                </Frequency>
                <Member>
                <FilterContainer style={{display:"flex"}}>
                    <InputContainer style={{ width: "25%" }}>
                        <PersonIcon />
                        <Input type="text" placeholder="Digite o nome do aluno" onChange={(e) => setEmail(e.target.value)} />
                    </InputContainer>
                    <InputContainer style={{ width: "25%" }}>
                        <FileCopy />
                        <Input type="password" placeholder="Digite o CPF do aluno" onChange={(e) => setPassword(e.target.value)} />
                    </InputContainer>
                    <SearchButton>Filtrar</SearchButton>
                </FilterContainer>
                    <Grid>
                        {students.map((student, index) => (
                            <Card key={index}>
                                <MemberInfo>
                                    <h3>{student.name}</h3>
                                    <p>{student.cpf}</p>
                                </MemberInfo>
                                <Actions>
                                    <Button><EditNoteIcon /></Button>
                                    <Button><DeleteIcon color="error" /></Button>
                                </Actions>
                            </Card>
                        ))}
                    </Grid>
                </Member>
            </Container>
        </div>
    )
}

export default Members;