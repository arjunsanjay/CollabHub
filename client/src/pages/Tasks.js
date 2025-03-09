import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Form, Dropdown } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Navbar from "../components/Navbar";
import axios from "axios";

const Tasks = () => {
  const [tasks, setTasks] = useState({ todo: [], inProgress: [], done: [] });
  const [newTask, setNewTask] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState("");
  const [newTaskCategory, setNewTaskCategory] = useState("todo");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/user-tasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (data.success) {
        setTasks(data.tasks);
      } else {
        console.error("Failed to fetch tasks:", data.message);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (newTask.trim() === "") return;
    try {
      await axios.post(
        "http://localhost:5000/api/user-tasks",
        {
          title: newTask,
          priority: newTaskPriority,
          dueDate: newTaskDueDate,
          assignedTo: newTaskAssignee,
          category: newTaskCategory,
        },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      fetchTasks();
      setNewTask("");
      setNewTaskDueDate("");
      setNewTaskAssignee("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/user-tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const draggedTask = tasks[source.droppableId][source.index];

    const updatedTasks = { ...tasks };
    updatedTasks[source.droppableId].splice(source.index, 1);
    updatedTasks[destination.droppableId].splice(destination.index, 0, {
      ...draggedTask,
      category: destination.droppableId,
    });

    setTasks(updatedTasks);

    try {
      await axios.put(
        `http://localhost:5000/api/user-tasks/${draggedTask._id}`,
        { category: destination.droppableId },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
    } catch (error) {
      console.error("Error updating task category:", error);
      fetchTasks();
    }
  };

  return (
    <>
      <Navbar />
      <Container className="mt-4">
        <h2>Task Management</h2>
        <Row className="align-items-end">
          <Col md={3}>
            <Form.Control
              type="text"
              placeholder="Enter new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
          </Col>
          <Col md={2}>
            <Dropdown onSelect={(eventKey) => setNewTaskPriority(eventKey)}>
              <Dropdown.Toggle variant="secondary">Priority: {newTaskPriority}</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="High">🔴 High</Dropdown.Item>
                <Dropdown.Item eventKey="Medium">🟡 Medium</Dropdown.Item>
                <Dropdown.Item eventKey="Low">🟢 Low</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={2}>
            <Form.Control
              type="date"
              value={newTaskDueDate}
              onChange={(e) => setNewTaskDueDate(e.target.value)}
            />
          </Col>
          <Col md={2} className="mb-2">
            <Dropdown onSelect={(eventKey) => setNewTaskCategory(eventKey)}>
              <Dropdown.Toggle variant="secondary">Category: {newTaskCategory}</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="todo">📝 To-Do</Dropdown.Item>
                <Dropdown.Item eventKey="inProgress">🚧 In Progress</Dropdown.Item>
                <Dropdown.Item eventKey="done">✅ Done</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={3} className="mt-2">
            <Button variant="primary" onClick={addTask}>
              Add Task
            </Button>
          </Col>
        </Row>

        <DragDropContext onDragEnd={onDragEnd}>
          <Row className="mt-4">
            {Object.keys(tasks).map((category) => (
              <Col key={category} md={4}>
                <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                <Droppable droppableId={category}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        minHeight: "100px",
                        background: "#f8f9fa",
                        padding: "10px",
                        borderRadius: "5px",
                      }}
                    >
                      {tasks[category].map((task, index) => (
                        <Draggable key={task._id} draggableId={task._id} index={index}>
                          {(provided) => (
                            <Card
                              className="p-3 mb-3 shadow"
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <h5>{task.title}</h5>
                              <p>Priority: {task.priority}</p>
                              <p>Due Date: {task.dueDate || "Not set"}</p>
                              <p>Assigned to: {task.assignedTo || "Unassigned"}</p>
                              <Button variant="danger" size="sm" onClick={() => deleteTask(task._id)}>
                                Delete
                              </Button>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </Col>
            ))}
          </Row>
        </DragDropContext>
      </Container>
    </>
  );
};

export default Tasks;
