import isBlank from "./is-blank";

describe('isBlank', () => {
  
  it('returns true when string = undefined', () => {
    expect(isBlank(undefined)).toBe(true);
  })

  it('returns true when string = <empty string>', () => {
    expect(isBlank('')).toBe(true);
  })

  it('returns true when string = <single space>', () => {
    expect(isBlank(' ')).toBe(true);
  })

  it('returns true when string = <multiple spaces>', () => {
    expect(isBlank('   ')).toBe(true);
  })

  it('returns false when string = abc', () => {
    expect(isBlank('abc')).toBe(false);
  })
  
})
