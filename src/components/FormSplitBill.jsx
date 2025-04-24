import { useState } from "react";
import Button from "./Button";

export default function FormSplitBill({ selectedFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [userExpense, setUserExpense] = useState("");
  const friendExpense = bill ? bill - userExpense : "";
  const [whosPaying, setWhosPaying] = useState("user");

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || (!userExpense && userExpense !== 0)) return;

    onSplitBill(whosPaying === "user" ? friendExpense : -userExpense);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split a bill with {selectedFriend.name}</h2>

      <label>💰 Bill value</label>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(+e.target.value)}
      />

      <label>🧍 Your expense</label>
      <input
        type="number"
        max={bill}
        value={userExpense}
        onChange={(e) =>
          setUserExpense(+e.target.value > bill ? userExpense : +e.target.value)
        }
      />

      <label>👩‍🤝‍🧑 {selectedFriend.name}'s expense</label>
      <input type="number" value={friendExpense} disabled={true} />

      <label>🤑 Who's paying the bill?</label>
      <select
        value={whosPaying}
        onChange={(e) => setWhosPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
