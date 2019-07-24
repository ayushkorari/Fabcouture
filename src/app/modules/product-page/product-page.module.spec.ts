import { ProductPageModule } from './product-page.module';

describe('ProductPageModule', () => {
  let productPageModule: ProductPageModule;

  beforeEach(() => {
    productPageModule = new ProductPageModule();
  });

  it('should create an instance', () => {
    expect(productPageModule).toBeTruthy();
  });
});
