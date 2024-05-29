import { FinancingSourceModel } from 'entites/financing-source/models';

import { httpClient } from 'utils/axios';

interface Response {
  rows: FinancingSourceModel[];
}

export default async function getFinancingSources() {
  return httpClient.get<Response>('/api/edm/finance_source/').then(({ data }) => data.rows);
}
