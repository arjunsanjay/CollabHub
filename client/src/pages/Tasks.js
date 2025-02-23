import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form, Dropdown } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Navbar from "../components/Navbar"; // Adjust path if needed

const Tasks = () => {
  const [tasks, setTasks] = useState({
    todo: [{ id: "1", title: "Complete UI Design", priority: "Medium", dueDate: "", comments: [], completed: false, assignedTo: "", subtasks: [], files: [] }],
    inProgress: [{ id: "2", title: "Set Up Database", priority: "High", dueDate: "", comments: [], completed: false, assignedTo: "", subtasks: [], files: [] }],
    done: [],
  });

  const [newTask, setNewTask] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState("");
  const teamMembers = ["Alice", "Bob", "Charlie", "David"]; // Dummy team members

  // Function to add a new task
  const addTask = (category) => {
    if (newTask.trim() === "") return;
    const newTaskObj = {
      id: `${Date.now()}`,
      title: newTask,
      priority: newTaskPriority,
      dueDate: newTaskDueDate,
      comments: [],
      completed: false,
      assignedTo: newTaskAssignee,
      subtasks: [],
      files: [],
    };
    setTasks({ ...tasks, [category]: [...tasks[category], newTaskObj] });
    setNewTask("");
    setNewTaskDueDate("");
    setNewTaskAssignee("");
  };

  // Function to handle task deletion
  const deleteTask = (category, taskId) => {
    setTasks({
      ...tasks,
      [category]: tasks[category].filter((task) => task.id !== taskId),
    });
  };

  // Function to handle drag and drop
  const onDragEnd = (result) => {
    if (!result.destination) return; // Task was dropped outside valid area

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const start = tasks[source.droppableId];
    const end = tasks[destination.droppableId];

    const [movedTask] = start.splice(source.index, 1); // Remove task from source
    end.splice(destination.index, 0, movedTask); // Add task to destination

    setTasks({
      ...tasks,
      [source.droppableId]: start,
      [destination.droppableId]: end,
    });
  };

  return (
    <>
      <Navbar />
      <div className="pt-5"> {/* Adds padding to prevent overlap */}
        <Container className="mt-4">
          <h2>Task Management</h2>

          {/* Task Input Form */}
          <Row className="mt-3">
            <Col md={3}>
              <Form.Control type="text" placeholder="Enter new task..." value={newTask} onChange={(e) => setNewTask(e.target.value)} />
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
              <Form.Control type="date" value={newTaskDueDate} onChange={(e) => setNewTaskDueDate(e.target.value)} />
            </Col>
            <Col md={2}>
              <Dropdown onSelect={(eventKey) => setNewTaskAssignee(eventKey)}>
                <Dropdown.Toggle variant="secondary">Assign: {newTaskAssignee || "None"}</Dropdown.Toggle>
                <Dropdown.Menu>{teamMembers.map((member, idx) => <Dropdown.Item key={idx} eventKey={member}>{member}</Dropdown.Item>)}</Dropdown.Menu>
              </Dropdown>
            </Col>
            <Col md={3}>
              <Button variant="primary" onClick={() => addTask("todo")}>Add Task</Button>
            </Col>
          </Row>

          {/* Task Categories */}
          <DragDropContext onDragEnd={onDragEnd}>
            <Row className="mt-4">
              {Object.keys(tasks).map((category) => (
                <Col key={category} md={4}>
                  <h4>{category.replace(/([A-Z])/g, " $1")}</h4>
                  <Droppable droppableId={category}>
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps}>
                        {tasks[category].map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <Card className="p-3 mb-3 shadow" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                <h5>{task.title}</h5>
                                <p>Priority: {task.priority}</p>
                                <p>Due Date: {task.dueDate || "Not set"}</p>
                                <p>Assigned to: {task.assignedTo || "Unassigned"}</p>
                                <Button variant="danger" size="sm" onClick={() => deleteTask(category, task.id)}>Delete</Button>
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
      </div>
    </>
  );
};

export default Tasks;
