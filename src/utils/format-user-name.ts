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

    const _first_name = first_name.at(0)?.concat('.') || '';
    const _middle_name = middle_name.at(0)?.concat('.') || '';

    return `${last_name} ${_first_name.toUpperCase()} ${_middle_name.toUpperCase()}`.trim();
  }

  if (name) {
    const _name = name.at(0)?.concat('.') || '';
    const _lastname = lastname?.at(0)?.concat('.') || '';

    return `${fullOrSurnameOrUser} ${_name.toUpperCase()} ${_lastname.toUpperCase()}`.trim();
  }

  const [_surname = '', _name = '', _lastname = ''] = fullOrSurnameOrUser.split(' ');

  const __name = _name.at(0)?.concat('.') || '';
  const __lastname = _lastname.at(0)?.concat('.') || '';

  return `${_surname} ${__name.toUpperCase()} ${__lastname.toUpperCase()}`.trim();
}
