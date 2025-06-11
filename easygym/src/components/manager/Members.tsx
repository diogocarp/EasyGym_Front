import { Container, Frequency, Title } from "../../styles/manager-styles/DashboardStyle";
import {
  Actions, Button, Card, Grid, Member, MemberInfo, MembersIcon,
  FilterContainer, SearchButton
} from "../../styles/manager-styles/MembersStyle";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { Input, InputContainer } from "../../styles/LoginStyle";
import PersonIcon from '@mui/icons-material/Person';
import { FileCopy } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

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
  const initialStudents = [
    { name: "Bruno Ferreira da Silva", cpf: "123.456.789-09" },
    { name: "Marinez Rodrigues Pereira", cpf: "123.456.789-09" },
    { name: "Luciano Lopes dos Anjos", cpf: "123.456.789-09" },
    { name: "José Leandro Anderson Mendes", cpf: "123.456.789-09" },
    { name: "Davi Oliver da Luz", cpf: "123.456.789-09" },
    { name: "Hugo Cláudio Igor da Cunha", cpf: "123.456.789-09" },
    { name: "Camila Luciana Luciana Peixoto", cpf: "123.456.789-09" },
    { name: "Letícia Cláudia Campos", cpf: "123.456.789-09" }
  ];

  const [students, setStudents] = useState(initialStudents);
  const [filteredStudents, setFilteredStudents] = useState(initialStudents);

  const [name, setName] = useState("");
  const [cpf, setCPF] = useState("");

  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCPF, setEditCPF] = useState("");
  const [openEditModal, setOpenEditModal] = useState(false);

  const [deleteIndex, setDeleteIndex] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditName(filteredStudents[index].name);
    setEditCPF(filteredStudents[index].cpf);
    setOpenEditModal(true);
  };

  const handleEditSave = () => {
    const updatedStudents = [...students];
    const realIndex = students.findIndex(s => s.name === filteredStudents[editIndex].name && s.cpf === filteredStudents[editIndex].cpf);
    if (realIndex !== -1) {
      updatedStudents[realIndex] = { name: editName, cpf: editCPF };
      setStudents(updatedStudents);
      setFilteredStudents(updatedStudents); 
      setOpenEditModal(false);
    }
  };

  const handleDelete = (index) => {
    setDeleteIndex(index);
    setOpenDeleteModal(true);
  };

  const confirmDelete = () => {
    const studentToRemove = filteredStudents[deleteIndex];
    const updatedStudents = students.filter(s => s !== studentToRemove);
    setStudents(updatedStudents);
    setFilteredStudents(updatedStudents);
    setOpenDeleteModal(false);
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
    <div style={{ display: "flex" }}>
      <Container style={{ width: "90%" }}>
        <Frequency>
          <MembersIcon fontSize="large" />
          <Title>Alunos</Title>
        </Frequency>
        <Member>
          <FilterContainer style={{ display: "flex" }}>
            <InputContainer style={{ width: "25%" }}>
              <PersonIcon />
              <Input type="text" placeholder="Digite o nome do aluno" onChange={(e) => setName(e.target.value)} />
            </InputContainer>
            <InputContainer style={{ width: "25%" }}>
              <FileCopy />
              <Input type="text" placeholder="Digite o CPF do aluno" onChange={(e) => setCPF(e.target.value)} />
            </InputContainer>
            <SearchButton onClick={handleFilter}>Filtrar</SearchButton>
          </FilterContainer>

          <Grid>
            {filteredStudents.map((student, index) => (
              <Card key={index}>
                <MemberInfo>
                  <h3>{student.name}</h3>
                  <p>{student.cpf}</p>
                </MemberInfo>
                <Actions>
                  <Button onClick={() => handleEdit(index)}>
                    <EditNoteIcon />
                  </Button>
                  <Button onClick={() => handleDelete(index)}>
                    <DeleteIcon color="error" />
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
          <InputContainer>
            <Input value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Nome" />
          </InputContainer>
          <InputContainer>
            <Input value={editCPF} onChange={(e) => setEditCPF(e.target.value)} placeholder="CPF" />
          </InputContainer>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1rem" }}>
            <Button onClick={() => setOpenEditModal(false)}>Cancelar</Button>
            <Button onClick={handleEditSave}>Salvar</Button>
          </div>
        </Box>
      </Modal>

      <Modal open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <Box sx={modalStyle}>
          <DeleteIcon color="error" />
          <h3 style={{ color: "white", paddingTop: "10px" }}>Tem certeza que deseja excluir este aluno?</h3>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem", marginTop: "1.5rem" }}>
            <Button onClick={() => setOpenDeleteModal(false)}>Cancelar</Button>
            <Button onClick={confirmDelete}>Confirmar</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Members;
