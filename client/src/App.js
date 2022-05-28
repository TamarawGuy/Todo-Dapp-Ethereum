import { useState, useEffect } from "react";
import { ethers } from "ethers";
import styled from "styled-components";
import Todo from "./utils/Todo.json";
import { CONTRACT_ADDRESS } from "./config.js";

import TaskList from "./TaskList";
import TaskForm from "./TaskForm";

const Container = styled.div`
  text-align: center;
`;

const App = () => {
  const abi = Todo.abi;
  const [tasks, setTasks] = useState([]);
  const [account, setAccount] = useState("");

  useEffect(() => {
    const init = async () => {
      connectWallet();
      getAllUserTasks();
    };

    init();
  }, [tasks, account]);

  const connectWallet = async () => {
    if (!window.ethereum) {
      console.log("Metamask not detected");
    }

    let chainId = await window.ethereum.request({ method: "eth_chainId" });

    const rinkebyChainId = "0x4";

    if (chainId !== rinkebyChainId) {
      alert("You are not connected to Rinkeby Testnet!");
      return;
    }

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
  };

  const getAllUserTasks = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const todo = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

      let allTasks = await todo.getMyTasks();
      setTasks(allTasks);
    } else {
      console.log("Install metamask");
    }
  };

  const addTask = async (text) => {
    let task = { id: tasks.length, text, account };
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const todo = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

      await todo.addTask(task.text);
      let allTasks = await todo.getMyTasks(task.text);
      setTasks(allTasks);
    }
  };

  const deleteTask = async (id) => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const todo = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

      await todo.deleteTask(id);
      let allTasks = await todo.getMyTasks();
      setTasks(allTasks);
    }
  };

  return (
    <Container>
      <TaskForm addTask={addTask} />
      <TaskList tasks={tasks} deleteTask={deleteTask} />
    </Container>
  );
};
export default App;
