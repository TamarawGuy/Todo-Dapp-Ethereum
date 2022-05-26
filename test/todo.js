const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Todo", function () {
  let Todo;
  let todo;
  let owner, addr1, addr2;

  beforeEach(async () => {
    Todo = await ethers.getContractFactory("Todo");
    [owner, addr1, addr2] = await ethers.getSigners();
    todo = await Todo.deploy();
  });

  it("add task", async () => {
    let task = { text: "Some text" };
    expect(await todo.addTask(task.text))
      .to.emit(todo, "AddTask")
      .withArgs(owner.address, 1);
    let tasks = await todo.getAllTasks();
    let tasksLength = tasks.length;
    expect(tasksLength).to.equal(1);
  });

  it("get all tasks", async () => {
    let task = { text: "Some text" };
    await todo.addTask(task);
    await todo.connect(addr1).addTask(task);
    await todo.connect(addr2).addTask(task);
    const tasks = await todo.getAllTasks();
    expect(tasks.length).to.equal(3);
  });

  it("should get a specific address tasks", async () => {
    let task = { text: "Some text" };

    await todo.connect(addr1).addTask(task.text);
    let taskAddr1 = await todo.connect(addr1).getMyTasks();
    let taskAddr1Length = taskAddr1.length;

    await todo.connect(addr2).addTask(task.text);
    let taskAddr2 = await todo.connect(addr2).getMyTasks();
    let taskAddr2Length = taskAddr2.length;

    expect(taskAddr1Length).to.equal(1);
    expect(taskAddr2Length).to.equal(1);
  });

  it("should NOT delete another user's task", async () => {
    let task = { text: "Some text" };

    await todo.connect(addr1).addTask(task.text);
    await todo.connect(addr2).addTask(task.text);

    await expect(todo.connect(addr1).deleteTask(1)).to.be.revertedWith(
      "Only owner of this task can delete it"
    );
  });

  it("should delete your own task", async () => {
    let task = { text: "Some text" };
    await todo.connect(addr1).addTask(task.text);

    await todo.connect(addr1).deleteTask(0);
    const tasks = await todo.getAllTasks();
    expect(tasks.length).to.equal(0);
  });
});
