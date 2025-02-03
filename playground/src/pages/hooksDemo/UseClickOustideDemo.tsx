import { CodeCell } from '../../../../src';
import { highLightCode, RegexRules } from '../../utils/highligher';
import MyComponent from './MyComponent';

const UseClickOutsideDemo = () => {
  const toastSyntaxRules: RegexRules[] = [
    {
      regex: /\b(import|from)\b/g,
      className: 'text-[#2aaa55]',
    },
    {
      regex:
        /\b(const|let|var|function|return|if|else|for|while|App|type|export|extends|close)\b/g,
      className: 'text-[#ff79c6]',
    },
    {
      regex:
        /\b(useEffect|useRef|useState|MutableRefObject|useClickOutside|setTimeout)\b/g,
      className: 'text-[#5b65ec]',
    },
    {
      regex: /\b(true|false|True|False)\b/g,
      className: 'text-[#bd8e37]',
    },
    {
      regex:
        /\b(autoClose|duration|position|recentOnTop|ref|HTMLElement|HTMLDivElement|current)\b/g,
      className: 'text-[#42e9db]',
    },
    {
      regex: /\b(document)\b/g,
      className: 'text-[#4179ad]',
    },
    { regex: /'([^']*)'/g, className: 'text-[#4179ad]' }, // Strings in single quotes
    { regex: /\b(\d+)\b/g, className: 'text-[#bd93f9]' }, // Numbers
    { regex: /\/\/.*/g, className: 'text-[#7c2fe9]' }, // Single-line comments
    //   { regex: /\/\*[\s\S]*?\*\//g, className: 'comment' }, // Multi-line comments
  ];

  const generateClickOutsideCode = () => {
    const code = `
          import { useEffect, useRef, MutableRefObject } from 'react';
      
          // Define the type for the handler function
          type Handler = (event: MouseEvent | TouchEvent) => void;
      
          export const useClickOutside = <T extends HTMLElement>(
          handler: Handler,
          ): MutableRefObject<T | null> => {
          const ref = useRef<T | null>(null);
      
          useEffect(() => {
              const listener = (event: MouseEvent | TouchEvent) => {
              // Check if the click is outside the referenced element
              if (!ref.current || ref.current.contains(event.target as Node)) {
                  return;
              }
              handler(event);
              };
      
              // create the event listeners
              document.addEventListener('mousedown', listener);
              document.addEventListener('touchstart', listener);
      
              return () => {
              // cleanup the event listeners
              document.removeEventListener('mousedown', listener);
              document.removeEventListener('touchstart', listener);
              };
          }, [handler]);
      
          return ref;
          };
      
          `;

    const highlighted = highLightCode(code, toastSyntaxRules);
    return highlighted;
  };

  const generateClickOusideUsage = () => {
    const code = `
    import {useClickOutside} from 'c5s4-ui-lib';

    const MyComponent = () => {
        const ref = useClickOutside<HTMLDivElement>(() => {
            if (!ref.current) return;
            ref.current.setAttribute('data-display', 'closed');

            setTimeout(() => {
            close();
            }, 500);
        });

        const open = () => {
            if (!ref.current) return;
            ref.current.setAttribute('data-display', 'open');
        };

        return (
            <div className="bg-orange-500">
            <button onClick={open}>Open</button>
            <div
                ref={ref}
                data-display="closed"
                className="relative group bg-red-500 transition-all duration-500 h-[100px] overflow-hidden
                    data-[display=closed]:animate-collapse
                    data-[display=open]:animate-expand"
            >
                <div
                ref={ref}
                className="absolute bg-bkg text-content shadow-md w-full h-full border rounded-b-lg"
                >
                    <div className="p-4">Content</div>
                    <p>Click outside to close</p>
                </div>
            </div>
            </div>
        );
    };

    export default MyComponent;
          `;

    const highlighted = highLightCode(code, toastSyntaxRules);
    return highlighted;
  };

  return (
    <div>
      <div className="text-2xl font-medium underline">useClickOutside</div>
      <div className="border rounded-lg shadow-md my-4 p-4">
        <div>This is the demo Component used in this example:</div>
        <div>
          <MyComponent />
        </div>
      </div>

      <div>
        <CodeCell codeGenerator={generateClickOusideUsage} title={'[usage]'} />
      </div>
      <div className="mt-4">
        <CodeCell
          codeGenerator={generateClickOutsideCode}
          title={'[code] - clickOutside'}
          expandedState="collapsed"
        />
      </div>
    </div>
  );
};

export default UseClickOutsideDemo;
