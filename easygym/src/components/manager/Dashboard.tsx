import { Container, Title, AlertIcon, Frequency, Square, FrequencySquare, MoneyIcon, SquareTitle, SquareData, SquareImage } from "../../styles/manager-styles/DashboardStyle";
import arq from '../../assets/img/dahsboard-assets/arquvo.png';
import check from '../../assets/img/dahsboard-assets/check.png';
import cifrao from '../../assets/img/dahsboard-assets/cifrao.png';
import seta_cima from '../../assets/img/dahsboard-assets/seta-cima.png';
import seta_baixo from '../../assets/img/dahsboard-assets/seta-baixo.png';
import x from '../../assets/img/dahsboard-assets/x.png';
import { PieChart, Pie, Cell, Tooltip, LabelList } from 'recharts';



const Dashboard = () => {

    const colorsFinan = ['#323132', '#444','#ccc']
    const colorsFreq = ['#323132', '#444']

    const dataFreq = [{
        name:"Ativos",
        value: 35, 
    },{
        name:"Ociosos",
        value: 17, 
    }]

    const dataMatri = [{
        name:"Matriculados",
        value: 52, 
    },{
        name:"Cancelados",
        value: 5, 
    }]

    const dataFinan = [{
        name:"Aguard. Pag.",
        value: 20, 
    },{
        name:"Inadimplentes",
        value: 4, 
    },
    ,{
        name:"Adimplentes",
        value: 28, 
    }]
    return (
    <div style={{display:"flex"}}>
        <Container style={{width:"20%"}}/>
        <Container style={{width:"40%", paddingLeft:"40px"}}>
            <Frequency>
                <AlertIcon fontSize="large" /><Title>Resumo de Frequência</Title>
            </Frequency>
            <FrequencySquare>
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
            <FrequencySquare>
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
            <Frequency>
                <MoneyIcon fontSize="large" /><Title>Resumo Financeiro</Title>
            </Frequency>
            <FrequencySquare>
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
            <FrequencySquare>
                <Square style={{ width: "38%" }}>
                    <SquareImage src={check} alt="Ativos" />
                    <SquareTitle>Adimplentes</SquareTitle>
                    <SquareData>{dataFinan.find(data => data?.name == "Adimplentes")?.value}</SquareData>
                </Square>

            </FrequencySquare>
        </Container>
        <Container style={{width:"45%"}}>
            <div style={{display:"flex"}}>
            <PieChart width={400} height={400}>
                <Pie data={dataFreq} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#ccc">
                    {dataFreq.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={colorsFreq[index % colorsFreq.length]} />
                    ))}
                    <LabelList dataKey="value" position="inside" />
                    <LabelList dataKey="name" position="outside" />
                </Pie>
                <Tooltip />
            </PieChart>
            <PieChart width={400} height={400}>
                <Pie data={dataMatri} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#ccc">
                    {dataMatri.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={colorsFreq[index % colorsFreq.length]} />
                    ))}
                    <LabelList dataKey="name" position="outside" />
                    <LabelList dataKey="value" position="inside" />
                </Pie>
                <Tooltip />
            </PieChart>
            </div>
            <div>
            <PieChart width={400} height={400}>
                <Pie data={dataFinan} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="black">
                    {dataFinan.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={colorsFinan[index % colorsFinan.length]} />
                    ))}
                    <LabelList dataKey="name" position="outside" />
                    <LabelList dataKey="value" position="inside" />
                </Pie>
                <Tooltip />
                
            </PieChart>
            
            </div>
        </Container>
    </div>

    )
}

export default Dashboard;