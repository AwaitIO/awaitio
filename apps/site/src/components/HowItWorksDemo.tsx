'use client';

import { useEffect, useState } from 'react';
import { HowItWorksDemoApp } from './HowItWorksDemoApp';
import { TrafficLights } from './TrafficLights';
import { BrowserFrame } from './variants/BrowserFrame';
import { PauseIcon } from '../icons/PauseIcon';
import { PlayIcon } from '../icons/PlayIcon';
import { ReplayIcon } from '../icons/ReplayIcon';
import { howItWorksCode } from '../utils/howItWorksCode';
import { howItWorksSteps } from '../utils/howItWorksSteps';
import type { FC } from 'react';

// The refund action running: the code on the left with the lines that run lit up, the backoffice on the right showing
// what those lines ask the person. It loops on its own, hovering changes nothing; a click on a block of code jumps to the
// step that runs it and the loop goes on from there, the status above pauses it and Replay starts it over. With reduced
// motion it starts paused on the table.
export const HowItWorksDemo: FC = () => {
  const [stepIndex, setStepIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  // Only colours the block under the pointer; the animation never reacts to hovering.
  const [hoveredBlock, setHoveredBlock] = useState<number | null>(null);
  const step = howItWorksSteps[stepIndex] ?? howItWorksSteps[0];

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsPaused(true);
      setStepIndex(howItWorksSteps.findIndex((candidate) => candidate.view === 'pickTwo'));
    }
  }, []);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const timer = setTimeout(() => {
      setStepIndex((index) => {
        return (index + 1) % howItWorksSteps.length;
      });
    }, step?.duration);

    return () => {
      clearTimeout(timer);
    };
  }, [step, isPaused]);

  if (!step) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-3">
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center font-mono text-sm text-gray-600">
          <button type="button" onClick={() => setIsPaused((paused) => !paused)} className="col-start-2 inline-flex cursor-pointer items-center gap-2 hover:text-gray-900">
            {isPaused ? <PauseIcon /> : <PlayIcon />}
            {isPaused ? 'Paused' : 'Playing'}
          </button>
          <button
            type="button"
            onClick={() => {
              setStepIndex(0);
              setIsPaused(false);
            }}
            className="inline-flex cursor-pointer items-center gap-2 justify-self-end hover:text-gray-900"
          >
            <ReplayIcon />
            Replay
          </button>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:items-stretch">
        <div className="offset-card min-w-0 overflow-hidden bg-gray-900">
          <div className="flex items-center gap-4 px-4 py-3">
            <TrafficLights />
            <span className="truncate font-mono text-xs text-gray-400">src/actions/orders/refundOrdersAction.ts</span>
          </div>
          <div className="code-scroll overflow-x-auto px-2 pb-4 font-mono text-[12px] leading-6 sm:text-[12.5px]">
            {howItWorksCode.map((tokens, index) => {
              const number = index + 1;
              const isRunning = number >= step.lines[0] && number <= step.lines[1];
              const block = howItWorksSteps.find((candidate) => number >= candidate.lines[0] && number <= candidate.lines[1]);
              const blockIndex = block ? howItWorksSteps.indexOf(block) : null;
              const isHovered = !isRunning && blockIndex !== null && blockIndex === hoveredBlock;

              return (
                <div
                  key={number}
                  onClick={() => blockIndex !== null && setStepIndex(blockIndex)}
                  onMouseEnter={() => setHoveredBlock(blockIndex)}
                  onMouseLeave={() => setHoveredBlock(null)}
                  className={['flex gap-4 rounded px-2 whitespace-pre transition-colors duration-300', block && 'cursor-pointer', isRunning && 'bg-white/10', isHovered && 'bg-orange-500/15']
                    .filter(Boolean)
                    .join(' ')}
                >
                  <span className={['w-5 shrink-0 text-right select-none', isRunning && 'text-orange-300', !isRunning && 'text-gray-600'].filter(Boolean).join(' ')}>
                    {String(number).padStart(2, '0')}
                  </span>
                  <span className="text-gray-200">
                    {tokens.map((token, tokenIndex) => {
                      return (
                        <span key={tokenIndex} className={token.className}>
                          {token.text}
                        </span>
                      );
                    })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <BrowserFrame flush url={step.view === 'list' ? 'demo.awaitio.com/groups/orders' : 'demo.awaitio.com/actions/orders/refund_orders'}>
          <HowItWorksDemoApp view={step.view} />
        </BrowserFrame>
      </div>
    </div>
  );
};
