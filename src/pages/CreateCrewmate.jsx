import { useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import "../styles.css";

export default function CreateCrewmate() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [crewmateCount, setCrewmateCount] = useState(1);

  const colors = ["red", "blue", "green", "yellow", "pink", "purple"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase
        .from("crew")
        .insert([{ name, color, crewmateCount }])
        .select();

      if (error) throw error;

      console.log("Crewmate added:", data);
      navigate("/");
    } catch (err) {
      console.error("Error adding crewmate:", err.message);
    }
  };

  return (
    <div className="page">
      <h1>Create a Crewmate</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <div>
          {colors.map((c) => (
            <button
              key={c}
              type="button"
              className={`color-button ${color === c ? "selected" : ""}`}
              style={{ backgroundColor: c }}
              onClick={() => setColor(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <input
          type="number"
          placeholder="Count"
          value={crewmateCount}
          onChange={(e) => setCrewmateCount(Number(e.target.value))}
          min={1}
        />

        <button type="submit">Add Crewmate</button>
      </form>
    </div>
  );
}
