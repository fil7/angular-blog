export interface User {
  email: string;
  password: string;
  returnSecureToken?: boolean;
}

export interface FbAuthResponse {
  idToken: string;
  displayName: string;
  email: string;
  expiresIn: string;
  kind: string;
  localId: string;
  registered: boolean;
}
