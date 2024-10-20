import { UserAuthenticationData } from './_types/userTypes';

export const devUserData: UserAuthenticationData = {
  jwtData: {
    jwtToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIyIiwiRW1haWwiOiJtYW51ZWwucDgwQGdteC5kZSIsIlVzZXJOYW1lIjoibWFudWVsLnA4MEBnbXguZGUiLCJGaXJzdE5hbWUiOiJNYW51ZWwiLCJMYXN0TmFtZSI6IlBlaXNlIiwiZXhwIjoxNzM4MDAxODgyLCJpc3MiOiJteUFwcC5jb20iLCJhdWQiOiJteUFwcC5jb20ifQ.LkxRX4jV9PQ5DkHaan76dTttlY3Dk8ZQ9MVy93VhpEk',
    refreshToken: 'mu9Uye7yBo+GoBi2QwigT0vbYdNt6a8be7YlURmwrtc=',
  },
  userInfo: {
    contactData: {
      city: '',
      country: '',
      houseNumber: '',
      postalCode: '',
      street: '',
    },
    dateOfBirth: '1980-04-20T00:00:00',
    displayName: 'Manuel.Peise',
    email: 'manuel.p80@gmx.de',
    firstName: 'Manuel',
    isActive: true,
    lastName: 'Peise',
    userName: 'manuel.p80@gmx.de',
  },
};
