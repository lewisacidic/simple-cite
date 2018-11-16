import Countdown from '.'

describe('countdown', () => {
  it('should count down', () => {
    expect(new Countdown(3).count()).toBe('3...2...1...')
  })
  it('should count down from 5', () => {
    expect(new Countdown(5).count()).toBe('5...4...3...2...1...')
  })
})
