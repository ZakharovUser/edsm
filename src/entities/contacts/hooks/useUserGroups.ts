import { useQuery } from '@tanstack/react-query';

import { ContactGroupModel } from 'entities/contacts/models';

import getUserGroups from '../api/getUserGroups';

interface Error {
  detail: string;
}

export function useUserGroups() {
  return useQuery<ContactGroupModel[], Error>({
    queryKey: ['user-groups'],
    queryFn: getUserGroups,
  });
}
