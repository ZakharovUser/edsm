import { httpClient } from 'utils/axios';

import { FinancingSourceModel } from 'entites/financing-source/models';

interface Response {
  rows: FinancingSourceModel[];
}

export default async function getFinancingSources() {
  return httpClient.get<Response>('/api/edm/finance_source/').then(({ data }) => data.rows);
}
