import { useEffect, useState } from "react";
import { supabase } from "../client";
import { useParams, Link } from "react-router-dom";

export default function CrewDetail() {
  const { id } = useParams();
  const [crew, setCrew] = useState(null);

  useEffect(() => {
    const fetchCrewmate = async () => {
      const { data } = await supabase
        .from("Crewmates")
        .select()
        .eq("id", id)
        .single();

      setCrew(data);
    };

    fetchCrewmate();
  }, [id]);

  if (!crew) return <p>Loading...</p>;

  return (
    <div className="page">
      <h2>{crew.name}</h2>
      <p><strong>Color:</strong> {crew.color}</p>
      <p><strong>Count:</strong> {crew.crewmateCount}</p>

      <Link to={`/edit/${crew.id}`}>
        <button>Edit Crewmate</button>
      </Link>
    </div>
  );
}
