import './SearchBar.css'
export default function SearchBar ({onInputChange}) {

  return (
    <input className="booking-area__input" type="text" onChange={e => onInputChange(e.target.value)}/>
  )
}
