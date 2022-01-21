import usePrice from '@/composables/usePrice';

describe('usePrice', () => {
  it('calculates the discount price', () => {
    const { salesPrice } = usePrice(58000, 15);
    expect(salesPrice.value).toBe('49,300원');
  });

  it('shows originalPrice when there is no discount rate', () => {
    const { salesPrice } = usePrice(58000);
    expect(salesPrice.value).toBe('58,000원');
  });
});
