import { faker } from '@faker-js/faker';

export function generateUser() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postalCode: faker.location.zipCode('??# #??'), 
  };
}

export function generateAddress() {
  return {
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    country: 'United Kingdom',
  };
}