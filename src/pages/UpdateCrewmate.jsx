import { useState, useEffect } from "react";
import { supabase } from "../client";
import { useParams } from "react-router-dom";

export default function EditCrewmate() {
  const { id } = useParams();
  const [crew, setCrew] = useState({
    name: "",
    color: "",
    crewmateCount: 1,
  });

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

  const updateCrewmate = async (e) => {
    e.preventDefault();

    await supabase
      .from("Crewmates")
      .update({
        name: crew.name,
        color: crew.color,
        crewmateCount: crew.crewmateCount,
      })
      .eq("id", id);

    window.location = "/";
  };

  const deleteCrewmate = async (e) => {
    e.preventDefault();

    await supabase.from("Crewmates").delete().eq("id", id);

    window.location = "/";
  };

  return (
    <div className="page">
      <h2>Edit Crewmate</h2>

      <form>
        <input
          type="text"
          value={crew.name}
          onChange={(e) => setCrew({ ...crew, name: e.target.value })}
        />

        <input
          type="text"
          value={crew.color}
          onChange={(e) => setCrew({ ...crew, color: e.target.value })}
        />

        <input
          type="number"
          value={crew.crewmateCount}
          onChange={(e) =>
            setCrew({ ...crew, crewmateCount: Number(e.target.value) })
          }
        />

        <input type="submit" value="Update" onClick={updateCrewmate} />
      </form>

      <button onClick={deleteCrewmate} style={{ marginTop: "20px" }}>
        Delete Crewmate
      </button>
    </div>
  );
}
