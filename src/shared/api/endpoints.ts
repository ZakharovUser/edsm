import urlcat from 'urlcat';

export const root = {
  api: '/api/edm',
};

const endpoints = {
  auth: {
    me: '/api/auth/me',
    login: '/api/auth/login',
    register: '/api/auth/register',
  },
  crossAuth: {
    token: `${root.api}/csrf/`,
    user: `${root.api}/whoami/`,
    login: `${root.api}/login/`,
    logout: `${root.api}/logout/`,
    session: `${root.api}/session/`,
  },
  attachment: {
    new: `${root.api}/attachments/`,
  },
  task: {
    item: (id: number | string) => urlcat(root.api, '/task/:id', { id }),
    extendDeadline: (id: number | string) => `${root.api}/task/${id}/request_extension/ `,
  },
  route: {
    list: '/document_route/',
  },
  remark: {
    create: '/task/:task/add_message/',
    reject: '/task/:task/reject_message/',
    delete: '/task/:task/delete_message/',
    approve: '/task/:task/approve_message/',
  },
};

export default endpoints;
