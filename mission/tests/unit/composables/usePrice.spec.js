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

  it('makes isDiscount true when there is a discount-rate', () => {
    const { isDiscount } = usePrice(58000, 1);
    expect(isDiscount.value).toBeTruthy();
  });

  it('makes isDiscount false when there is no a discount-rate', () => {
    const { isDiscount } = usePrice(58000);
    expect(isDiscount.value).toBeFalsy();
  });

  it('makes isDiscount false when discount-rate is 0', () => {
    const { isDiscount } = usePrice(58000, 0);
    expect(isDiscount.value).toBeFalsy();
  });
});
