import domTestingLib from '@testing-library/dom';

const { queryHelpers } = domTestingLib;

export const queryByQueryId = queryHelpers.queryByAttribute.bind(
  null,
  'query-id',
);
export const queryAllByQueryId = queryHelpers.queryAllByAttribute.bind(
  null,
  'query-id',
);

// v2.0
export function getAllByQueryId(id: string) {
  const container = document.body;
  const els = queryAllByQueryId(container, id);
  if (!els.length) {
    throw queryHelpers.getElementError(
      `Unable to find an element by: [query-id="${id}"]`,
      container,
    );
  }
  return els;
}

export function getByQueryId(id: string) {
  const container = document.body;
  const result = getAllByQueryId(id);
  if (result.length > 1) {
    throw queryHelpers.getElementError(
      `Found multiple elements with the [query-id="${id}"]`,
      container,
    );
  }
  return result[0];
}

// re-export with overrides
module.exports = {
  ...domTestingLib,
  getByQueryId,
  getAllByQueryId,
  queryByQueryId,
  queryAllByQueryId,
};
