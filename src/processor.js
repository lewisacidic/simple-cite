import citeproc from 'citeproc'
import Citation from './citation'
import Bibliography from './bibliography'

export default class Processor {
  citations = []
  noCites = []

  constructor({ items, style, locale, format = 'text' }) {
    const itemLookup = {}
    items.forEach(item => (itemLookup[item.id] = item))
    const sys = {
      retrieveItem: item => itemLookup[item],
      retrieveLocale: () => locale
    }

    this.engine = new citeproc.Engine(sys, style)
    this.engine.opt.development_extensions.wrap_url_and_doi = true
    this.format = format
  }

  get format() {
    return this._format
  }

  set format(fmt) {
    this.engine.setOutputFormat(fmt)
    this._format = fmt
  }

  process(citation) {
    const clone = citation.clone()

    const result = this.engine.processCitationCluster(
      clone,
      this.citations.map(c => [c.id, c.properties.noteIndex]),
      []
    )

    citation.processor = this
    citation.id = clone.citationID
    this.citations.push(citation)

    result[1].forEach(([idx]) => this.citations[idx].rerender())

    return citation
  }

  preview(citation) {
    const index = this.citations.findIndex(c => c.id === citation.id)
    const background = this.citations.map(c => [c.id, c.properties.noteIndex])
    const clone = citation.clone()

    return this.engine.previewCitationCluster(
      clone,
      background.slice(0, index),
      background.slice(index),
      this.format
    )
  }

  term({ name, plural = false, capitalize = false }) {
    const term = this.engine.getTerm(name, null, Number(plural))
    return capitalize ? term.charAt(0).toUpperCase() + term.substr(1) : term
  }

  makeBibliography() {
    const [params, data] = this.engine.makeBibliography()
    return {
      start: params.bibstart,
      data,
      end: params.bibend,
      ids: params.entry_ids
    }
  }

  cite(citation) {
    return this.process(new Citation(citation))
  }

  noCite(citeIds) {
    this.noCites = this.noCites.concat(citeIds)
    this.engine.updateUncitedItems(citeIds)
  }

  bibliography({ title } = {}) {
    return new Bibliography({ title, processor: this }).rerender()
  }
}
