import { useState } from "react"

export default function SearchBar ({onInputChange}) {

  return (
    <input type="text" onChange={e => onInputChange(e.target.value)}/>
  )
}
