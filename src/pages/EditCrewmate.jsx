import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { supabase } from '../supabase'

export default function EditCrewmate() {
  const { id } = useParams()
  const [name, setName] = useState('')
  const [color, setColor] = useState('')
  const [crewmateCount, setCrewmateCount] = useState(1)

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('crew')
        .select('*')
        .eq('id', id)
        .single()

      setName(data.name)
      setColor(data.color)
      setCrewmateCount(data.crewmateCount)
    }

    load()
  }, [])

  async function handleUpdate(e) {
    e.preventDefault()

    await supabase
      .from('crew')
      .update({ name, color, crewmateCount })
      .eq('id', id)

    window.location.href = '/summary'
  }

  async function handleDelete() {
    await supabase.from('crew').delete().eq('id', id)
    window.location.href = '/summary'
  }

  const colors = ['red', 'blue', 'green', 'yellow', 'pink', 'purple']

  return (
    <div>
      <h1>Edit Crewmate</h1>

      <form onSubmit={handleUpdate}>
        <label>Name</label>
        <input value={name} onChange={e => setName(e.target.value)} />

        <label>Color</label>
        <div>
          {colors.map(c => (
            <button
              key={c}
              type="button"
              style={{ background: c, margin: 4 }}
              onClick={() => setColor(c)}
            >
              {c}
            </button>
          ))}
        </div>

        <label>Count</label>
        <input
          type="number"
          value={crewmateCount}
          onChange={e => setCrewmateCount(Number(e.target.value))}
        />

        <button type="submit">Update</button>
      </form>

      <hr />

      <button onClick={handleDelete} style={{ color: 'red' }}>
        Delete Crewmate
      </button>
    </div>
  )
}
