import Manager from '..'

import apa from './apa.csl'
import vancouver from './vancouver.csl'

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

  it('should do an in-text citation', () => {
    const cite = manager.citeInText({
      citationItems: [{ id: 'a' }]
    })
    expect(cite).toEqual('Bloggs (2016)')

    const cite2 = manager.citeInText({
      citationItems: [{ id: 'b' }]
    })
    expect(cite2).toEqual('Doe (2017)')
  })

  it('should do an in-text citation for numbered', () => {
    manager = new Manager({
      items: references,
      style: vancouver,
      locale: enGB
    })
    const cite = manager.citeInText({
      citationItems: [{ id: 'a' }]
    })
    expect(cite).toEqual('Reference 1')

    const cite2 = manager.citeInText({
      citationItems: [{ id: 'b' }]
    })
    expect(cite2).toEqual('Reference 2')
  })

  it('should include no-cite references in bibliography', () => {
    manager.nocite(['b'])
    expect(manager.bibliography()).toMatch(
      `<div class="csl-bib-body">
  <div class="csl-entry">Doe, J. (2017). Item B.</div>
</div>`
    )
  })

  it('should put no-cite references after cited referencces', () => {
    manager.nocite(['b'])
    const cite = manager.cite({
      citationItems: [{ id: 'a' }]
    })
    expect(cite).toEqual('(Bloggs, 2016)')
    expect(manager.bibliography()).toMatch(`<div class="csl-bib-body">
  <div class="csl-entry">Bloggs, J. (2016). Item A.</div>
  <div class="csl-entry">Doe, J. (2017). Item B.</div>
</div>`)
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
