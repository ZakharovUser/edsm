import { paths } from 'routes/paths';

export const navigation = {
  inbox: {
    path: paths.dashboard.inbox,
    title: 'Входящие',
  },
  outbox: {
    path: paths.dashboard.outbox,
    title: 'Исходящие',
  },
  drafts: {
    path: paths.dashboard.drafts,
    title: 'Черновики',
  },
  replacement: {
    path: paths.dashboard.replacement,
    title: 'Замещение',
  },
};
