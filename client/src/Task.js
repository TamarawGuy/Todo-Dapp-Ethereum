import React from "react";
import styled from "styled-components";

const Container = styled.div``;

const Task = ({ id, text, deleteTask }) => {
  return (
    <div>
      <p>
        {text}
        <button onClick={() => deleteTask(id)}>Delete</button>
      </p>
    </div>
  );
};

export default Task;
