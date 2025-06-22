import { Container, Frequency, Title } from "../../styles/manager-styles/DashboardStyle";
import {
  Actions, Button, Card, Grid, Member, MemberInfo, MembersIcon, FilterContainer, Input, InputMasked, InputContainer, InputContainerEdit
} from "../../styles/manager-styles/MembersStyle";
import EditNoteIcon from '@mui/icons-material/EditNote';
import PersonIcon from '@mui/icons-material/Person';
import { Description } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { useTheme, useMediaQuery, Switch, FormControlLabel } from "@mui/material";
import { MemberType, MembersApi } from "../../api/manager/MembersApi";
import { toast } from "react-toastify";

import Cookies from 'js-cookie';

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
  const isMobile = useMediaQuery(theme.breakpoints.down(1000));

  const [name, setName] = useState("");
  const [cpf, setCPF] = useState("");
  
  const [students, setStudents] = useState<MemberType[]>([]);
const [filteredStudents, setFilteredStudents] = useState<MemberType[]>([]);

const refreshToken = Cookies.get("refreshToken") || sessionStorage.getItem("refreshToken") || "";

useEffect(() => {
  const delayDebounce = setTimeout(async () => {
    try {
      const filtered = await MembersApi.filterMembers(refreshToken, {
        full_name__icontains: name,
        customer_doc__icontains: cpf.replace(/[.-]/g, "")
      });
      setFilteredStudents(filtered);
    } catch (err: any) {
      toast.error(err.message || "Erro ao filtrar alunos");
    }
  }, 100); 
  return () => clearTimeout(delayDebounce);
}, [name, cpf]);


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
    setEditCelular(student.tel);
    setEditStatus(student.status);
    setOpenEditModal(true);
  };

  const handleEditSave = async () => {
  try {
    const updated: MemberType = {
      id: editId,
      name: editName,
      birth: editBirth,
      cpf: editCPF,
      email: editEmail,
      tel: editCelular,
      status: editStatus
    };

    await MembersApi.updateMember(refreshToken, updated);
    const membersUpdated = await MembersApi.getMembers(refreshToken)
    setStudents(membersUpdated)    
    setOpenEditModal(false);
    toast.success("Aluno atualizado com sucesso!");
  } catch (err: any) {
    toast.error(err.message || "Erro ao atualizar aluno");
  }
};


  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
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
              />
            </InputContainer>
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
