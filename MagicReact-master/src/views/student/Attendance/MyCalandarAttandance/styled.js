import styled from "styled-components"

//box-shadow: 3px 1px #e6e6e6, -0.5em 0 .4em #b8c2cc;
export const Wrapper = styled.div `
width:100%;
min-height:100vh;
border:1px solid #e6e6e6;
box-sizing: border-box;
border-radius:5px;
display:inline-block;
margin:auto;
background:#fff;
box-shadow: 10px 10px 10px rgba(0,0,0,0.1), -10px -10px 10px rgba(255,255,255,1),inset 10px 10px 10px rgba(0,0,0,0.1),inset -10px -10px 10px rgba(255,255,255,1);
@media only screen and (min-width: 375px){min-height:50vh;};
@media only screen and (min-width: 360px){min-height:50vh;};
@media only screen and (min-width: 260px){min-height:50vh;};
`;


export const CalandarHead = styled.div `
width:100%;
height:40px;
margin-top:15px;
display:flex;
justify-content: space-around;
align-item:center;
font-size:2rem;
font-weight:bold;
`;


export const OneWeekSevenDaysColGrid = styled.div `
width:100%;
color:black;
display:grid;
grid-template-columns: repeat(7, 1fr);
height: 27px;
`;

export const HeadDay = styled.span `
justify-content:center;
text-align: center;
background: #7d9ac7;
font-size: 1rem;
font-weight:bold;
padding:8px;
border:1px solid #636363;
@media only screen and (min-width: 375px){font-size: 0.8rem;};
@media only screen and (min-width: 360px){font-size: 0.7rem;};
@media only screen and (min-width: 280px){font-size: 0.5rem;};
@media only screen and (min-width: 720px){font-size: 1rem;};
`;

export const CalandarBody = styled.div`
height: 100%;
display:grid;
grid-template-columns: repeat(7, 1fr);
grid-template-rows: repeat(${({fourCol}) => (fourCol ? 4 : 5)}, 1fr);
@media only screen and (min-width: 375px){margin-top: 15px;};
@media only screen and (min-width: 360px){margin-top: 15px;};
@media only screen and (min-width: 280px){margin-top: 15px;};
`;

export const StyledDay = styled.span `
color:black;
width:80%;
height:90%;
font-size: 1rem;
font-weight:bold;
border: 1px solid #b8c2cc;
box-shadow: 0.5px 0.5px #e6e6e6, -0.2em 0 .4em #b8c2cc;
text-align: center;
padding-top:25%;
border-radius: 50%;
margin: 15px;
margin-top:10px;
${({active}) => (active && `background:#7367f0; border:0.5px solid black; color:#fff`)};
&:hover{cursor:pointer;font-size: 1.1rem;color:#4b4b4b;box-shadow: 0.7px 0.6px #4b4b4b, -0.1em 0 .2em #b8c2cc;};
@media only screen and (max-width: 375px){height:80%;margin:0px;font-size: 0.9rem;};
@media only screen and (max-width: 844px){height:80%;margin:0px;font-size: 0.9rem;};
@media only screen and (max-width: 280px){width:90%;height:70%;margin:0px;font-size: 0.8rem;};

`;

//@media only screen and (min-width: 500px){width:80%;height:70%;margin: 1px;font-size: 0.7rem;color:red};

export const StyledDayAbsent = styled.span `
border: 1px solid black;
text-align: center;
padding-top:25%;
border-radius: 50%;
margin: 5px;
margin-top:30px;
background: #ea5455;
`;

export const StyledDayPresent = styled.span `
border: 1px solid black;
text-align: center;
padding-top:25%;
border-radius: 50%;
margin: 5px;
margin-top:30px;
background:#28c76f;
`;

export const StyledPresent = styled.span `
justify-content:center;
text-align: center;
background:#28c76f;
@media only screen and (min-width: 375px){font-size:12px;display:inline-flex;margin-top:-25px;};
`;

export const StyledAbsent = styled.span `
border-radius: 50%;
background: #ea5455;
`;