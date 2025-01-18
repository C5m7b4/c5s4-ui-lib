import { describe, it, expect } from 'vitest';
import { numberFormatter } from './index';

describe('Formatters', () => {
  describe('numberFormatter', () => {
    it('should handle undefined', () => {
      // @ts-expect-error cant use undefined
      expect(numberFormatter(undefined)).toEqual(undefined);
      // @ts-expect-error cannot be null
      expect(numberFormatter(null)).toEqual(null);
    });
    it('should format a number', () => {
      expect(numberFormatter('1234.56')).toEqual('$1234.56');
    });
    it('should handle no decimal places', () => {
      expect(numberFormatter('1234')).toEqual('1234');
    });
    it('should handle one decimal place', () => {
      expect(numberFormatter('1234.5')).toEqual('$1234.50');
    });
  });
});
