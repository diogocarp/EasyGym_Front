import {
  Container, Title, InfoIcon, Frequency, Square, FrequencySquare,
  MoneyIcon, SquareTitle, SquareData, SquareImage
} from "../../styles/manager-styles/DashboardStyle";

import arq from '../../assets/img/dahsboard-assets/arquvo.png';
import check from '../../assets/img/dahsboard-assets/check.png';
import cifrao from '../../assets/img/dahsboard-assets/cifrao.png';
import seta_cima from '../../assets/img/dahsboard-assets/seta-cima.png';
import seta_baixo from '../../assets/img/dahsboard-assets/seta-baixo.png';
import x from '../../assets/img/dahsboard-assets/x.png';

import {
  PieChart, Pie, Cell, Tooltip, LabelList
} from 'recharts';

import {
  useTheme, useMediaQuery, TextField, Box
} from "@mui/material";

import { DashboardApi, DashboardData } from "../../api/manager/DashboardApi";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';

import Cookies from 'js-cookie';


const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1300));

  const colorsFinan = ['#323132', '#444', '#ccc'];
  const colorsFreq = ['#323132', '#444'];

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [startDate, setStartDate] = useState("2025-01-01");

  const getToday = () => {
    const today = new Date();
    return today.toISOString().split("T")[0]; 
  };

  const [endDate, setEndDate] = useState(getToday());

  useEffect(() => {

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start > end) {
      alert("A data inicial não pode ser maior que a data final.");
      return;
    }
    
    const refreshToken = Cookies.get("refreshToken") || sessionStorage.getItem("refreshToken") || "";

    const fetchData = async () => {
      try {
        const data = await DashboardApi.getMetrics(refreshToken, startDate, endDate);
        setDashboardData(data);
      } catch (err: any) {
        showToast(err.message || "Erro ao carregar dados do dashboard", "error");
      }
    };

    fetchData();
  }, [startDate, endDate]);
  
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

  const dataFreq = dashboardData ? [
    { name: "Ativos", value: dashboardData.frequency.active },
    { name: "Ociosos", value: dashboardData.frequency.lazy }
  ] : [];

  const dataMatri = dashboardData ? [
    { name: "Matriculados", value: dashboardData.memberships.enrolled },
    { name: "Cancelados", value: dashboardData.memberships.canceled }
  ] : [];

  const dataFinan = dashboardData ? [
    { name: "Aguard. Pag.", value: dashboardData.financial.awaitingPayment },
    { name: "Inadimplentes", value: dashboardData.financial.defaulters },
    { name: "Adimplentes", value: dashboardData.financial.payers }
  ] : [];

  return (
    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", padding: isMobile? "10px" : "24px 24px 0px 24px" }}>
      <Container style={{ flexGrow: "1" }}>
        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row" }}>
          <div>
            <Frequency>
              <InfoIcon fontSize="large" /><Title>Resumo de Frequência</Title>
            </Frequency>
            <Box display="flex" gap={2} flexDirection={isMobile ? "column" : "row"} mb={2}>
              <TextField
                label="Data Inicial"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={{
                  input: {
                    color: "#fff",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    borderRadius: "8px",
                    fontSize: "12px"
                  },
                  label: { color: "#ccc" },
                  fieldset: { borderColor: "#555" },
                  '&:hover fieldset': { borderColor: "#888" },
                  '&.Mui-focused fieldset': { borderColor: "#DD212F" },
                }}
              />
              <TextField
                label="Data Final"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={{
                  input: {
                    color: "#fff",
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    borderRadius: "8px",
                    fontSize: "12px"
                  },
                  label: { color: "#ccc" },
                  fieldset: { borderColor: "#555" },
                  '&:hover fieldset': { borderColor: "#888" },
                  '&.Mui-focused fieldset': { borderColor: "#DD212F" },
                }}
              />
            </Box>
            <FrequencySquare style={{ width: isMobile ? "100%" : "300px" }}>
              <Square>
                <SquareImage src={seta_cima} alt="Ativos" />
                <SquareTitle>Ativos</SquareTitle>
                <SquareData>{dataFreq.find(d => d.name === "Ativos")?.value}</SquareData>
              </Square>
              <Square>
                <SquareImage src={seta_baixo} alt="Ociosos" />
                <SquareTitle>Ociosos</SquareTitle>
                <SquareData>{dataFreq.find(d => d.name === "Ociosos")?.value}</SquareData>
              </Square>
            </FrequencySquare>
            <FrequencySquare style={{ width: isMobile ? "100%" : "300px" }}>
              <Square>
                <SquareImage src={check} alt="Matriculados" />
                <SquareTitle>Matriculados</SquareTitle>
                <SquareData>{dataMatri.find(d => d.name === "Matriculados")?.value}</SquareData>
              </Square>
              <Square>
                <SquareImage src={x} alt="Cancelados" />
                <SquareTitle>Cancelados</SquareTitle>
                <SquareData>{dataMatri.find(d => d.name === "Cancelados")?.value}</SquareData>
              </Square>
            </FrequencySquare>
          </div>

          <div style={{
            display: "flex",
            flexGrow: "1",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: isMobile ? "column" : "row"
          }}>
            <PieChart width={isMobile? window.innerWidth - 35 : 325} height={200}>
              <Pie data={dataFreq} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={isMobile ? window.innerWidth / 6 : 75} fill="#ccc">
                {dataFreq.map((_, index) => (
                  <Cell key={`freq-cell-${index}`} fill={colorsFreq[index % colorsFreq.length]} />
                ))}
                <LabelList dataKey="value" position="inside" style={{ fontWeight: 100, fontSize: 12 }} />
                <LabelList dataKey="name" position="outside" style={{ fontWeight: 100, fontSize: 12 }} />
              </Pie>
              <Tooltip />
            </PieChart>

            <PieChart width={isMobile? window.innerWidth - 35 : 325} height={200}>
              <Pie data={dataMatri} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={isMobile ? window.innerWidth / 6 : 75} fill="#ccc">
                {dataMatri.map((_, index) => (
                  <Cell key={`matri-cell-${index}`} fill={colorsFreq[index % colorsFreq.length]} />
                ))}
                <LabelList dataKey="name" position="outside" style={{ fontWeight: 100, fontSize: 12 }} />
                <LabelList dataKey="value" position="inside" style={{ fontWeight: 100, fontSize: 12 }} />
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row" }}>
          <div>
            <Frequency>
              <MoneyIcon fontSize="large" /><Title>Resumo Financeiro</Title>
            </Frequency>
            <FrequencySquare style={{ width: isMobile ? "100%" : "300px" }}>
              <Square>
                <SquareImage src={arq} alt="Aguardando Pagamento" />
                <SquareTitle>Aguardando Pag.</SquareTitle>
                <SquareData>{dataFinan.find(d => d.name === "Aguard. Pag.")?.value}</SquareData>
              </Square>
              <Square>
                <SquareImage src={cifrao} alt="Inadimplentes" />
                <SquareTitle>Inadimplentes</SquareTitle>
                <SquareData>{dataFinan.find(d => d.name === "Inadimplentes")?.value}</SquareData>
              </Square>
            </FrequencySquare>
            <FrequencySquare style={{ width: isMobile ? "100%" : "300px" }}>
              <Square style={{width: "calc(50% - 5px)"}}>
                <SquareImage src={check} alt="Adimplentes" />
                <SquareTitle>Adimplentes</SquareTitle>
                <SquareData>{dataFinan.find(d => d.name === "Adimplentes")?.value}</SquareData>
              </Square>
            </FrequencySquare>
          </div>
          <div style={{
            display: "flex",
            flexGrow: "1",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <PieChart width={isMobile? window.innerWidth - 35 : 325} height={200}>
              <Pie data={dataFinan} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={isMobile ? window.innerWidth / 6 : 75} fill="black">
                {dataFinan.map((_, index) => (
                  <Cell key={`finan-cell-${index}`} fill={colorsFinan[index % colorsFinan.length]} />
                ))}
                <LabelList dataKey="name" position="outside" style={{ fontWeight: 100, fontSize: 12 }} />
                <LabelList dataKey="value" position="inside" style={{ fontWeight: 100, fontSize: 12 }} />
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </div>
      </Container>
      <ToastContainer />
    </div>
  );
};

export default Dashboard;
