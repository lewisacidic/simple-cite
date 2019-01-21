import Processor from '..'

import apa from 'style-apa'
import vancouver from 'style-vancouver'

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
    processor.cite({ citationItems: [{ id: 'a' }] })
    expect(processor.bibliography()).toMatch(`Bloggs, J. (2016). Item A.`)
    processor.format = 'html'
    expect(processor.format).toEqual('html')
    expect(processor.bibliography()).toMatch(
      `<div class="csl-bib-body">
  <div class="csl-entry">Bloggs, J. (2016). Item A.</div>
</div>`
    )
  })

  it('should add title to bibliography in text format ', () => {
    processor.noCite(['a'])
    expect(processor.bibliography({ title: true })).toEqual(
      'References\nBloggs, J. (2016). Item A.\n'
    )
  })

  it('should add title to bibliography in text format ', () => {
    processor.format = 'html'
    processor.noCite(['a'])
    expect(processor.bibliography({ title: true })).toEqual(
      `<div class="csl-bib-body">
  <h2>References</h2>
  <div class="csl-entry">Bloggs, J. (2016). Item A.</div>
</div>`
    )
  })

  it('should allow the title to be specified', () => {
    processor.noCite(['a'])
    expect(processor.bibliography({ title: 'Example Title' })).toEqual(
      'Example Title\nBloggs, J. (2016). Item A.\n'
    )
  })
})

describe('locales', () => {
  it('should properly format British English', () => {
    const processor = new Processor({
      items: references,
      style: apa,
      locale: enGB
    })
    processor.cite({ citationItems: [{ id: 'c' }] })
    expect(processor.bibliography()).toEqual(
      'Doe, J. (2018). Item C. In Book C.\n'
    )
  })
  it('should properly format Spanish', () => {
    const processor = new Processor({
      items: references,
      style: apa,
      locale: esES
    })
    processor.cite({ citationItems: [{ id: 'c' }] })
    expect(processor.bibliography()).toEqual(
      'Doe, J. (2018). Item C. En Book C.\n'
    )
  })
})

const styleSuite = ({
  suiteName,
  style,
  singleCite,
  multiCite,
  disambig,
  bibliography,
  prefix,
  locator,
  suffix,
  both,
  suppressAuthor,
  inText,
  inTextBib,
  normAndInText,
  noCite,
  noCiteAndNormal
}) => {
  return describe(suiteName, () => {
    let processor
    beforeEach(() => {
      processor = new Processor({
        items: references,
        style: style,
        locale: enGB
      })
    })

    it('should cite once', () => {
      const cite = processor.cite({ citationItems: [{ id: 'a' }] })
      expect(cite.value).toEqual(singleCite)
    })

    it('should cite more than once', () => {
      const citeA = processor.cite({ citationItems: [{ id: 'a' }] })
      expect(citeA.value).toEqual(multiCite[0])

      const citeB = processor.cite({ citationItems: [{ id: 'b' }] })
      expect(citeB.value).toEqual(multiCite[1])
    })

    it('should disambiguate citations', () => {
      const citeA = processor.cite({ citationItems: [{ id: 'b' }] })
      const citeB = processor.cite({ citationItems: [{ id: 'c' }] })
      expect(citeA.value).toEqual(disambig[0])
      expect(citeB.value).toEqual(disambig[1])
    })
    it('should create a bibliography from cited items', () => {
      processor.cite({ citationItems: [{ id: 'a' }] })
      expect(processor.bibliography()).toEqual(bibliography[0])

      processor.cite({ citationItems: [{ id: 'b' }] })
      expect(processor.bibliography()).toEqual(bibliography[1])
    })

    it('should add a prefix', () => {
      const cite = processor.cite({
        citationItems: [{ id: 'a', prefix: 'see' }]
      })
      expect(cite.value).toEqual(prefix)
    })

    it('should add a locator', () => {
      const cite = processor.cite({
        citationItems: [{ id: 'a', locator: 'pp. 42--44' }]
      })
      expect(cite.value).toEqual(locator)
    })

    it('should add a suffix', () => {
      const cite = processor.cite({
        citationItems: [{ id: 'a', suffix: 'and *passim*' }]
      })
      expect(cite.value).toEqual(suffix)
    })

    it('should add both locator and suffix at once', () => {
      const cite = processor.cite({
        citationItems: [
          { id: 'a', locator: 'pp. 42--44', suffix: 'and *passim*' }
        ]
      })
      expect(cite.value).toEqual(both)
    })

    it('should suppress author', () => {
      const cite = processor.cite({
        citationItems: [{ id: 'a', 'suppress-author': true }]
      })
      expect(cite.value).toEqual(suppressAuthor)
    })

    it('should do an in-text citation', () => {
      const citeA = processor.citeInText({ id: 'a' })
      expect(citeA.value).toEqual(inText[0])

      const citeB = processor.citeInText({ id: 'b' })
      expect(citeB.value).toEqual(inText[1])
    })

    it('should add in-text citations to bibliography', () => {
      processor.citeInText({ id: 'a' })
      expect(processor.bibliography()).toEqual(inTextBib)
    })

    it('should work with normal and in-text citations', () => {
      processor.cite({ citationItems: [{ id: 'a' }] })
      processor.citeInText({ id: 'b' })

      expect(processor.bibliography()).toEqual(normAndInText)
    })

    it('should include no-cite references in bibliography', () => {
      processor.noCite(['b'])
      expect(processor.bibliography()).toEqual(noCite)
    })

    it('should put no-cite references after cited references', () => {
      processor.noCite(['b'])
      processor.cite({ citationItems: [{ id: 'a' }] })
      expect(processor.bibliography()).toEqual(noCiteAndNormal)
    })
  })
}

const apaData = {
  suiteName: 'author-date citations',
  style: apa,
  singleCite: '(Bloggs, 2016)',
  multiCite: ['(Bloggs, 2016)', '(Doe, 2017)'],
  disambig: ['(Jane Doe, 2017)', '(John Doe, 2018)'],
  bibliography: [
    'Bloggs, J. (2016). Item A.\n',
    'Bloggs, J. (2016). Item A.\nDoe, J. (2017). Item B.\n'
  ],
  prefix: '(see Bloggs, 2016)',
  locator: '(Bloggs, 2016, pp. 42--44)',
  suffix: '(Bloggs, 2016 and *passim*)',
  both: '(Bloggs, 2016, pp. 42--44 and *passim*)',
  suppressAuthor: '(2016)',
  inText: ['Bloggs (2016)', 'Doe (2017)'],
  inTextBib: 'Bloggs, J. (2016). Item A.\n',
  normAndInText: 'Bloggs, J. (2016). Item A.\nDoe, J. (2017). Item B.\n',
  noCite: 'Doe, J. (2017). Item B.\n',
  noCiteAndNormal: 'Bloggs, J. (2016). Item A.\nDoe, J. (2017). Item B.\n'
}

styleSuite(apaData)

const vancouverData = {
  suiteName: 'numbered',
  style: vancouver,
  singleCite: '(1)',
  multiCite: ['(1)', '(2)'],
  disambig: ['(1)', '(2)'],
  bibliography: [
    '1. Bloggs J. Item A. 2016. \n',
    '1. Bloggs J. Item A. 2016. \n2. Doe J. Item B. 2017. \n'
  ],
  prefix: '(see 1)',
  locator: '(1)',
  suffix: '(1 and *passim*)',
  both: '(1 and *passim*)',
  suppressAuthor: '(1)',
  inText: ['Reference 1', 'Reference 2'],
  inTextBib: '1. Bloggs J. Item A. 2016. \n',
  normAndInText: '1. Bloggs J. Item A. 2016. \n2. Doe J. Item B. 2017. \n',
  noCite: '1. Doe J. Item B. 2017. \n',
  noCiteAndNormal: '1. Bloggs J. Item A. 2016. \n2. Doe J. Item B. 2017. \n'
}

styleSuite(vancouverData)
