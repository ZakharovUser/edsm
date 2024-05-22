import { ContactGroupModel } from 'entites/contacts/models';

import { httpClient } from 'utils/axios';

interface Response {
  rows: ContactGroupModel[];
}

export default async function getUserGroups() {
  return httpClient.get<Response>('/api/edm/user_by_group').then((res) => res.data.rows);
}
