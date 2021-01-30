import './CartDetails.css'

export default function CartPrice({priceLevel}) {
  const grayedDollars = 4 - priceLevel
  return (
    <div className="cartDetails__price">
      <p className="cartDetails__greenPrice">{'$'.repeat(priceLevel)}</p>
      <p className="cartDetails__grayPrice">{'$'.repeat(grayedDollars)}</p>
    </div>


  )
}
