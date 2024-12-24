export const root = {
  api: '/api/edm',
  task: '/api/edm/task',
} as const;

const endpoints = {
  auth: {
    me: `${root.api}/whoami/`,
    token: `${root.api}/csrf/`,
    login: `${root.api}/login/`,
    logout: `${root.api}/logout/`,
    session: `${root.api}/session/`,
  },
  attachment: {
    root: `${root.api}/attachments/`,
    action: `${root.api}/attachments/:uuid`,
  },
  task: {
    item: `${root.task}/:task/`,
    deadline: {
      extend: `${root.task}/:task/request_extension/`,
      reject: `${root.task}/:task/reject_extension/`,
      approve: `${root.task}/:task/approve_extension/`,
      delete: `${root.task}/:task/delete_extension/:deadline`,
    },
    remark: {
      create: `${root.task}/:task/add_message/`,
      reject: `${root.task}/:task/reject_message/`,
      delete: `${root.task}/:task/delete_message/`,
      approve: `${root.task}/:task/approve_message/`,
    },
  },
  route: {
    list: `${root.api}/document_route/`,
  },
} as const;

export default endpoints;
