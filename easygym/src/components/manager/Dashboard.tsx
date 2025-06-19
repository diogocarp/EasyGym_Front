import { Container, Title, InfoIcon, Frequency, Square, FrequencySquare, MoneyIcon, SquareTitle, SquareData, SquareImage } from "../../styles/manager-styles/DashboardStyle";
import arq from '../../assets/img/dahsboard-assets/arquvo.png';
import check from '../../assets/img/dahsboard-assets/check.png';
import cifrao from '../../assets/img/dahsboard-assets/cifrao.png';
import seta_cima from '../../assets/img/dahsboard-assets/seta-cima.png';
import seta_baixo from '../../assets/img/dahsboard-assets/seta-baixo.png';
import x from '../../assets/img/dahsboard-assets/x.png';
import { PieChart, Pie, Cell, Tooltip, LabelList } from 'recharts';
import { useTheme, useMediaQuery } from "@mui/material";
import { DashboardApi, DashboardData } from "../../api/manager/DashboardApi";
import { TOKEN } from "../../api/Token";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";



const Dashboard = () => {

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const colorsFinan = ['#323132', '#444','#ccc']
    const colorsFreq = ['#323132', '#444']

   const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

    useEffect(() => {
    (async () => {
        try {
        const data = await DashboardApi.getMetrics(TOKEN);
        setDashboardData(data);
        } catch (err: any) {
        toast.error(err.message || "Erro ao carregar dados do dashboard");
        }
    })();
    }, []);

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
        { name: "Adimplentes", value: dashboardData.financial.noncompliant }
        ] : [];


    return (
    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row" }}>
        <Container style={{flexGrow: "1"}}>
            <div style={{display:"flex", flexDirection: isMobile ? "column" : "row"}}>
                <div>
                    <Frequency>
                        <InfoIcon fontSize="large" /><Title>Resumo de Frequência</Title>
                    </Frequency>
                    <FrequencySquare style={{width: isMobile ? "100%" : "300px"}}>
                        <Square>
                            <SquareImage src={seta_cima} alt="Ativos" />
                            <SquareTitle>Ativos</SquareTitle>
                            <SquareData>{dataFreq.find(data => data.name == "Ativos")?.value}</SquareData>
                        </Square>
                        <Square>
                            <SquareImage src={seta_baixo} alt="Ociosos" />
                            <SquareTitle>Ociosos</SquareTitle>
                            <SquareData>{dataFreq.find(data => data.name == "Ociosos")?.value}</SquareData>
                        </Square>
                    </FrequencySquare>
                    <FrequencySquare style={{width: isMobile ? "100%" : "300px"}}>
                        <Square>
                            <SquareImage src={check} alt="Matriculados" />
                            <SquareTitle>Matriculados</SquareTitle>
                            <SquareData>{dataMatri.find(data => data.name == "Matriculados")?.value}</SquareData>
                        </Square>
                        <Square>
                            <SquareImage src={x} alt="Ativos" />
                            <SquareTitle>Cancelados</SquareTitle>
                            <SquareData>{dataMatri.find(data => data.name == "Cancelados")?.value}</SquareData>
                        </Square>
                    </FrequencySquare>
                </div>
                <div style={{display:"flex", flexGrow: "1", justifyContent: "center", alignItems: "center", flexDirection: isMobile ? "column" : "row"}}>
                <PieChart width={325} height={200}>
                    <Pie data={dataFreq} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} fill="#ccc">
                        {dataFreq.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={colorsFreq[index % colorsFreq.length]} />
                        ))}
                        <LabelList dataKey="value" position="inside" style={{ fontWeight: 100, fontSize: 12 }} />
                        <LabelList dataKey="name" position="outside" style={{ fontWeight: 100, fontSize: 12 }} />
                    </Pie>
                    <Tooltip />
                </PieChart>
                <PieChart width={325} height={200}>
                    <Pie data={dataMatri} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} fill="#ccc">
                        {dataMatri.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={colorsFreq[index % colorsFreq.length]} />
                        ))}
                        <LabelList dataKey="name" position="outside" style={{ fontWeight: 100, fontSize: 12 }} />
                        <LabelList dataKey="value" position="inside" style={{ fontWeight: 100, fontSize: 12 }} />
                    </Pie>
                    <Tooltip />
                </PieChart>
                </div>
            </div>
            <div style={{display:"flex", flexDirection: isMobile ? "column" : "row"}}>
                <div>
                    <Frequency>
                        <MoneyIcon fontSize="large" /><Title>Resumo Financeiro</Title>
                    </Frequency>
                    <FrequencySquare style={{width: isMobile ? "100%" : "300px"}}>
                        <Square>
                            <SquareImage src={arq} alt="Ativos" />
                            <SquareTitle>Aguardando Pag.</SquareTitle>
                            <SquareData>{dataFinan.find(data => data?.name == "Aguard. Pag.")?.value}</SquareData>
                        </Square>
                        <Square>
                            <SquareImage src={cifrao} alt="Ativos" />
                            <SquareTitle>Inadimplentes</SquareTitle>
                            <SquareData>{dataFinan.find(data => data?.name == "Inadimplentes")?.value}</SquareData>
                        </Square>
                    </FrequencySquare>
                    <FrequencySquare style={{width: isMobile ? "100%" : "300px"}}>
                        <Square>
                            <SquareImage src={check} alt="Ativos" />
                            <SquareTitle>Adimplentes</SquareTitle>
                            <SquareData>{dataFinan.find(data => data?.name == "Adimplentes")?.value}</SquareData>
                        </Square>

                    </FrequencySquare>
                </div>
                <div style={{display:"flex", flexGrow: "1", justifyContent: "center", alignItems: "center"}}>
                    <PieChart width={325} height={200}>
                        <Pie data={dataFinan} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} fill="black">
                            {dataFinan.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={colorsFinan[index % colorsFinan.length]} />
                            ))}
                            <LabelList dataKey="name" position="outside" style={{ fontWeight: 100, fontSize: 12 }} />
                            <LabelList dataKey="value" position="inside" style={{ fontWeight: 100, fontSize: 12 }} />
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </div>
            </div>
        </Container>
    </div>

    )
}

export default Dashboard;