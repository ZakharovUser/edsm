export function formatAuthorName(author: string): string {
  const [lastName, name, surName] = author.split(' ');

  return `${lastName} ${name[0].toUpperCase()}. ${surName[0].toUpperCase()}.`;
}
