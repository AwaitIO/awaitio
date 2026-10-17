import { requestJson } from './requestJson';
import { appInfoSchema } from '../../shared/schemas/appInfoSchema';

export const fetchAppInfo = async () => {
  return appInfoSchema.parse(await requestJson({ path: '/api/app' }));
};
