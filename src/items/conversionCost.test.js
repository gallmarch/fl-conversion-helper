import * as items from './constants';
// import * as module from './conversionCost';
import conversionCost from './conversionCost';

describe('items/conversionCost', () => {
  describe('#default', () => {
    it('checks mass conversions by default', () => {
      // Tier 1 default
      expect(conversionCost(items.SOUL)).toBe(500);
      // Tier 1 exceptions
      expect(conversionCost(items.FOXFIRE_CANDLE)).toBe(1000);
      expect(conversionCost(items.PROSCRIBED_MATERIAL)).toBe(250);
      expect(conversionCost(items.STOLEN_CORRESPONDENCE)).toBe(200);
      // Tier 2 default
      expect(conversionCost(items.ABOMINABLE_SALT)).toBe(500);
      // Tier 2 exceptions
      expect(conversionCost(items.APPALLING_SECRET)).toBe(333);
      expect(conversionCost(items.INTRIGUING_SNIPPET)).toBe(250);
      // Tier 3
      expect(conversionCost(items.TALE_OF_TERROR)).toBe(50);
      // Tier 4 default
      expect(conversionCost(items.MUSCARIA_BRANDY)).toBe(25);
      // Tier 4 exceptions
      expect(conversionCost(items.COLLATED_RESEARCH)).toBe(Number.POSITIVE_INFINITY);
    });
    it('checks small converisions if called with an argument', () => {
      // Tier 1 normal
      expect(conversionCost(items.SOUL, true)).toBe(50);
      // Tier 1 exceptions
      expect(conversionCost(items.FOXFIRE_CANDLE, true)).toBe(100);
      // Tier 2 default
      expect(conversionCost(items.ABOMINABLE_SALT, true)).toBe(50);
      // Tier 2 exceptions
      expect(conversionCost(items.APPALLING_SECRET, true)).toBe(33);
      expect(conversionCost(items.INTRIGUING_SNIPPET, true)).toBe(25);
      // Tier 3
      expect(conversionCost(items.TALE_OF_TERROR, true)).toBe(50);
      // Tier 4 default
      expect(conversionCost(items.MUSCARIA_BRANDY)).toBe(25);
      // Tier 4 exceptions
      expect(conversionCost(items.COLLATED_RESEARCH, true)).toBe(Number.POSITIVE_INFINITY);
    });
  });
});
