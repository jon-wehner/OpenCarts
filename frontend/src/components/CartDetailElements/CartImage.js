import { image } from "faker";

export default function CartImage({name, imageUrl}) {
  return (
    <img src={imageUrl} alt={name} />
  )
}
