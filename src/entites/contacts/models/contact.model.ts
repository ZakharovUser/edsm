export interface ContactModel {
  email: string;
  rank: string;
  username: string;
  last_name: string;
  first_name: string;
  middle_name: string;
}

export interface ContactGroupModel {
  id: number;
  name: string;
  users: ContactModel[];
}
