export enum PlaceType {
  Apartment = 'Apartment',
  Flat = 'Flat',
  House = 'House'
}

export enum HostStatus {
  Pro = 'Pro',
  Beginner = 'Beginner'
}

export const mockOffers = [
  {
    id: 1,
    title: 'Beautiful & luxurious studio at great location',
    rating: 4.8,
    placeType: PlaceType.Apartment,
    numberOfRooms: 3,
    numberOfGuests: 4,
    price: 120,
    isPremium: true,
    features: ['Wi-Fi', 'Heating', 'Kitchen', 'Fridge', 'Washing machine', 'Coffee machine', 'Dishwasher', 'Towels', 'Baby seat', 'Cabel TV'],
    images: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg'],
    host: {
      name: 'Angelina',
      avatar: 'img/avatar-angelina.jpg',
      status: HostStatus.Pro,
      description: `
        A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.

        An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
      `
    }
  },
  {
    id: 2,
    title: 'Beautiful & luxurious studio at great location',
    rating: 4.8,
    placeType: PlaceType.Apartment,
    numberOfRooms: 3,
    numberOfGuests: 4,
    price: 120,
    features: ['Wi-Fi', 'Heating', 'Kitchen', 'Fridge', 'Washing machine', 'Coffee machine', 'Dishwasher', 'Towels', 'Baby seat', 'Cabel TV'],
    images: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg'],
    host: {
      name: 'Angelina',
      avatar: 'img/avatar-angelina.jpg',
      status: HostStatus.Pro,
      description: `
        A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.

        An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
      `
    }
  },
  {
    id: 3,
    title: 'Beautiful & luxurious studio at great location',
    rating: 4.8,
    placeType: PlaceType.Apartment,
    numberOfRooms: 3,
    numberOfGuests: 4,
    price: 120,
    isPremium: true,
    features: ['Wi-Fi', 'Heating', 'Kitchen', 'Fridge', 'Washing machine', 'Coffee machine', 'Dishwasher', 'Towels', 'Baby seat', 'Cabel TV'],
    images: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg'],
    host: {
      name: 'Angelina',
      avatar: 'img/avatar-angelina.jpg',
      status: HostStatus.Pro,
      description: `
        A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.

        An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
      `
    }
  },
  {
    id: 4,
    title: 'Beautiful & luxurious studio at great location',
    rating: 4.8,
    placeType: PlaceType.Apartment,
    numberOfRooms: 3,
    numberOfGuests: 4,
    price: 120,
    features: ['Wi-Fi', 'Heating', 'Kitchen', 'Fridge', 'Washing machine', 'Coffee machine', 'Dishwasher', 'Towels', 'Baby seat', 'Cabel TV'],
    images: ['img/room.jpg', 'img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg'],
    host: {
      name: 'Angelina',
      avatar: 'img/avatar-angelina.jpg',
      status: HostStatus.Pro,
      description: `
        A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.

        An independent House, strategically located between Rembrand Square and National Opera, but where the bustle of the city comes to rest in this alley flowery and colorful.
      `
    }
  },

];
