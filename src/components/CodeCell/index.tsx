import { ChevronDown } from '../../icons';
import { useRef } from 'react';

export type CollapseType = 'collapsed' | 'expanded';

export interface CodeCellProps {
  codeGenerator: () => string;
  title: string;
  expandedState?: CollapseType;
}

const CodeCell = ({
  codeGenerator,
  title,
  expandedState = 'expanded',
}: CodeCellProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLPreElement>(null);

  const handleCollapseClick = () => {
    if (!ref.current || !containerRef.current) return;

    const currentState = containerRef.current.getAttribute('data-display');
    containerRef.current.setAttribute(
      'data-display',
      currentState === 'collapsed' ? 'expanded' : 'collapsed',
    );
  };

  const generateCode = (): string => {
    return codeGenerator();
  };

  return (
    <div
      ref={containerRef}
      data-display={expandedState}
      className="group border rounded-lg w-full flex flex-col shadow-md"
    >
      <div className="flex gap-6">
        <div
          query-id="trigger"
          className="flex justify-center items-center pt-2"
          onClick={handleCollapseClick}
        >
          <ChevronDown
            height={20}
            width={20}
            fill="fill-bkg"
            stroke="fill-bkg"
            className={`flex cursor-pointer pl-2  m-auto tranition-all duration-200
                group-data-[display=collapsed]:-rotate-90
                group-data-[display=expanded]:rotate-0`}
          />
        </div>

        <div className="uppercase">{title}</div>
      </div>
      <pre
        ref={ref}
        className="code-block bg-bkg2 w-full flex-1 rounded-b-lg  font-mono text-left pl-2
            transition-all duration-500 overflow-x-hidden overfloy-y-scroll no-scrollbar
            group-data-[display=collapsed]:animate-collapse
            group-data-[display=expanded]:animate-expand"
      >
        <code
          dangerouslySetInnerHTML={{
            __html: generateCode(),
          }}
        />
      </pre>
    </div>
  );
};

export default CodeCell;
