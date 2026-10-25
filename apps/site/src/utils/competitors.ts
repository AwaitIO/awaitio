import { airplane } from '../competitors/airplane';
import { appsmith } from '../competitors/appsmith';
import { budibase } from '../competitors/budibase';
import { interval } from '../competitors/interval';
import { reflex } from '../competitors/reflex';
import { retool } from '../competitors/retool';
import { superblocks } from '../competitors/superblocks';
import { tooljet } from '../competitors/tooljet';
import { windmill } from '../competitors/windmill';
import type { Competitor } from '../types/Competitor';

// The tools AwaitIO is compared with, one page each under /vs, in the order the footer lists them: the market
// leader first, then the code-first tools closest to AwaitIO, then the low-code ones.
export const competitors: Competitor[] = [retool, interval, airplane, windmill, reflex, superblocks, tooljet, appsmith, budibase];
