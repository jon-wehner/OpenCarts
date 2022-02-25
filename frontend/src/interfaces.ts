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
