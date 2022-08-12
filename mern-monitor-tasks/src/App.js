import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom"

import Navbar from "./components/navbar.component"
import TasksList from "./components/TasksList.component"
import CreateTasks from "./components/create-tasks.component";
import EditTasks from "./components/edit-tasks.component"

function App() {
  return (
      <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Routes>
          <Route path="/" element={<TasksList />} />
          <Route path="/add" element={<CreateTasks />} />
          <Route path="/update" element={<EditTasks />} />
        </Routes>
      </div>
      </Router>
  );
}

export default App;