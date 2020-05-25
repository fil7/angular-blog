export interface User {
  email: string;
  password: string;
}

export interface FbAuthResponse {
  idToken: string;
  displayName: string;
  email: string;
  kind: string;
  localId: string;
  registered: boolean;
}
