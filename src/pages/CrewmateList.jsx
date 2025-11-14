import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function CrewmateList() {
  const [crew, setCrew] = useState([])

  useEffect(() => {
    async function fetchCrew() {
      let { data } = await supabase
        .from('crew')
        .select('*')
        .order('created_at', { ascending: false })

      setCrew(data)
    }

    fetchCrew()
  }, [])

  return (
    <div>
      <h1>Your Crewmates</h1>

      {crew.map(c => (
        <div
          key={c.id}
          style={{
            border: '1px solid black',
            margin: '10px',
            padding: '10px',
            cursor: 'pointer'
          }}
          onClick={() => (window.location.href = `/crew/${c.id}`)}
        >
          <h3>{c.name}</h3>
          <p>Color: {c.color}</p>
          <p>Count: {c.crewmateCount}</p>
        </div>
      ))}
    </div>
  )
}
