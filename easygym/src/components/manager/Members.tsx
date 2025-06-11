import { Container, Frequency, Title } from "../../styles/manager-styles/DashboardStyle";
import {
  Actions, Button, Card, Grid, Member, MemberInfo, MembersIcon, FilterContainer, SearchButton, Input, InputMasked, InputContainer, InputContainerEdit
} from "../../styles/manager-styles/MembersStyle";
import EditNoteIcon from '@mui/icons-material/EditNote';
import PersonIcon from '@mui/icons-material/Person';
import { Description } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useTheme, useMediaQuery, Switch, FormControlLabel } from "@mui/material";

const modalStyle = {
  position: 'absolute',
  top: '50%', left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#333',
  boxShadow: 24, p: 4,
  borderRadius: "8px",
  width: "400px"
};

const Members = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const initialStudents = [
    { id: 1, status: true, name: "Ana Carolina Santos Oliveira", cpf: "529.982.310-74", email: "ana.oliveira@email.com", celular: "(21) 98745-6321", birth: "1995-03-15" },
    { id: 2, status: true, name: "Pedro Henrique Almeida Costa", cpf: "718.456.230-95", email: "pedro.costa@email.com.br", celular: "(11) 99876-5432", birth: "1998-07-22" },
    { id: 3, status: false, name: "Juliana Pereira Rodrigues", cpf: "324.765.890-12", email: "juliana.rodrigues@email.org", celular: "(31) 98543-2109", birth: "1993-11-05" },
    { id: 4, status: true, name: "Lucas Martins Ferreira", cpf: "876.543.210-68", email: "lucas.ferreira@email.net", celular: "(51) 97654-3210", birth: "1997-09-18" },
    { id: 5, status: true, name: "Camila Gonçalves Souza", cpf: "456.789.123-45", email: "camila.souza@email.com", celular: "(19) 98765-4321", birth: "1996-04-30" },
    { id: 6, status: true, name: "Rafael Barbosa Lima", cpf: "987.654.321-09", email: "rafael.lima@email.com.br", celular: "(27) 99876-5432", birth: "1994-12-08" },
    { id: 7, status: true, name: "Isabela Castro Ribeiro", cpf: "234.567.890-34", email: "isabela.ribeiro@email.org", celular: "(47) 98567-1234", birth: "1999-02-14" },
    { id: 8, status: true, name: "Marcos Vinicius Oliveira Santos", cpf: "765.432.109-87", email: "marcos.santos@email.net", celular: "(85) 97654-3210", birth: "1992-06-25" },
    { id: 9, status: false, name: "Fernanda Alves Pereira", cpf: "543.216.789-01", email: "fernanda.pereira@email.com", celular: "(31) 98765-1234", birth: "1991-08-17" },
    { id: 10, status: true, name: "Gustavo Henrique Silva Costa", cpf: "321.654.987-23", email: "gustavo.costa@email.com.br", celular: "(11) 99876-5432", birth: "1998-05-03" },
    { id: 11, status: true, name: "Patrícia Nunes Carvalho", cpf: "678.901.234-56", email: "patricia.carvalho@email.org", celular: "(21) 98543-2109", birth: "1995-10-29" },
    { id: 12, status: true, name: "Roberto Carlos Mendes", cpf: "890.123.456-78", email: "roberto.mendes@email.net", celular: "(51) 97654-3210", birth: "1993-01-12" },
    { id: 13, status: true, name: "Amanda Dias Fernandes", cpf: "109.876.543-21", email: "amanda.fernandes@email.com", celular: "(19) 98765-4321", birth: "1997-07-07" },
    { id: 14, status: true, name: "Diego Souza Alencar", cpf: "432.109.876-54", email: "diego.alencar@email.com.br", celular: "(27) 99876-5432", birth: "1994-03-21" },
    { id: 15, status: false, name: "Carolina Oliveira Martins", cpf: "654.321.098-76", email: "carolina.martins@email.org", celular: "(47) 98567-1234", birth: "1990-12-19" },
    { id: 16, status: true, name: "Thiago Pereira Ramos", cpf: "987.012.345-67", email: "thiago.ramos@email.net", celular: "(85) 97654-3210", birth: "1996-09-02" },
    { id: 17, status: true, name: "Larissa Costa Silva", cpf: "210.987.654-32", email: "larissa.silva@email.com", celular: "(31) 98765-1234", birth: "1999-04-15" },
    { id: 18, status: true, name: "Vinicius Rodrigues Almeida", cpf: "543.210.987-65", email: "vinicius.almeida@email.com.br", celular: "(11) 99876-5432", birth: "1992-11-28" },
    { id: 19, status: true, name: "Beatriz Santos Lima", cpf: "876.543.210-98", email: "beatriz.lima@email.org", celular: "(21) 98543-2109", birth: "1997-08-10" },
    { id: 20, status: true, name: "Ricardo Ferreira Gomes", cpf: "321.098.765-43", email: "ricardo.gomes@email.net", celular: "(51) 97654-3210", birth: "1995-02-23" },
    { id: 21, status: false, name: "Mariana Alves Costa", cpf: "654.321.098-76", email: "mariana.costa@email.com", celular: "(19) 98765-4321", birth: "1993-06-14" },
    { id: 22, status: true, name: "Felipe Oliveira Ribeiro", cpf: "987.654.321-09", email: "felipe.ribeiro@email.com.br", celular: "(27) 99876-5432", birth: "1998-01-27" },
    { id: 23, status: true, name: "Gabriela Silva Santos", cpf: "123.456.789-01", email: "gabriela.santos@email.org", celular: "(47) 98567-1234", birth: "1994-05-08" },
    { id: 24, status: true, name: "Leonardo Martins Pereira", cpf: "456.789.123-45", email: "leonardo.pereira@email.net", celular: "(85) 97654-3210", birth: "1991-10-31" },
    { id: 25, status: true, name: "Tatiane Rodrigues Alencar", cpf: "789.012.345-67", email: "tatiane.alencar@email.com", celular: "(31) 98765-1234", birth: "1996-07-12" },
    { id: 26, status: true, name: "Rodrigo Costa Fernandes", cpf: "234.567.890-12", email: "rodrigo.fernandes@email.com.br", celular: "(11) 99876-5432", birth: "1999-03-25" },
    { id: 27, status: true, name: "Vanessa Souza Gomes", cpf: "567.890.123-45", email: "vanessa.gomes@email.org", celular: "(21) 98543-2109", birth: "1992-09-18" },
    { id: 28, status: true, name: "Alexandre Pereira Lima", cpf: "890.123.456-78", email: "alexandre.lima@email.net", celular: "(51) 97654-3210", birth: "1990-12-01" },
    { id: 29, status: false, name: "Daniela Almeida Santos", cpf: "012.345.678-90", email: "daniela.santos@email.com", celular: "(19) 98765-4321", birth: "1997-04-22" },
    { id: 30, status: false, name: "Marcelo Ribeiro Costa", cpf: "345.678.901-23", email: "marcelo.costa@email.com.br", celular: "(27) 99876-5432", birth: "1994-08-05" }
];

  const [students, setStudents] = useState(initialStudents);
  const [filteredStudents, setFilteredStudents] = useState(initialStudents);

  const [name, setName] = useState("");
  const [cpf, setCPF] = useState("");

  const [editId, setEditId] = useState(-1);
  const [editName, setEditName] = useState("");
  const [editBirth, setEditBirth] = useState("");
  const [editCPF, setEditCPF] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editCelular, setEditCelular] = useState("");
  const [editStatus, setEditStatus] = useState(true);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleEdit = (index: number) => {
    const student = filteredStudents[index];
    setEditId(student.id);
    setEditName(student.name);
    setEditBirth(student.birth);
    setEditCPF(student.cpf);
    setEditEmail(student.email);
    setEditCelular(student.celular);
    setEditStatus(student.status);
    setOpenEditModal(true);
  };

  const handleEditSave = () => {
    const updatedStudents = students.map(s => s.id === editId ? {
      ...s,
      name: editName,
      birth: editBirth,
      cpf: editCPF,
      email: editEmail,
      celular: editCelular,
      status: editStatus
    } : s);
    setStudents(updatedStudents);
    setFilteredStudents(updatedStudents);
    setOpenEditModal(false);
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const handleFilter = () => {
    const filtered = students.filter(s =>
      s.name.toLowerCase().includes(name.toLowerCase()) &&
      s.cpf.includes(cpf)
    );
    setFilteredStudents(filtered);
  };

  useEffect(() => {
    setFilteredStudents(students);
  }, [students]);

  return (
    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row" }}>
      <Container style={{width: "100%"}}>
        <Frequency>
          <MembersIcon fontSize="large" />
          <Title>Alunos</Title>
        </Frequency>
        <Member>
          <FilterContainer style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: "20px", padding: "15px" }}>
            <InputContainer style={{ flexGrow: "1" }}>
              <PersonIcon style={{ marginRight: "-10px", marginLeft: "10px", position: "absolute"}} />
              <Input type="text" style={{ paddingLeft: "45px" }} placeholder="Digite o nome do aluno" onChange={(e) => setName(e.target.value)} />
            </InputContainer>
            <InputContainer style={{ flexGrow: "1" }}>
              <Description fontSize="small" style={{ marginRight: "-10px", marginLeft: "10px", position: "absolute"}} />
              <InputMasked
                style={{ paddingLeft: "45px" }}
                mask="000.000.000-00"
                unmask={true}
                onAccept={(value) => setCPF(formatCPF(value))}
                placeholder="Digite o CPF do aluno"
              >
              </InputMasked>
            </InputContainer>
            <SearchButton onClick={handleFilter}>Filtrar</SearchButton>
          </FilterContainer>

          <Grid style={{gridTemplateColumns: isMobile ? "repeat(1, 1fr)" : "repeat(4, 1fr)"}}>
            {filteredStudents.map((student, index) => (
              <Card key={index} style={{ backgroundColor: student.status ? "" : "#7d3f3f", minHeight: "75px" }}>
                <MemberInfo>
                  <h5>{student.name}</h5>
                  <p style={{fontSize: "14px"}}>{student.cpf}</p>
                </MemberInfo>
                <Actions>
                  <Button onClick={() => handleEdit(index)}>
                    <EditNoteIcon />
                  </Button>
                </Actions>
              </Card>
            ))}
          </Grid>
        </Member>
      </Container>

      {/* Modal de Edição */}
      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Box sx={modalStyle}>
          <h2 style={{ color: "white" }}>Editar Aluno</h2>
          <InputContainerEdit><Input value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Nome" /></InputContainerEdit>
          <InputContainerEdit><Input value={editCPF} disabled placeholder="CPF" /></InputContainerEdit>
          <InputContainerEdit><Input value={editEmail} disabled placeholder="Email" /></InputContainerEdit>
          <InputContainerEdit>
            <InputMasked value={editCelular} 
              mask="(00) 00000-0000"
              unmask={true}
              onAccept={(value) => setEditCelular(value)}
              placeholder="Celular"
            >
            </InputMasked>
          </InputContainerEdit>
          <InputContainerEdit><Input type="date" value={editBirth} onChange={(e) => setEditBirth(e.target.value)} placeholder="Data de Nascimento" /></InputContainerEdit>
          <FormControlLabel control={<Switch checked={editStatus} onChange={() => setEditStatus(!editStatus)} />} label="Status Ativo" sx={{ color: "white", mt: 1 }} />

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
            <Button onClick={() => setOpenEditModal(false)}>Cancelar</Button>
            <Button onClick={handleEditSave}>Salvar</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Members;
