import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import "../styles.css";

export default function EditCrewmate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [color, setColor] = useState("");
  const [crewmateCount, setCrewmateCount] = useState(1);

  const colors = ["red", "blue", "green", "yellow", "pink", "purple"];

  // Fetch current crewmate data
  const fetchCrewmate = async () => {
    try {
      const { data, error } = await supabase
        .from("crew")
        .select()
        .eq("id", id)
        .single();
      if (error) throw error;

      setName(data.name);
      setColor(data.color);
      setCrewmateCount(data.crewmateCount);
    } catch (err) {
      console.error("Error fetching crewmate:", err.message);
    }
  };

  useEffect(() => {
    fetchCrewmate();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("crew")
        .update({ name, color, crewmateCount })
        .eq("id", id);

      if (error) throw error;
      navigate("/");
    } catch (err) {
      console.error("Error updating crewmate:", err.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from("crew").delete().eq("id", id);
      if (error) throw error;
      navigate("/");
    } catch (err) {
      console.error("Error deleting crewmate:", err.message);
    }
  };

  return (
    <div className="page">
      <h1>Edit Crewmate</h1>
      <form onSubmit={handleUpdate}>
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

        <button type="submit">Update</button>
        <button onClick={handleDelete} style={{ marginLeft: "10px" }}>
          Delete
        </button>
      </form>
    </div>
  );
}
