import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 60%;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid gray;
`;

const Span = styled.span``;

const Button = styled.button`
  padding: 7px;
  border: none;
  background-color: rgb(0, 0, 205);
  color: white;
  border-radius: 5px;
`;

const Task = ({ id, text, deleteTask }) => {
  return (
    <Container>
      <Wrapper>
        <Span>{text}</Span>
        <Button onClick={() => deleteTask(id)}>Delete</Button>
      </Wrapper>
    </Container>
  );
};

export default Task;
