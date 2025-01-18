export const getByQueryId = (queryId: string) => {
  const result = document.querySelector(`[query-id="${queryId}"]`);
  return result as HTMLDivElement;
};
