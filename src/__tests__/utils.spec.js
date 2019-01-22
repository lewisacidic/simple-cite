import { h } from '../utils'

describe('h', () => {
  it('should return hypertext', () => {
    expect(h('h1', 'test')).toEqual('<h1>test</h1>\n')
  })
  it('should allow different tags', () => {
    expect(h('div', 'test')).toEqual('<div>test</div>\n')
  })
  it('should return hypertext with a class', () => {
    expect(h('h1.test-class', 'test value')).toEqual(
      '<h1 class="test-class">test value</h1>\n'
    )
  })
  it('should return hypertext with classes', () => {
    expect(h('h1.test-class-1.test-class-2', 'test value')).toEqual(
      '<h1 class="test-class-1 test-class-2">test value</h1>\n'
    )
  })
  it('should return a div in the absence of a tag', () => {
    expect(h('.test-class', 'test value')).toEqual(
      '<div class="test-class">test value</div>\n'
    )
  })
  it('should return hypertext with an id', () => {
    expect(h('h1#test-id', 'test value')).toEqual(
      '<h1 id="test-id">test value</h1>\n'
    )
  })
  it('should return hypertext with both', () => {
    expect(h('h1#test-id.test-class', 'test value')).toEqual(
      '<h1 id="test-id" class="test-class">test value</h1>\n'
    )
  })
  it('should indent a set amount', () => {
    expect(h('h1', 'value', 2)).toEqual('  <h1>value</h1>\n')
  })
})
