import Processor from '../processor'

import vancouver from 'style-vancouver'
import apa from 'style-apa'
import locale from 'locale-en-gb'

import references from './references'

describe('Bibliography', () => {
  let processor
  beforeEach(() => {
    processor = new Processor({
      items: references,
      style: apa,
      locale: locale,
      format: 'html'
    })
  })

  it('renders an item added with `noCite`', () => {
    processor.noCite(['example-a'])
    expect(processor.bibliography().value).toEqual(`<div class="csl-bib-body">
  <div class="csl-entry">Bloggs, J. (2016). Item A. <i>Journal of Examples</i>, <i>2</i>(4), 42–64.</div>
</div>`)
  })

  it('renders in text mode', () => {
    processor.format = 'text'
    processor.noCite(['example-a'])
    expect(processor.bibliography().value).toEqual(
      'Bloggs, J. (2016). Item A. Journal of Examples, 2(4), 42–64.\n'
    )
  })

  it('renders multiple items added with `noCite`', () => {
    processor.noCite(['example-a', 'example-b'])
    expect(processor.bibliography().value).toEqual(`<div class="csl-bib-body">
  <div class="csl-entry">Bloggs, J. (2016). Item A. <i>Journal of Examples</i>, <i>2</i>(4), 42–64.</div>
  <div class="csl-entry">Doe, J. (2017). Item B. <i>Journal of Examples</i>, <i>4</i>(2), 22–33.</div>
</div>`)
  })

  it('renders an item added with `cite`', () => {
    processor.cite({ citationItems: [{ id: 'example-a' }] })
    expect(processor.bibliography().value).toEqual(`<div class="csl-bib-body">
  <div class="csl-entry">Bloggs, J. (2016). Item A. <i>Journal of Examples</i>, <i>2</i>(4), 42–64.</div>
</div>`)
  })

  it('renders multiple items added with `cite`', () => {
    processor.cite({ citationItems: [{ id: 'example-a' }] })
    processor.cite({ citationItems: [{ id: 'example-b' }] })
    expect(processor.bibliography().value).toEqual(`<div class="csl-bib-body">
  <div class="csl-entry">Bloggs, J. (2016). Item A. <i>Journal of Examples</i>, <i>2</i>(4), 42–64.</div>
  <div class="csl-entry">Doe, J. (2017). Item B. <i>Journal of Examples</i>, <i>4</i>(2), 22–33.</div>
</div>`)
  })

  it('renders items added with `cite` and `noCite`', () => {
    processor.noCite(['example-a'])
    processor.cite({ citationItems: [{ id: 'example-b' }] })
    expect(processor.bibliography().value).toEqual(`<div class="csl-bib-body">
  <div class="csl-entry">Bloggs, J. (2016). Item A. <i>Journal of Examples</i>, <i>2</i>(4), 42–64.</div>
  <div class="csl-entry">Doe, J. (2017). Item B. <i>Journal of Examples</i>, <i>4</i>(2), 22–33.</div>
</div>`)
  })

  it('renders items with two authors', () => {
    processor.noCite(['example-twoauthors'])
    expect(processor.bibliography().value).toEqual(`<div class="csl-bib-body">
  <div class="csl-entry">Thomas, G., &#38; Jones, S. (2014). Article with two authors. <i>Journal of Minor Collaboration</i>, <i>10</i>(4).</div>
</div>`)
  })

  it('renders items with many authors', () => {
    processor.noCite(['example-manyauthors'])
    expect(processor.bibliography().value).toEqual(`<div class="csl-bib-body">
  <div class="csl-entry">Hunter, A., Thompson, H., Wolf, P., Donnel, B., Wilson, G., &#38; Evans, J. (2015). Article with many authors. <i>Journal of Major Collaboration</i>, <i>42</i>(8).</div>
</div>`)
  })

  it('optionally renders a title', () => {
    processor.noCite(['example-a', 'example-b'])
    expect(processor.bibliography({ title: true }).value)
      .toEqual(`<div class="csl-bib-body">
  <h2 class="csl-bib-title">References</h2>
  <div class="csl-entry">Bloggs, J. (2016). Item A. <i>Journal of Examples</i>, <i>2</i>(4), 42–64.</div>
  <div class="csl-entry">Doe, J. (2017). Item B. <i>Journal of Examples</i>, <i>4</i>(2), 22–33.</div>
</div>`)
  })

  it('optionally renders a title in text mode', () => {
    processor.format = 'text'
    processor.noCite(['example-a', 'example-b'])
    expect(processor.bibliography({ title: true }).value).toEqual(
      'References\n\nBloggs, J. (2016). Item A. Journal of Examples, 2(4), 42–64.\nDoe, J. (2017). Item B. Journal of Examples, 4(2), 22–33.\n'
    )
  })

  it('will use a singular term for references if only one is used', () => {
    processor.noCite(['example-a'])
    expect(processor.bibliography({ title: true }).value)
      .toEqual(`<div class="csl-bib-body">
  <h2 class="csl-bib-title">Reference</h2>
  <div class="csl-entry">Bloggs, J. (2016). Item A. <i>Journal of Examples</i>, <i>2</i>(4), 42–64.</div>
</div>`)
  })
  it('optionally renders a named title', () => {
    processor.noCite(['example-a'])
    expect(processor.bibliography({ title: 'Example Title' }).value)
      .toEqual(`<div class="csl-bib-body">
  <h2 class="csl-bib-title">Example Title</h2>
  <div class="csl-entry">Bloggs, J. (2016). Item A. <i>Journal of Examples</i>, <i>2</i>(4), 42–64.</div>
</div>`)
  })

  describe('apa', () => {
    beforeEach(() => {
      processor = new Processor({
        items: references,
        style: apa,
        locale,
        format: 'html'
      })
    })
    it('renders a journal article', () => {
      processor.noCite(['example-article-journal'])
      expect(processor.bibliography().value).toMatchSnapshot()
    })

    it('renders a book', () => {
      processor.noCite(['example-book'])
      expect(processor.bibliography().value).toMatchSnapshot()
    })

    it('renders a webpage', () => {
      processor.noCite(['example-webpage'])
      expect(processor.bibliography().value).toMatchSnapshot()
    })

    it('renders a conference paper', () => {
      processor.noCite(['example-paper-conference'])
      expect(processor.bibliography().value).toMatchSnapshot()
    })

    it('renders multiple references', () => {
      processor.noCite(['example-a', 'example-b'])
      expect(processor.bibliography().value).toMatchSnapshot()
    })
  })

  describe('vancouver', () => {
    beforeEach(() => {
      processor = new Processor({
        items: references,
        style: vancouver,
        locale,
        format: 'html'
      })
    })
    it('renders a journal article', () => {
      processor.noCite(['example-article-journal'])
      expect(processor.bibliography().value).toMatchSnapshot()
    })

    it('renders a book', () => {
      processor.noCite(['example-book'])
      expect(processor.bibliography().value).toMatchSnapshot()
    })

    it('renders a webpage', () => {
      processor.noCite(['example-webpage'])
      expect(processor.bibliography().value).toMatchSnapshot()
    })

    it('renders a conference paper', () => {
      processor.noCite(['example-paper-conference'])
      expect(processor.bibliography().value).toMatchSnapshot()
    })

    it('renders multiple references', () => {
      processor.noCite(['example-a', 'example-b'])
      expect(processor.bibliography().value).toMatchSnapshot()
    })
  })
})
