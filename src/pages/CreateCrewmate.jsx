import { useState } from "react";
import { supabase } from "../client";

export default function CreateCrewmate() {
  const [crewmate, setCrewmate] = useState({
    name: "",
    color: "",
    crewmateCount: 1
  });

  const createCrewmate = async (event) => {
    event.preventDefault();

    await supabase
      .from("Crewmates")
      .insert({
        name: crewmate.name,
        color: crewmate.color,
        crewmateCount: crewmate.crewmateCount
      })
      .select();

    window.location = "/";
  };

  return (
    <div className="page">
      <h2>Create a New Crewmate</h2>

      <form>
        <input
          type="text"
          placeholder="Crewmate Name"
          onChange={(e) => setCrewmate({ ...crewmate, name: e.target.value })}
        />

        <input
          type="text"
          placeholder="Color"
          onChange={(e) => setCrewmate({ ...crewmate, color: e.target.value })}
        />

        <input
          type="number"
          placeholder="Count"
          onChange={(e) =>
            setCrewmate({ ...crewmate, crewmateCount: Number(e.target.value) })
          }
        />

        <input type="submit" value="Create" onClick={createCrewmate} />
      </form>
    </div>
  );
}
