export const getByQueryId = (queryId: string, element?: HTMLDivElement) => {
  if (!element) {
    element = document.body as HTMLDivElement;
  }
  const result = element.querySelector(`[query-id="${queryId}"]`);
  return result as HTMLDivElement;
};
