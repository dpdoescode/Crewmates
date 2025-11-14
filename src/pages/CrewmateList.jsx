import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { Link } from "react-router-dom";
import "../styles.css";

export default function CrewmateList() {
  const [crewmates, setCrewmates] = useState([]);

  // Fetch all crewmates from Supabase
  const fetchCrewmates = async () => {
    try {
      const { data, error } = await supabase
        .from("crew")
        .select()
        .order("id", { ascending: false });

      if (error) throw error;
      setCrewmates(data);
    } catch (err) {
      console.error("Error fetching crewmates:", err.message);
    }
  };

  useEffect(() => {
    fetchCrewmates();
  }, []);

  return (
    <div className="page">
      <h1>Crewmates</h1>
      <Link to="/create">
        <button>Create New Crewmate</button>
      </Link>

      <ul>
        {crewmates.map((c) => (
          <li key={c.id} className="crewmate-card">
            <Link to={`/crew/${c.id}`}>
              <span style={{ color: c.color, fontWeight: "bold" }}>{c.name}</span>{" "}
              - Count: {c.crewmateCount}
            </Link>
            <Link to={`/edit/${c.id}`}>
              <button>Edit</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
