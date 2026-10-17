import { requestJson } from './requestJson';

export const logOut = async () => {
  await requestJson({ path: '/api/logout', method: 'POST' });
};
