import { httpClient } from 'utils/axios';

import { ContactGroupModel } from 'entities/contacts/models';

interface Response {
  rows: ContactGroupModel[];
}

export default async function getUserGroups() {
  return httpClient.get<Response>('/api/edm/user_by_group').then((res) => res.data.rows);
}
