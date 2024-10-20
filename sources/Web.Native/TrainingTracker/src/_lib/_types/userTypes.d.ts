export type UserData = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  isActive: boolean;
  displayName: string;
  dateOfBirth: string;
  jwtData: JwtData;
  contactData: Contact;
};

export type UserInfo = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  isActive: boolean;
  displayName: string;
  dateOfBirth: string;
  contactData: Contact;
};

export type UserAuthenticationData = {
  userInfo: UserInfo | null;
  jwtData: JwtData | null;
};

export type JwtData = {
  jwtToken: string;
  refreshToken: string;
};

export type RegistrationResult = {
  success: boolean;
};

export type Contact = {
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  country: string;
};

export type ProfileImport = {
  firstName: string;
  lastName: string;
  email: string;
};

export type ContactImport = {
  street: string;
  houseNumber: string;
  postalCode: string;
  city: string;
  country: string;
};
