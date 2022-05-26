// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Todo {
    address public owner;

    event AddTask(address recipient, uint256 taskId);
    event DeleteTask(uint256 taskId, bool isDeleted);

    struct Task {
        uint256 id;
        string text;
        address recipient;
        bool isDeleted;
    }

    Task[] public tasks;

    // task id to owner address
    mapping(uint256 => address) taskToOwner;

    constructor() {
        owner = msg.sender;
    }

    function addTask(string memory _text) public {
        uint256 id = tasks.length;
        Task memory newTask = Task(id, _text, msg.sender, false);
        tasks.push(newTask);
        taskToOwner[id] = msg.sender;
        emit AddTask(msg.sender, id);
    }

    function getAllTasks() external view returns (Task[] memory) {
        return tasks;
    }

    function getMyTasks() external view returns (Task[] memory) {
        Task[] memory temps = new Task[](tasks.length);
        uint256 counter = 0;

        for (uint256 i = 0; i < tasks.length; i++) {
            if (tasks[i].recipient == msg.sender) {
                temps[counter] = tasks[i];
                counter++;
            }
        }

        Task[] memory result = new Task[](counter);

        for (uint256 i = 0; i < counter; i++) {
            result[i] = temps[i];
        }

        return result;
    }

    function deleteTask(uint256 taskId) external {
        require(
            taskToOwner[taskId] == msg.sender,
            "Only owner of this task can delete it"
        );
        tasks[taskId] = tasks[tasks.length - 1];
        tasks.pop();
    }
}
