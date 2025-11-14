import { useEffect, useState } from "react";
import { supabase } from "../client";
import { Link } from "react-router-dom";

export default function ReadCrewmates() {
  const [crewmates, setCrewmates] = useState([]);

  useEffect(() => {
    const fetchCrewmates = async () => {
      const { data } = await supabase
        .from("Crewmates")
        .select()
        .order("created_at", { ascending: false });

      setCrewmates(data);
    };

    fetchCrewmates();
  }, []);

  return (
    <div className="page">
      <h1>My Crewmates</h1>
      <Link to="/new">
        <button>Create New Crewmate</button>
      </Link>

      <div className="crewmate-list">
        {crewmates.map((crew) => (
          <Link key={crew.id} to={`/crewmate/${crew.id}`}>
            <div className="card">
              <h3>{crew.name}</h3>
              <p>Color: {crew.color}</p>
              <p>Count: {crew.crewmateCount}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
