import { useState } from 'react';

const DiffEditor = () => {
  const [original, setOriginal] = useState('Hello world');
  const [modified, setModified] = useState('Hello new world');

  const computeDiff = (original: string, modified: string): string => {
    let diffResult = '';
    const originalWords = original.split(' ');
    const modifiedWords = modified.split(' ');

    let i = 0,
      j = 0;

    while (i < originalWords.length || j < modifiedWords.length) {
      if (i < originalWords.length && j < modifiedWords.length) {
        if (originalWords[i] === modifiedWords[j]) {
          diffResult += ` ${originalWords[i]} `;
        } else {
          diffResult += ` <span class="bg-red-200">${originalWords[i] ?? ''}</span> `;
          diffResult += ` <span class="bg-green-200">${modifiedWords[j] ?? ''}</span> `;
        }
        i++;
        j++;
      } else if (i < originalWords.length) {
        diffResult += ` <span class="bg-red-200">${originalWords[i]}</span> `;
        i++;
      } else if (j < modifiedWords.length) {
        diffResult += ` <span class="bg-green-200">${modifiedWords[j]}</span> `;
        j++;
      }
    }

    return diffResult;
  };

  return (
    <div className="p-4 bg-bkg text-slate-800">
      <div className="grid grid-cols-2 gap-4">
        <textarea
          className="border p-2 w-full h-40 text-black"
          value={original}
          onChange={(e) => setOriginal(e.target.value)}
          placeholder="Original text..."
        />
        <textarea
          className="border p-2 w-full h-40 text-black"
          value={modified}
          onChange={(e) => setModified(e.target.value)}
          placeholder="Modified text..."
        />
      </div>

      <div className="mt-4 p-2 border ">
        <h3 className="text-lg font-semibold">Differences:</h3>
        <p
          className="p-2"
          dangerouslySetInnerHTML={{ __html: computeDiff(original, modified) }}
        />
      </div>
    </div>
  );
};

export default DiffEditor;
