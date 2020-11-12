import { CreateProductDTO } from './create-product.dto';

describe('CreateProductDto', () => {
  it('should be defined', () => {
    expect(new CreateProductDTO()).toBeDefined();
    expect(new CreateProductDTO).toHaveProperty('name');
    expect(new CreateProductDTO).toHaveProperty('description');
    expect(new CreateProductDTO).toHaveProperty('price');
  });
});
