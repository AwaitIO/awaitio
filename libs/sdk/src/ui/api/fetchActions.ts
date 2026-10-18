import { requestJson } from './requestJson';
import { actionListSchema } from '../../shared/schemas/actionListSchema';

// The actions and the folder pages, both needed to draw the navigation.
export const fetchActions = async () => {
  return actionListSchema.parse(await requestJson({ path: '/api/actions' }));
};
