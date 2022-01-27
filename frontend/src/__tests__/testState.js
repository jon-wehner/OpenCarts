export const testState = {
  "session": {
      "user": {
          "id": 1,
          "username": "demo",
          "email": "demo@user.io"
      }
  },
  "carts": {},
  "reservations": {
      "availableTimeslots": null,
      "userFutureReservations": [
          {
              "id": 2,
              "dateTime": "2042-01-27T08:30:00.000Z",
              "partySize": 1,
              "cartId": 3,
              "userId": 1,
              "reviewed": false,
              "createdAt": "2022-01-27T20:12:53.325Z",
              "updatedAt": "2022-01-27T20:12:53.325Z",
              "Cart": {
                  "id": 3,
                  "name": "sit-non-dignissimos",
                  "address": "939 Langosh Pass",
                  "priceLevel": 4,
                  "cuisineId": 36,
                  "city": "Antelope",
                  "stateId": 15,
                  "zipCode": 8221,
                  "imageUrl": "https://images.pexels.com/photos/1264937/pexels-photo-1264937.jpeg?auto=compress&cs=tinysrgb&h=350",
                  "createdAt": "2022-01-26T09:56:37.634Z",
                  "updatedAt": "2022-01-26T09:56:37.634Z"
              }
          }
      ],
      "userPreviousReservations": [
          {
              "id": 1,
              "dateTime": "2021-02-07T23:30:00.000Z",
              "partySize": 3,
              "cartId": 1,
              "userId": 1,
              "reviewed": false,
              "createdAt": "2022-01-26T09:56:37.676Z",
              "updatedAt": "2022-01-26T09:56:37.676Z",
              "Cart": {
                  "id": 1,
                  "name": "facere-aut-vel",
                  "address": "1305 Cassin Brook",
                  "priceLevel": 1,
                  "cuisineId": 34,
                  "city": "Celialand",
                  "stateId": 44,
                  "zipCode": 36399,
                  "imageUrl": "https://images.pexels.com/photos/1264937/pexels-photo-1264937.jpeg?auto=compress&cs=tinysrgb&h=350",
                  "createdAt": "2022-01-26T09:56:37.634Z",
                  "updatedAt": "2022-01-26T09:56:37.634Z"
              }
          },
          {
              "id": 3,
              "dateTime": "2022-01-18T10:15:00.000Z",
              "partySize": 4,
              "cartId": 2,
              "userId": 1,
              "reviewed": false,
              "createdAt": "2022-01-27T21:30:28.765Z",
              "updatedAt": "2022-01-27T21:30:28.765Z",
              "Cart": {
                  "id": 2,
                  "name": "quo-corporis-molestias",
                  "address": "073 Kunde Walks",
                  "priceLevel": 3,
                  "cuisineId": 58,
                  "city": "South Shanelle",
                  "stateId": 42,
                  "zipCode": 82772,
                  "imageUrl": "https://images.pexels.com/photos/2553651/pexels-photo-2553651.jpeg?auto=compress&cs=tinysrgb&h=350",
                  "createdAt": "2022-01-26T09:56:37.634Z",
                  "updatedAt": "2022-01-26T09:56:37.634Z"
              }
          }
      ]
  },
  "reviews": {
      "1": [
          {
              "id": 1,
              "review": "LOVE THIS PLACE. THE FOOD ABSOLUTELY SLAPS",
              "rating": 5,
              "userId": 1,
              "cartId": 1,
              "reservationId": 1,
              "createdAt": "2022-01-26T09:56:37.701Z",
              "updatedAt": "2022-01-26T09:56:37.701Z"
          }
      ],
      "2": []
  }
}