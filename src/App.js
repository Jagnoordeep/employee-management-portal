import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import UserTable from "./components/UserTable";
import AddUserModal from "./components/AddUserModal";
import MedicalPolicyTable from "./components/MedicalPolicyTable";
import YearlyBonusTable from "./components/YearlyBonusTable";
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
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="home-content">
                <div className="hero-content">
                  <h1>Welcome to the Employee Portal</h1>
                  <p>
                    Easily manage employee details, access medical policy
                    information, and track yearly bonuses. Designed for
                    efficiency, this portal ensures all essential HR tasks are
                    just a click away.
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
                <UserTable
                  users={users}
                  onEdit={handleEditUser}
                  onDelete={handleDeleteUser}
                />
              </div>
            }
          />
          <Route
            path="/medical-details"
            element={<MedicalPolicyTable users={users} />}
          />
          <Route
            path="/yearly-bonus"
            element={<YearlyBonusTable users={users} />}
          />
        </Routes>
        {showAddUserModal && (
          <AddUserModal
            onClose={handleCloseModal}
            onSave={handleSaveUser}
            editingUser={editingUser}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
