import { describe, it, expect, beforeAll, beforeEach, afterEach, afterAll } from 'vitest';
import { add, subtract, multiply, divide } from './math';

let a, b;

beforeAll(() => {
  console.log('Startar tester...');
});

beforeEach(() => {
  a = 10;
  b = 2;
});

afterEach(() => {
});

afterAll(() => {
  console.log('Alla tester klara.');
});

describe('Kalkylatorfunktioner', () => {
  it('adderar två tal', () => {
    expect(add(a, b)).toBe(12);
  });

  it('subtraherar två tal', () => {
    expect(subtract(a, b)).toBe(8);
  });

  it('multiplicerar två tal', () => {
    expect(multiply(a, b)).toBe(20);
  });

  it('dividerar två tal', () => {
    expect(divide(a, b)).toBe(5);
  });

  it('hanterar division med 0', () => {
    expect(divide(a, 0)).toBe('Kan inte dividera med 0');
  });
});
