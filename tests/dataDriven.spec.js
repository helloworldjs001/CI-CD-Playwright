const { test, expect } = require('@playwright/test');

const testCases = [
  { input: 'test1', expected: 'result1' },
  { input: 'test2', expected: 'result2' },
  { input: 'test3', expected: 'No result' }
];

test.describe('Parameterized Search Tests', () => {
    testCases.forEach(({ input, expected }) => {
      test(`should display correct result for input "${input}"`, async ({ page }) => {

        await page.goto('http://127.0.0.1:8080/dataDriven.html'); 
        
        await page.fill('input[name="search"]', input);

        await page.click('button[type="submit"]');
        
        const resultText = await page.textContent('#result');

        expect(resultText).toBe(expected);
      });
    });
  });