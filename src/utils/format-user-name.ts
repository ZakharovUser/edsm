import { UserModel } from 'entities/user/models';

export function formatUserName(user: UserModel): string;
export function formatUserName(fullName: string): string;
export function formatUserName(surname: string, name: string, lastname: string): string;
export function formatUserName(
  fullOrSurnameOrUser: string | UserModel,
  name?: string,
  lastname?: string
): string {
  if (typeof fullOrSurnameOrUser !== 'string') {
    const { first_name, middle_name, last_name } = fullOrSurnameOrUser;

    return `${last_name} ${first_name[0].toUpperCase()}.${
      middle_name ? middle_name[0].toUpperCase().concat('.') : ''
    }`;
  }

  if (name) {
    return `${fullOrSurnameOrUser} ${name[0].toUpperCase()}.${
      lastname ? lastname[0].toUpperCase().concat('.') : ''
    }`;
  }

  const [_surname, _name, _lastname] = fullOrSurnameOrUser.split(' ');

  return `${_surname} ${_name[0].toUpperCase()}.${
    _lastname ? _lastname[0].toUpperCase().concat('.') : ''
  }`;
}
