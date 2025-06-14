import styled from "styled-components";

const PlanContainer = styled.div`
  background: linear-gradient(to bottom, #444, #3a3a3a);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 30px auto 0 auto;

  @media (max-width: 1024px) {
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
  }
`;

const Plan = styled.div`

  padding:10px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PlanText = styled.p`
  text-align: center;
  color: #c3c3c3;
  margin-bottom: 10px;
  font-size: 12px;
  font-style: italic;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export { PlanContainer, Plan, PlanText };
