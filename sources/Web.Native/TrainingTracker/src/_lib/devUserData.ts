import { UserAuthenticationData } from './_types/userTypes';

export const devUserData: UserAuthenticationData = {
  jwtData: {
    jwtToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIyIiwiRW1haWwiOiJtYW51ZWwucDgwQGdteC5kZSIsIlVzZXJOYW1lIjoibWFudWVsLnA4MEBnbXguZGUiLCJGaXJzdE5hbWUiOiJNYW51ZWwiLCJMYXN0TmFtZSI6IlBlaXNlIiwiSXNBY3RpdmUiOiJUcnVlIiwiQ3JlbmRlbnRpYWxzSWQiOiIyIiwiQ29udGFjdElkIjoiIiwiZXhwIjoxNzM4MDYwMTA1LCJpc3MiOiJteUFwcC5jb20iLCJhdWQiOiJteUFwcC5jb20ifQ.mMxWha-p2P1-jsVS_Bff-oX1A2r0MGU0CQebWsU8hT0',
    refreshToken: 'ZUOklUtGppzGllHCEpeWOwYcrDq1D+DWdjmWqRRcI94=',
  },
  userInfo: {
    contactData: {
      city: 'Berlin',
      country: 'Germany',
      houseNumber: '165',
      postalCode: '12627',
      street: 'Zossener Strasse',
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
