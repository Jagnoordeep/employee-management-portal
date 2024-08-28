import React, { useState, useEffect } from "react";
import "./MedicalPolicyTable.css";

const policySalaries = {
  ABC: 200000,
  XYZ: 500000,
  LMN: 700000,
};

const policyNames = Object.keys(policySalaries);

function MedicalPolicyTable({ users }) {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedPolicy, setSelectedPolicy] = useState("");
  const [userPolicies, setUserPolicies] = useState({});
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false); // New state to track if we're editing

  function getRandomClaimedAmount() {
    return Math.floor(Math.random() * (50000 - 25000 + 1)) + 25000;
  }

  function calculatePolicyDetails(salary, claimedAmount) {
    const maxAmount = salary < 500000 ? 1000000 : 2.5 * salary;
    const balanceLeft = maxAmount - claimedAmount;
    return { maxAmount, balanceLeft };
  }

  function handleUserChange(event) {
    setSelectedUser(event.target.value);
    setSelectedPolicy(userPolicies[event.target.value]?.policyName || "");
    setError("");
  }

  function handlePolicyChange(event) {
    setSelectedPolicy(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!selectedUser || !selectedPolicy) {
      setError("Please select both user and policy.");
      return;
    }

    const claimedAmount =
      userPolicies[selectedUser]?.claimedAmount || getRandomClaimedAmount();
    const { maxAmount, balanceLeft } = calculatePolicyDetails(
      policySalaries[selectedPolicy],
      claimedAmount
    );

    setUserPolicies({
      ...userPolicies,
      [selectedUser]: {
        policyName: selectedPolicy,
        claimedAmount,
        maxAmount,
        balanceLeft,
      },
    });

    setError("");
    setSelectedUser("");
    setSelectedPolicy("");
    setIsEditing(false); 
  }

  function handleEdit(userId) {
    setSelectedUser(userId);
    setSelectedPolicy(userPolicies[userId]?.policyName || "");
    setIsEditing(true); 
  }

  const medicalPolicyData = users.map((user) => {
    const userPolicy = userPolicies[user.id];
    return {
      id: user.id,
      fullName: `${user.firstName} ${user.lastName}`,
      numberOfDependents: user.salary < 500000 ? 2 : 3,
      policyName: userPolicy?.policyName || "",
      claimedAmount: userPolicy?.claimedAmount || 0,
      maxAmount: userPolicy?.maxAmount || 0,
      balanceLeft: userPolicy?.balanceLeft || 0,
    };
  });

  return (
    <div id="medical-details">
      <h2>Employee Medical Policy Details</h2>
      <form className="policy-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userName">User:</label>
          <select
            id="userName"
            value={selectedUser}
            onChange={handleUserChange}
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.firstName} {user.lastName}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="policyName">Policy Name:</label>
          <select
            id="policyName"
            value={selectedPolicy}
            onChange={handlePolicyChange}
            disabled={
              !selectedUser || (userPolicies[selectedUser] && !isEditing)
            }
          >
            <option value="">Select Policy</option>
            {policyNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </div>
        {error && <div className="error-message">{error}</div>}
        <button type="submit" className="submit-button">
          {isEditing ? "Save Changes" : "Submit Policy"}
        </button>
      </form>

      <table className="medical-policy-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Number of Dependents</th>
            <th>Policy Name</th>
            <th>Max Amount</th>
            <th>Claimed Amount</th>
            <th>Balance Left</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {medicalPolicyData.length > 0 ? (
            medicalPolicyData.map((policy) => (
              <tr key={policy.id}>
                <td>{policy.fullName}</td>
                <td>{policy.numberOfDependents}</td>
                <td>{policy.policyName}</td>
                <td>{policy.maxAmount.toLocaleString()}</td>
                <td>{policy.claimedAmount.toLocaleString()}</td>
                <td>{policy.balanceLeft.toLocaleString()}</td>
                <td>
                  {userPolicies[policy.id] && (
                    <button type="button" onClick={() => handleEdit(policy.id)}>
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default MedicalPolicyTable;
