export interface Cuisine {
  id: number;
  name: string;
}

export interface State {
  id: number;
  name: string;
}

export interface Cart {
  id: number;
  name: string;
  address: string;
  priceLevel: number;
  cuisineId: number;
  city: string;
  stateId: number;
  zipCode: number;
  imageUrl: string;
  State: State;
  Cuisine: Cuisine;
}

export interface Review {
  id: number;
  review: string;
  rating: number;
  userId: number;
  cartId: number;
  reservationId: number;
}
