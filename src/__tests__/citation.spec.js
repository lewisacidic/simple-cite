import Processor from '../processor'

import apa from 'style-apa'
import vancouver from 'style-vancouver'

import enGB from 'locale-en-gb'
import esES from 'locale-es-es'

import references from './references'

describe('Citation', () => {
  describe('author-year', () => {
    let processor
    beforeEach(() => {
      processor = new Processor({
        items: references,
        style: apa,
        locale: enGB
      })
    })
    it('should make a normal citation', () => {
      const cite = processor.cite({ citationItems: [{ id: 'example-a' }] })
      expect(cite.value).toEqual('(Bloggs, 2016)')
    })
    it('should cite a source with multiple authors', () => {
      const cite = processor.cite({
        citationItems: [{ id: 'example-twoauthors' }]
      })
      expect(cite.value).toEqual('(Thomas & Jones, 2014)')
    })

    it('should collapse many authors in subsequent citations', () => {
      const cite = processor.cite({
        citationItems: [{ id: 'example-fourauthors' }]
      })
      expect(cite.value).toEqual('(Williams, Taylor, Davies, & Brown, 2015)')

      const cite2 = processor.cite({
        citationItems: [{ id: 'example-fourauthors' }]
      })
      expect(cite2.value).toEqual('(Williams et al., 2015)')
    })

    it('should collapse very many authors in first citation', () => {
      const cite = processor.cite({
        citationItems: [{ id: 'example-manyauthors' }]
      })
      expect(cite.value).toEqual('(Hunter et al., 2015)')
    })

    it('should cite multiple sources in a single citation', () => {
      const cite = processor.cite({
        citationItems: [{ id: 'example-a' }, { id: 'example-b' }]
      })
      expect(cite.value).toEqual('(Bloggs, 2016; Doe, 2017)')
    })

    it('should group multiple citations by the same author together', () => {
      const cite = processor.cite({
        citationItems: [{ id: 'example-johndoe' }, { id: 'example-johndoe2' }]
      })
      expect(cite.value).toEqual('(Doe, 2015a, 2015b)')
    })

    it('should cite more than once', () => {
      const citeA = processor.cite({ citationItems: [{ id: 'example-a' }] })
      const citeB = processor.cite({ citationItems: [{ id: 'example-b' }] })
      expect(citeA.value).toEqual('(Bloggs, 2016)')
      expect(citeB.value).toEqual('(Doe, 2017)')
    })

    it('should disambiguate citations for authors with same surname', () => {
      const citeA = processor.cite({
        citationItems: [{ id: 'example-johndoe' }]
      })

      expect(citeA.value).toEqual('(Doe, 2015)')

      const citeB = processor.cite({
        citationItems: [{ id: 'example-janedoe' }]
      })
      expect(citeA.value).toEqual('(John Doe, 2015)')
      expect(citeB.value).toEqual('(Jane Doe, 2011)')
    })

    it('should disambiguate citations for items from same authors in same year', () => {
      const citeA = processor.cite({
        citationItems: [{ id: 'example-johndoe' }]
      })
      expect(citeA.value).toEqual('(Doe, 2015)')
      const citeB = processor.cite({
        citationItems: [{ id: 'example-johndoe2' }]
      })
      expect(citeA.value).toEqual('(Doe, 2015a)')
      expect(citeB.value).toEqual('(Doe, 2015b)')
    })

    it('should add a prefix', () => {
      const cite = processor.cite({
        citationItems: [{ id: 'example-a', prefix: 'see' }]
      })
      expect(cite.value).toEqual('(see Bloggs, 2016)')
    })

    it('should add a locator', () => {
      const cite = processor.cite({
        citationItems: [{ id: 'example-a', locator: 'pp. 42--44' }]
      })
      expect(cite.value).toEqual('(Bloggs, 2016, pp. 42--44)')
    })

    it('should add a locator and label', () => {
      const cite = processor.cite({
        citationItems: [{ id: 'example-a', locator: '1-3', label: 'folio' }]
      })
      expect(cite.value).toEqual('(Bloggs, 2016, fols 1–3)')

      const cite2 = processor.cite({
        citationItems: [{ id: 'example-a', locator: '20-40', label: 'page' }]
      })
      expect(cite2.value).toEqual('(Bloggs, 2016, pp. 20–40)')

      const cite3 = processor.cite({
        citationItems: [{ id: 'example-a', locator: '5', label: 'book' }]
      })
      expect(cite3.value).toEqual('(Bloggs, 2016, bk. 5)')
    })

    it('should add a locator and label', () => {
      const procesador = new Processor({
        items: references,
        style: apa,
        locale: esES,
        format: 'text'
      })

      const cite = procesador.cite({
        citationItems: [{ id: 'example-a', locator: '1-3', label: 'folio' }]
      })
      expect(cite.value).toEqual('(Bloggs, 2016, f. 1-3)')

      const cite2 = procesador.cite({
        citationItems: [{ id: 'example-a', locator: '20-40', label: 'page' }]
      })
      expect(cite2.value).toEqual('(Bloggs, 2016, pp. 20-40)')

      const cite3 = procesador.cite({
        citationItems: [{ id: 'example-a', locator: '5', label: 'book' }]
      })
      expect(cite3.value).toEqual('(Bloggs, 2016, lib. 5)')
    })

    it('should add a suffix', () => {
      const cite = processor.cite({
        citationItems: [{ id: 'example-a', suffix: 'and others' }]
      })
      expect(cite.value).toEqual('(Bloggs, 2016 and others)')
    })

    it('should add both locator and suffix at once', () => {
      const cite = processor.cite({
        citationItems: [
          { id: 'example-a', locator: 'pp. 42--44', suffix: 'and *passim*' }
        ]
      })
      expect(cite.value).toEqual('(Bloggs, 2016, pp. 42--44 and *passim*)')
    })

    it('should suppress author', () => {
      const cite = processor.cite({
        citationItems: [{ id: 'example-a', 'suppress-author': true }]
      })
      expect(cite.value).toEqual('(2016)')
    })

    it('should output author only', () => {
      const cite = processor.cite({
        citationItems: [{ id: 'example-a', 'author-only': true }]
      })
      expect(cite.value).toEqual('Bloggs')
    })

    it('should output an in-narrative citation', () => {
      const cite = processor.cite({
        citationItems: [{ id: 'example-a' }],
        properties: { 'in-narrative': true }
      })
      expect(cite.value).toEqual('Bloggs (2016)')
    })

    it('should disambiguate in-narrative citations', () => {
      const cite1 = processor.cite({
        citationItems: [{ id: 'example-janedoe' }],
        properties: { 'in-narrative': true }
      })

      expect(cite1.value).toEqual('Doe (2011)')

      const cite2 = processor.cite({
        citationItems: [{ id: 'example-johndoe' }],
        properties: { 'in-narrative': true }
      })

      expect(cite1.value).toEqual('Jane Doe (2011)')
      expect(cite2.value).toEqual('John Doe (2015)')
    })
  })

  describe('numbered', () => {
    let processor
    beforeEach(() => {
      processor = new Processor({
        items: references,
        style: vancouver,
        locale: enGB
      })
    })
    it('should make a normal citation', () => {
      const cite = processor.cite({ citationItems: [{ id: 'example-a' }] })
      expect(cite.value).toEqual('(1)')
    })

    it('should cite multiple sources in one citation', () => {
      const cite = processor.cite({
        citationItems: [{ id: 'example-a' }, { id: 'example-b' }]
      })
      expect(cite.value).toEqual('(1,2)')
    })

    it('should collapse 3 or more consecutive sources in one citation', () => {
      const cite = processor.cite({
        citationItems: [
          { id: 'example-a' },
          { id: 'example-b' },
          { id: 'example-c' }
        ]
      })
      expect(cite.value).toEqual('(1–3)')
    })

    it('should cite more than once', () => {
      const citeA = processor.cite({ citationItems: [{ id: 'example-a' }] })
      const citeB = processor.cite({ citationItems: [{ id: 'example-b' }] })
      expect(citeA.value).toEqual('(1)')
      expect(citeB.value).toEqual('(2)')
    })

    it('should not add a locator', () => {
      const cite = processor.cite({
        citationItems: [{ id: 'example-a', locator: '1' }]
      })
      expect(cite.value).toEqual('(1)')
    })

    it('should add a prefix', () => {
      const cite = processor.cite({
        citationItems: [{ id: 'example-a', prefix: 'see' }]
      })
      expect(cite.value).toEqual('(see 1)')
    })

    it('should add a suffix', () => {
      const cite = processor.cite({
        citationItems: [{ id: 'example-a', suffix: 'and others' }]
      })
      expect(cite.value).toEqual('(1 and others)')
    })

    it('should output an in-narrative citation', () => {
      const cite = processor.cite({
        citationItems: [{ id: 'example-a' }],
        properties: { 'in-narrative': true }
      })
      expect(cite.value).toEqual('Reference 1')
    })

    it('should add a locale specific label to in-narrative citation', () => {
      const processorEs = new Processor({
        items: references,
        style: vancouver,
        locale: esES
      })

      const cite = processorEs.cite({
        citationItems: [{ id: 'example-a' }],
        properties: { 'in-narrative': true }
      })
      expect(cite.value).toEqual('Referencia 1')
    })

    it('should output several in-narrative citations', () => {
      const citeA = processor.cite({
        citationItems: [{ id: 'example-a' }],
        properties: { 'in-narrative': true }
      })
      const citeB = processor.cite({
        citationItems: [{ id: 'example-b' }],
        properties: { 'in-narrative': true }
      })
      expect(citeA.value).toEqual('Reference 1')
      expect(citeB.value).toEqual('Reference 2')
    })
  })
})
