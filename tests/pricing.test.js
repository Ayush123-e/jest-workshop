const { calculateFinalAmount } = require('../src/pricing');

  test("no coupon case",()=>{
    expect(calculateFinalAmount(100)).toBe(100)
  })
  
  test("SAVE10 coupon",()=>{
    expect(calculateFinalAmount(1000,"SAVE10")).toBe(850)
  })
  test("FLAT50 boundary case",()=>{
    expect(calculateFinalAmount(100,"FLAT50")).toBe(50)
  })
  test("invalid subtotal throws error",()=>{
    expect(()=>calculateFinalAmount(-100,"FLAT50")).toThrow("Invalid subtotal");
    expect(()=>calculateFinalAmount(NaN,"FLAT50")).toThrow("Invalid subtotal");
    expect(()=>calculateFinalAmount(-100,"SAVE10")).toThrow("Invalid subtotal");
    expect(()=>calculateFinalAmount(NaN,"SAVE10")).toThrow("Invalid subtotal");
  
  })

  test("case-insensitive coupon",()=>{
      expect(calculateFinalAmount(1000,"flat50")).toBe(900);
      expect(calculateFinalAmount(1000,"save10")).toBe(850);
    })