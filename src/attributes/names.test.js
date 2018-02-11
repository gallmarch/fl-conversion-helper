import { attributeName } from './names';
import {
  DANGEROUS,
  PERSUASIVE,
  SHADOWY,
  WATCHFUL,
} from './index';


describe('attributes/names', () => {
  describe('#attributeName', () => {
    test('Correctly stringifies Dangerous', () => {
      expect(attributeName(DANGEROUS)).toBe('Dangerous');
    });

    test('Correctly stringifies Persuasive', () => {
      expect(attributeName(PERSUASIVE)).toBe('Persuasive');
    });

    test('Correctly stringifies Shadowy', () => {
      expect(attributeName(SHADOWY)).toBe('Shadowy');
    });

    test('Correctly stringifies Watchful', () => {
      expect(attributeName(WATCHFUL)).toBe('Watchful');
    });

    test('Returns undefined', () => {
      expect(attributeName()).toBe(undefined);
    });
  });
});

