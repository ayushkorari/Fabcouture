import { CalculatePricePipe } from './calculate-price.pipe';

describe('CalculatePricePipe', () => {
  it('create an instance', () => {
    const pipe = new CalculatePricePipe();
    expect(pipe).toBeTruthy();
  });
});
