export function formatUserName(fullName: string): string;
export function formatUserName(surname: string, name: string, lastname: string): string;
export function formatUserName(fullOrSurname: string, name?: string, lastname?: string): string {
  if (name) {
    return `${fullOrSurname} ${name[0].toUpperCase()}.${
      lastname ? lastname[0].toUpperCase().concat('.') : ''
    }`;
  }

  const [_surname, _name, _lastname] = fullOrSurname.split(' ');

  return `${_surname} ${_name[0].toUpperCase()}.${
    _lastname ? _lastname[0].toUpperCase().concat('.') : ''
  }`;
}
