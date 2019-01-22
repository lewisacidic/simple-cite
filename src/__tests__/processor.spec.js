import Processor from '..'

import apa from 'style-apa'

import enGB from 'locale-en-gb'
import esES from 'locale-es-es'

import references from './references'

describe('Processor', () => {
  let processor
  beforeEach(() => {
    processor = new Processor({
      items: references,
      style: apa,
      locale: enGB
    })
  })

  it('should export Processor', () => {
    expect(Processor).toBeDefined()
  })

  it('should expose a CSL engine', () => {
    const CSL = require('citeproc')
    expect(processor.engine).toBeInstanceOf(CSL.Engine)
  })

  it('should provide the current format as a property', () => {
    expect(processor.format).toEqual('text')
  })

  it('should allow format to be changed', () => {
    processor.cite({ citationItems: [{ id: 'example-a' }] })
    expect(processor.bibliography().value).toMatch(`Bloggs, J. (2016). Item A.`)
    processor.format = 'html'
    expect(processor.format).toEqual('html')
    expect(processor.bibliography().value).toMatch(
      `<div class="csl-bib-body">
  <div class="csl-entry">Bloggs, J. (2016). Item A. <i>Journal of Examples</i>, <i>2</i>(4), 42–64.</div>
</div>`
    )
  })

  it('should provide localization terms', () => {
    expect(processor.term({ name: 'reference' })).toEqual('reference')
  })

  it('should pluralize terms', () => {
    expect(processor.term({ name: 'reference', plural: true })).toEqual(
      'references'
    )
  })

  it('should capitalize terms', () => {
    expect(processor.term({ name: 'reference', capitalize: true })).toEqual(
      'Reference'
    )
  })

  it('should allow multiple calls to noCite to add more references', () => {
    processor.noCite(['example-a'])
    processor.noCite(['example-b'])
    expect(processor.bibliography().value).toEqual(
      'Bloggs, J. (2016). Item A. Journal of Examples, 2(4), 42–64.\nDoe, J. (2017). Item B. Journal of Examples, 4(2), 22–33.\n'
    )
  })
})

describe('locales', () => {
  it('should retrieve British English terms', () => {
    const processor = new Processor({
      items: references,
      style: apa,
      locale: enGB
    })
    expect(processor.term({ name: 'page' })).toEqual('page')
    expect(processor.term({ name: 'page', plural: true })).toEqual('pages')
    expect(processor.term({ name: 'page', capitalize: true })).toEqual('Page')
  })

  it('should retrieve Spanish terms', () => {
    const processor = new Processor({
      items: references,
      style: apa,
      locale: esES
    })
    expect(processor.term({ name: 'page' })).toEqual('página')
    expect(processor.term({ name: 'page', plural: true })).toEqual('páginas')
    expect(processor.term({ name: 'page', capitalize: true })).toEqual('Página')
  })
})
