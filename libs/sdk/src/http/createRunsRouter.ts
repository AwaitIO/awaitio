import { Router, type IRouter } from 'express';
import { match } from 'ts-pattern';
import type { RunManager } from '../classes/RunManager';
import { constants } from '../constants';
import { stepResponseSchema } from '../shared/schemas/stepResponseSchema';
import { getSessionUser } from '../utils/getSessionUser';
import { writeSseEvent } from '../utils/writeSseEvent';

export type CreateRunsRouterArgs = {
  manager: RunManager;
};

export const createRunsRouter = ({ manager }: CreateRunsRouterArgs): IRouter => {
  const router = Router();

  router.get('/runs/:id/events', (req, res) => {
    const run = manager.get({ id: req.params.id, user: getSessionUser({ res }) });

    if (!run) {
      return res.status(404).json({ error: 'RUN_NOT_FOUND' });
    }

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-store',
      Connection: 'keep-alive',
      // Stops nginx-style proxies from buffering the stream.
      'X-Accel-Buffering': 'no',
    });

    const unsubscribe = manager.subscribe({
      run,
      listener: (state) => {
        writeSseEvent({ res, event: 'state', data: state });
      },
    });
    // Proxies drop idle connections; a comment line every few seconds keeps the stream open.
    const ping = setInterval(() => {
      res.write(': ping\n\n');
    }, constants.SSE_PING_INTERVAL.as('milliseconds'));

    req.on('close', () => {
      clearInterval(ping);
      unsubscribe();
    });

    return undefined;
  });

  router.post('/runs/:id/respond', async (req, res) => {
    const run = manager.get({ id: req.params.id, user: getSessionUser({ res }) });

    if (!run) {
      return res.status(404).json({ error: 'RUN_NOT_FOUND' });
    }

    const body = stepResponseSchema.safeParse(req.body);

    if (!body.success) {
      return res.status(400).json({ error: 'BAD_REQUEST', message: body.error.message });
    }

    return match(await run.respond(body.data))
      .with({ status: 'OK' }, () => {
        return res.status(202).json({ status: 'OK' });
      })
      .with({ status: 'VALIDATION_ERROR' }, ({ message }) => {
        return res.status(400).json({ error: 'VALIDATION_ERROR', message });
      })
      .with({ status: 'STALE_STEP' }, () => {
        return res.status(409).json({ error: 'STALE_STEP' });
      })
      .with({ status: 'RUN_CLOSED' }, () => {
        return res.status(409).json({ error: 'RUN_CLOSED' });
      })
      .exhaustive();
  });

  router.post('/runs/:id/cancel', (req, res) => {
    const run = manager.get({ id: req.params.id, user: getSessionUser({ res }) });

    if (!run) {
      return res.status(404).json({ error: 'RUN_NOT_FOUND' });
    }

    run.cancel();

    return res.status(204).end();
  });

  return router;
};
