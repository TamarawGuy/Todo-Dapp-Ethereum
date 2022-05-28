import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 25vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Form = styled.form`
  width: 50vw;
  height: 15vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  -webkit-box-shadow: 0px 2px 15px 0px #000000;
  box-shadow: 0px 2px 15px 0px #000000;
`;

const Label = styled.label`
  font-size: 20px;
  width: 50%;
`;

const Input = styled.input`
  width: 50%;
  padding: 7px;
  margin: 10px;
`;

const Button = styled.button`
  padding: 7px;
  width: 90%;
  border: none;
  background-color: rgb(0, 0, 205);
  color: white;
  border-radius: 5px;
`;

const TaskForm = ({ addTask }) => {
  const [text, setText] = useState("");

  return (
    <Container>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          addTask(text);
          setText("");
        }}
      >
        <Label htmlFor="task">
          Enter Task
          <Input
            type="text"
            id="task"
            onChange={(e) => setText(e.target.value)}
          />
        </Label>
        <Button type="submit">Add Task</Button>
      </Form>
    </Container>
  );
};

export default TaskForm;
