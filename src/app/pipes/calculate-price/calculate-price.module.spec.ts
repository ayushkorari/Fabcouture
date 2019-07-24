import { CalculatePriceModule } from './calculate-price.module';

describe('CalculatePriceModule', () => {
  let calculatePriceModule: CalculatePriceModule;

  beforeEach(() => {
    calculatePriceModule = new CalculatePriceModule();
  });

  it('should create an instance', () => {
    expect(calculatePriceModule).toBeTruthy();
  });
});
