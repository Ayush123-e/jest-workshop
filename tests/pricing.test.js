const { calculateFinalAmount } = require('../src/pricing');

describe('calculateFinalAmount', () => {
    test('should return subtotal when no coupon is provided', () => {
        expect(calculateFinalAmount(100)).toBe(100);
        expect(calculateFinalAmount(999)).toBe(999);
    });

    test('should apply 5% discount for subtotal >= 1000 without coupon', () => {
        expect(calculateFinalAmount(1000)).toBe(950);
    });

    test('should apply 10% discount for SAVE10 coupon', () => {
        expect(calculateFinalAmount(100, 'SAVE10')).toBe(90);
    });

    test('should reduce max 100 for SAVE10 coupon', () => {

        expect(calculateFinalAmount(2000, 'SAVE10')).toBe(1800);
    });

    test('should apply flat 50 discount for FLAT50 coupon', () => {
        expect(calculateFinalAmount(100, 'FLAT50')).toBe(50);
    });

    test('should handle FLAT50 where total becomes 0', () => {
        expect(calculateFinalAmount(50, 'FLAT50')).toBe(0);
    });

    test('should return 0 providing FLAT50 if result is negative', () => {
        expect(calculateFinalAmount(40, 'FLAT50')).toBe(0);
    });





    test('should throw error for invalid subtotal', () => {
        expect(() => calculateFinalAmount(-10)).toThrow('Invalid subtotal');
        expect(() => calculateFinalAmount('100')).toThrow('Invalid subtotal');
        expect(() => calculateFinalAmount(null)).toThrow('Invalid subtotal');
    });

    test('should handle case-insensitive coupon codes', () => {
        expect(calculateFinalAmount(100, 'save10')).toBe(90);
        expect(calculateFinalAmount(100, 'Flat50')).toBe(50);
    });

    test('should throw error for invalid coupon', () => {
        expect(() => calculateFinalAmount(100, 'INVALID')).toThrow('Invalid Coupon');
    });
});