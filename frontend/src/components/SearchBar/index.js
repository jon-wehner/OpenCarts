import './SearchBar.css'
export default function SearchBar ({onInputChange}) {

  return (
    <input type="text" onChange={e => onInputChange(e.target.value)}/>
  )
}
