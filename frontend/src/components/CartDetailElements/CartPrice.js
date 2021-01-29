import { $CombinedState } from "redux";

export default function CartPrice({priceLevel}) {
  return (
    <p>{'$'.repeat(priceLevel)}</p>
  )
}
