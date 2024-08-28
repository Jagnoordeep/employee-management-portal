import React, { useState } from "react";
import "./YearlyBonusTable.css";

function YearlyBonusTable({ users }) {
  const [selectedUser, setSelectedUser] = useState("");
  const [userBonuses, setUserBonuses] = useState({});
  const [saleTarget, setSaleTarget] = useState(0);
  const [achievedTarget, setAchievedTarget] = useState(0);
  const [monthsElapsed, setMonthsElapsed] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  function calculateForecastAndBonus(
    achievedTarget,
    saleTarget,
    monthsElapsed
  ) {
    const monthlyAverage = achievedTarget / monthsElapsed;
    const forecastAnnual = monthlyAverage * 12;

    const target125Percent = saleTarget * 1.25;
    let calculatedBonus = 0;

    if (achievedTarget >= target125Percent) {
      const excessAmountAbove125 = achievedTarget - target125Percent;
      const excessAmountUpTo125 = target125Percent - saleTarget;
      calculatedBonus =
        excessAmountAbove125 * 0.075 +
        excessAmountUpTo125 * 0.05 +
        saleTarget * 0.1;
    } else if (achievedTarget >= saleTarget) {
      const excessAmount = achievedTarget - saleTarget;
      calculatedBonus = excessAmount * 0.05 + saleTarget * 0.1;
    } else {
      calculatedBonus = achievedTarget * 0.05;
    }

    return { forecastAnnual, calculatedBonus };
  }

  function handleUserChange(event) {
    const userId = event.target.value;
    setSelectedUser(userId);

    if (userBonuses[userId]) {
      const userBonus = userBonuses[userId];
      setSaleTarget(userBonus.saleTarget);
      setAchievedTarget(userBonus.achievedTarget);
      setMonthsElapsed(userBonus.monthsElapsed);
    } else {
      setSaleTarget(1000000); 
      setAchievedTarget(900000);
      setMonthsElapsed(9);
    }

    setIsEditing(false);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const { forecastAnnual, calculatedBonus } = calculateForecastAndBonus(
      achievedTarget,
      saleTarget,
      monthsElapsed
    );

    setUserBonuses({
      ...userBonuses,
      [selectedUser]: {
        saleTarget,
        achievedTarget,
        monthsElapsed,
        forecastAnnual,
        bonusAmount: calculatedBonus,
      },
    });

    setSelectedUser("");
    setIsEditing(false);
  }

  function handleEdit(userId) {
    const userBonus = userBonuses[userId];
    setSelectedUser(userId);
    setSaleTarget(userBonus.saleTarget);
    setAchievedTarget(userBonus.achievedTarget);
    setMonthsElapsed(userBonus.monthsElapsed);
    setIsEditing(true);
  }

  const yearlyBonusData = users.map((user) => {
    const userBonus = userBonuses[user.id] || {};
    return {
      id: user.id,
      fullName: `${user.firstName} ${user.lastName}`,
      saleTarget: userBonus.saleTarget || 0,
      achievedTarget: userBonus.achievedTarget || 0,
      forecastAnnual: userBonus.forecastAnnual || 0,
      bonusAmount: userBonus.bonusAmount || 0,
    };
  });

  return (
    <div id="yearly-bonus">
      <h2>Employee Yearly Bonus Calculation</h2>
      <form onSubmit={handleSubmit} className="bonus-form">
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
          <label htmlFor="saleTarget">Sale Target:</label>
          <input
            type="number"
            id="saleTarget"
            value={saleTarget}
            onChange={(e) => setSaleTarget(Number(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="achievedTarget">Achieved Target:</label>
          <input
            type="number"
            id="achievedTarget"
            value={achievedTarget}
            onChange={(e) => setAchievedTarget(Number(e.target.value))}
          />
        </div>
        <div className="form-group">
          <label htmlFor="monthsElapsed">Months Elapsed:</label>
          <input
            type="number"
            id="monthsElapsed"
            value={monthsElapsed}
            onChange={(e) => setMonthsElapsed(Number(e.target.value))}
          />
        </div>
        <button type="submit" className="submit-button">
          {isEditing ? "Save Changes" : "Calculate"}
        </button>
      </form>

      <table className="yearly-bonus-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Sale Target</th>
            <th>Achieved Target</th>
            <th>Forecast Annual Target</th>
            <th>Bonus Amount</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {yearlyBonusData.length > 0 ? (
            yearlyBonusData.map((bonus) => (
              <tr key={bonus.id}>
                <td>{bonus.fullName}</td>
                <td>{bonus.saleTarget.toLocaleString()}</td>
                <td>{bonus.achievedTarget.toLocaleString()}</td>
                <td>{bonus.forecastAnnual.toLocaleString()}</td>
                <td>{bonus.bonusAmount.toLocaleString()}</td>
                <td>
                  {userBonuses[bonus.id] && (
                    <button type="button" onClick={() => handleEdit(bonus.id)}>
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default YearlyBonusTable;
