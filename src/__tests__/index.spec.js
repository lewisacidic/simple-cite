import Manager from '..'

import apa from './apa.csl'
import enGB from './locales-en-GB.xml'
import references from './references'

describe('Manager', () => {
  let manager
  beforeEach(() => {
    manager = new Manager({
      items: references,
      style: apa,
      locale: enGB
    })
  })

  it('should export Manager', () => {
    expect(Manager).toBeDefined()
  })

  it('should cite something', () => {
    const cite = manager.cite({
      citationItems: [{ id: 'a' }]
    })

    expect(cite).toEqual('(Bloggs, 2016)')
    expect(manager.bibliography()).toMatch(
      '<div class="csl-entry">Bloggs, J. (2016). Item A.</div>'
    )
  })

  it('should cite twice', () => {
    const citeA = manager.cite({
      citationItems: [{ id: 'a' }]
    })
    const citeB = manager.cite({
      citationItems: [{ id: 'b' }]
    })
    expect(citeA).toEqual('(Bloggs, 2016)')
    expect(citeB).toEqual('(Doe, 2017)')

    expect(manager.bibliography()).toMatch(
      `<div class="csl-bib-body">
  <div class="csl-entry">Bloggs, J. (2016). Item A.</div>
  <div class="csl-entry">Doe, J. (2017). Item B.</div>
</div>`
    )
  })

  it('should change format on instantiation', () => {
    manager = new Manager({
      items: references,
      style: apa,
      locale: enGB,
      format: 'text'
    })
    manager.cite({
      citationItems: [{ id: 'a' }]
    })
    expect(manager.bibliography()).toMatch('Bloggs, J. (2016). Item A.')
  })

  it('should should change format post instantiation', () => {
    manager.format = 'text'
    manager.cite({
      citationItems: [{ id: 'a' }]
    })
    expect(manager.bibliography()).toMatch('Bloggs, J. (2016). Item A.')
  })
})
