import React, { useState, useEffect } from "react";
import "./AddUserModal.css";

function AddUserModal({ onClose, onSave, editingUser }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingUser) {
      setFirstName(editingUser.firstName);
      setLastName(editingUser.lastName);
      setEmail(editingUser.email);
      setDob(editingUser.dob || "");
      setAge(editingUser.age || "");
    } else {
      setFirstName("");
      setLastName("");
      setEmail("");
      setDob("");
      setAge("");
    }
  }, [editingUser]);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      calculatedAge--;
    }
    return calculatedAge;
  };

  const handleDobChange = (event) => {
    const dobValue = event.target.value;
    setDob(dobValue);
    setAge(calculateAge(dobValue));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!firstName || !lastName || !email || !dob) {
      setErrors({ message: "Please fill in all fields" });
    } else {
      const newUser = {
        firstName,
        lastName,
        email,
        dob,
        age,
        salary: 500000, 
      };
      onSave(newUser);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{editingUser ? "Edit User" : "Add New User"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Date of Birth:</label>
            <input type="date" value={dob} onChange={handleDobChange} />
          </div>
          <div className="form-group">
            <label>Age:</label>
            <input type="text" value={age} readOnly />
          </div>
          {errors.message && <div className="error">{errors.message}</div>}
          <div className="modal-footer">
            <button
              type="submit"
              disabled={!firstName || !lastName || !email || !dob}
            >
              {editingUser ? "Save Changes" : "Add User"}
            </button>
            <button onClick={onClose} className="close-button">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddUserModal;
