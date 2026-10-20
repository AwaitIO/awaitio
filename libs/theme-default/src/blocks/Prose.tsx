import type { ProseProps } from 'awaitio/ui';
import type { FC } from 'react';

// Styles the plain elements markdown turns into, so text from io.display.markdown reads like the rest of the app.
export const Prose: FC<ProseProps> = ({ children }) => {
  return (
    <div className="flex flex-col gap-3 text-sm [&>div]:flex [&>div]:flex-col [&>div]:gap-3 leading-6 text-gray-700 [&_a]:text-blue-600 [&_a:hover]:underline [&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:py-0.5 [&_code]:text-[13px] [&_h1]:text-lg [&_h1]:font-semibold [&_h1]:text-gray-900 [&_h2]:text-base [&_h2]:font-semibold [&_h2]:text-gray-900 [&_h3]:font-semibold [&_h3]:text-gray-900 [&_li]:my-0.5 [&_ol]:list-decimal [&_ol]:pl-5 [&_pre]:overflow-x-auto [&_pre]:rounded-md [&_pre]:bg-gray-100 [&_pre]:p-3 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_strong]:font-semibold [&_strong]:text-gray-900 [&_ul]:list-disc [&_ul]:pl-5">
      {children}
    </div>
  );
};
