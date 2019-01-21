import citeproc from 'citeproc'
import Citation from './citation'

export default class Processor {
  citations = []

  constructor({ items, style, locale, format = 'text' }) {
    const itemLookup = {}
    items.forEach(item => (itemLookup[item.id] = item))
    const sys = {
      retrieveItem: item => itemLookup[item],
      retrieveLocale: () => locale
    }
    this.engine = new citeproc.Engine(sys, style)
    this.format = format
  }

  get format() {
    return this._format
  }

  set format(fmt) {
    this.engine.setOutputFormat(fmt)
    this._format = fmt
  }

  cite(citation) {
    citation = new Citation(citation)
    const clone = citation.clone()

    const result = this.engine.processCitationCluster(
      clone,
      this.citations.map(c => [c.id, c.properties.noteIndex]),
      []
    )

    citation.id = clone.citationID
    this.citations.push(citation)

    result[1].forEach(([idx, value]) => (this.citations[idx].value = value))
    return citation
  }

  noCite(citeIds) {
    this.engine.updateUncitedItems(citeIds)
  }

  bibliography({ title } = {}) {
    const [params, data] = this.engine.makeBibliography()
    if (title) {
      let ref =
        typeof title === 'string'
          ? title
          : this.engine.getTerm('reference', null, 1)
      ref = ref[0].toUpperCase() + ref.slice(1)
      if (this.format === 'html') {
        params.bibstart = params.bibstart + '  <h2>' + ref + '</h2>\n'
      } else {
        params.bibstart = ref + '\n' + params.bibstart
      }
    }
    return [params.bibstart, ...data, params.bibend].join('')
  }
}
