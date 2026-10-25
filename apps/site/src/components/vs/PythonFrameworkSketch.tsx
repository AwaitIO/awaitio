import { codeColors } from '../../utils/codeColors';
import type { FC } from 'react';

// A framework where you write every page yourself: a Python page component with its state, layout and handlers.
export const PythonFrameworkSketch: FC = () => {
  return (
    <div className="flex min-h-[15rem] flex-1 flex-col p-3">
      <div className="flex-1 overflow-hidden rounded-lg bg-gray-900 px-3 py-3 font-mono text-[10px] leading-5 whitespace-nowrap sm:text-[11px]">
        <div>
          <span className={codeColors.keyword}>class</span> <span className={codeColors.fn}>RefundState</span>
          <span className={codeColors.plain}>(rx.State):</span>
        </div>
        <div className={codeColors.plain}>{'    email: str = ""'}</div>
        <div className={codeColors.plain}>{'    orders: list = []'}</div>
        <div className={codeColors.comment}>{'    # handlers, loading, errors…'}</div>
        <div className="mt-2">
          <span className={codeColors.keyword}>def</span> <span className={codeColors.fn}>refund_page</span>
          <span className={codeColors.plain}>():</span>
        </div>
        <div className={codeColors.plain}>{'    return rx.vstack('}</div>
        <div className={codeColors.plain}>{'        rx.input(on_change=…),'}</div>
        <div className={codeColors.plain}>{'        rx.data_table(data=…),'}</div>
        <div className={codeColors.plain}>{'        rx.button("Refund", on_click=…),'}</div>
        <div className={codeColors.plain}>{'    )'}</div>
      </div>
    </div>
  );
};
