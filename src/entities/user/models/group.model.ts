export interface UserModel {
  id: number;
  rank: string;
  email: string;
  username: string;
  last_name: string;
  first_name: string;
  middle_name: string;
}

export interface GroupModel {
  id: number;
  name: string;
}

export interface UserWithGroupModel extends UserModel {
  groups: Array<GroupModel>;
}
