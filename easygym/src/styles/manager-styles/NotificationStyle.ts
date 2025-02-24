import styled from "styled-components";

const Container = styled.div`
    width: 300px;
    background: #222;
    padding: 10px;
    border-left: 4px solid #ccc;
    color: #fff;
    height: 100vh;
`;

const Title = styled.h2`
    margin-bottom: 10px;
`;

const Box = styled.div`
    background: #333;
    padding: 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
`;

const InfoIcon = styled.span`
    margin-right: 10px;
`;

const Text = styled.p`
    font-style: italic;
    color: #ccc;
`;

export {InfoIcon,Container,Box,Text,Title}