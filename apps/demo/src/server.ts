import { app } from './app';
import { secrets } from './secrets';

void app.listen({ port: secrets.PORT, host: secrets.HOST }).then(() => {
  console.info(`Backoffice started at http://localhost:${secrets.PORT}`);
});
