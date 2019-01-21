import citeproc from 'citeproc'
import Citation from './citation'

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

    citation.id = clone.citationID
    this.citations.push(citation)

    result[1].forEach(
      ([idx]) => (this.citations[idx].value = this.preview(this.citations[idx]))
    )
    return citation
  }

  preview(citation) {
    const index = this.citations.findIndex(c => c.id === citation.id)
    const background = this.citations.map(c => [c.id, c.properties.noteIndex])
    const clone = citation.clone()

    if (citation.properties['in-narrative']) {
      clone.properties['in-narrative'] = false
      clone.citationItems = [
        { id: citation.citationItems[0].id, 'author-only': true }
      ]
      const authorOnly = this.preview(clone)
      clone.citationItems = [
        { ...citation.citationItems[0], 'suppress-author': true }
      ]
      return [authorOnly, this.preview(clone)].join(' ').trim()
    } else {
      return this.engine.previewCitationCluster(
        clone,
        background.slice(0, index),
        background.slice(index),
        this.format
      )
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
