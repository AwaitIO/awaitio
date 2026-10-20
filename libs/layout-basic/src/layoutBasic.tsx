import { defineLayout } from 'awaitio';
import { z } from 'zod';

// Registered as layouts: { basic: layoutBasic } it becomes io.layout.basic({ title, description?, children }).
// Pages that return just display components land in it too, titled with the page's name and description.
export const layoutBasic = defineLayout({
  props: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
  component: ({ props, children }) => {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">{props.title}</h1>
          {props.description && <p className="text-sm text-gray-600">{props.description}</p>}
        </div>
        {children}
      </div>
    );
  },
});
