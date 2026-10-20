import { defineLayout } from 'awaitio';
import { actionHref, actionRouteSchema, Button, navigateTo } from 'awaitio/ui';
import { z } from 'zod';

// Registered as layouts: { basic: layoutBasic } it becomes io.layout.basic({ title, description?, menuItems?, children }).
// Pages that return just display components land in it too, titled with the page's name and description.
export const layoutBasic = defineLayout({
  props: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Buttons next to the title that open an action, e.g. createUser.route(); the first is the page's main one.
    menuItems: z.array(actionRouteSchema.extend({ label: z.string() })).optional(),
  }),
  component: ({ props, children }) => {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-semibold">{props.title}</h1>
            {props.description && <p className="text-sm text-gray-600">{props.description}</p>}
          </div>
          {props.menuItems && props.menuItems.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {props.menuItems.map((item, index) => {
                return (
                  <Button
                    key={index}
                    type="button"
                    variant={index === 0 ? 'primary' : 'secondary'}
                    onClick={() => {
                      navigateTo(actionHref(item));
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </div>
          )}
        </div>
        {children}
      </div>
    );
  },
});
