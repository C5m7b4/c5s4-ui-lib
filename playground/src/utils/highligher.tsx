const syntaxRules = [
  {
    regex: /\b(import|from)\b/g,
    className: 'text-[#2aaa55]',
  },
  {
    regex:
      /\b(const|let|var|function|return|if|else|for|while|ToastProvider|App|useToast)\b/g,
    className: 'text-[#ff79c6]',
  },
  {
    regex: /\b(true|false|True|False)\b/g,
    className: 'text-[#bd8e37]',
  },
  {
    regex: /\b(autoClose|duration|position|recentOnTop)\b/g,
    className: 'text-[#9183cf]',
  },
  //{ regex: /"([^"]*)"/g, className: 'text-[#ff79c6]' }, // Strings in double quotes
  { regex: /'([^']*)'/g, className: 'text-[#4179ad]' }, // Strings in single quotes
  { regex: /\b(\d+)\b/g, className: 'text-[#bd93f9]' }, // Numbers
  //   { regex: /\/\/.*/g, className: 'comment' }, // Single-line comments
  //   { regex: /\/\*[\s\S]*?\*\//g, className: 'comment' }, // Multi-line comments
];

export const highLightCode = (code: string): string => {
  const escapedCode = escapeHtml(code);
  let highlightedCode = escapedCode;

  syntaxRules.forEach(({ regex, className }) => {
    highlightedCode = highlightedCode.replace(
      regex,
      (match) => `<span class="${className}">${match}</span>`,
    );
  });

  return highlightedCode;
};

const escapeHtml = (code: string): string => {
  return code
    .replace(/&/g, '&amp;') // Escape &
    .replace(/</g, '&lt;') // Escape <
    .replace(/>/g, '&gt;'); // Escape >
};
