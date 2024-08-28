import React, { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import { Element } from "react-scroll";
import UserTable from "./components/UserTable";
import AddUserModal from "./components/AddUserModal";
import MedicalPolicyTable from "./components/MedicalPolicyTable";
import YearlyBonusTable from "./components/YearlyBonusTable";
import { CSSTransition } from "react-transition-group";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [nextId, setNextId] = useState(1001);

  useEffect(() => {
    fetch("https://hub.dummyapis.com/employee?noofRecords=10&idStarts=1001")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        const highestId = Math.max(...data.map((user) => user.id), 1000);
        setNextId(highestId + 1);
      })
      .catch((error) => console.error("Error fetching data:", error));

    document.body.className = isDarkTheme ? "dark-theme" : "light-theme";
  }, [isDarkTheme]);

  const handleAddUser = () => {
    setEditingUser(null);
    setShowAddUserModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowAddUserModal(true);
  };

  const handleSaveUser = (user) => {
    if (editingUser) {
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
    } else {
      const newUser = { ...user, id: nextId };
      setUsers([...users, newUser]);
      setNextId(nextId + 1);
    }
    setShowAddUserModal(false);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleCloseModal = () => {
    setShowAddUserModal(false);
    setEditingUser(null);
  };

  const toggleTheme = () => {
    setIsDarkTheme((prevTheme) => !prevTheme);
  };

  return (
    <div className="App">
      <NavBar />
      <div className="home-content">
        <div className="hero-content">
          <h1>Welcome to the Employee Portal</h1>
          <p>
            Manage your employees efficiently with our comprehensive employee
            management system. Navigate through the sections to view and manage
            employee details, medical policies, and yearly bonus calculations.
          </p>
          <div className="button-container">
            <button onClick={handleAddUser} className="add-user-button">
              Add New User
            </button>
            <button onClick={toggleTheme} className="add-user-button">
              Toggle {isDarkTheme ? "Light" : "Dark"} Mode
            </button>
          </div>
        </div>
      </div>
      <div className="tables-container">
        <Element name="employee-list" className="section">
          <CSSTransition
            in={true}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            <UserTable
              users={users}
              onEdit={handleEditUser}
              onDelete={handleDeleteUser}
            />
          </CSSTransition>
        </Element>
        <Element name="medical-details" className="section">
          <CSSTransition
            in={true}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            <MedicalPolicyTable users={users} />
          </CSSTransition>
        </Element>
        <Element name="yearly-bonus" className="section">
          <CSSTransition
            in={true}
            timeout={300}
            classNames="fade"
            unmountOnExit
          >
            <YearlyBonusTable users={users} />
          </CSSTransition>
        </Element>
      </div>
      <CSSTransition
        in={showAddUserModal}
        timeout={300}
        classNames="modal"
        unmountOnExit
      >
        <AddUserModal
          onClose={handleCloseModal}
          onSave={handleSaveUser}
          editingUser={editingUser}
        />
      </CSSTransition>
    </div>
  );
}

export default App;
