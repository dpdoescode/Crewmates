import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "../supabase";
import "../styles.css";

export default function CrewDetail() {
  const { id } = useParams();
  const [crewmate, setCrewmate] = useState(null);

  const fetchCrewmate = async () => {
    try {
      const { data, error } = await supabase
        .from("crew")
        .select()
        .eq("id", id)
        .single();
      if (error) throw error;
      setCrewmate(data);
    } catch (err) {
      console.error("Error fetching crewmate:", err.message);
    }
  };

  useEffect(() => {
    fetchCrewmate();
  }, [id]);

  if (!crewmate) return <div>Loading...</div>;

  return (
    <div className="page">
      <h1>{crewmate.name}</h1>
      <p>
        <strong>Color:</strong>{" "}
        <span style={{ color: crewmate.color }}>{crewmate.color}</span>
      </p>
      <p>
        <strong>Crewmate Count:</strong> {crewmate.crewmateCount}
      </p>
      <Link to={`/edit/${crewmate.id}`}>
        <button>Edit Crewmate</button>
      </Link>
      <Link to="/">
        <button style={{ marginLeft: "10px" }}>Back to List</button>
      </Link>
    </div>
  );
}
