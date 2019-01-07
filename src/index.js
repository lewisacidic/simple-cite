import citeproc from 'citeproc'

export default class Processor {
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

  citeInText(citation) {
    const numberedRefs =
      this.engine.cslXml.dataObj.children.find(c => c.name === 'citation').attrs
        .collapse === 'citation-number'
    if (numberedRefs) {
      citation.citationItems[0]['author-only'] = true
      return this.cite(citation)
    } else {
      const result = this.engine.makeCitationCluster([
        { id: citation.citationItems[0].id, 'author-only': true }
      ])
      Object.assign(citation.citationItems[0], {
        'suppress-author': true,
        'in-text': false
      })
      return [result, this.cite(citation)].join(' ')
    }
  }

  cite(citation) {
    const result = this.engine.processCitationCluster(
      citation,
      this.engine.registry.citationreg.citationByIndex.map(citation => [
        citation.citationID,
        citation.properties.noteIndex
      ]),
      []
    )
    return result[1][0][1]
  }

  noCite(citeIds) {
    this.engine.updateUncitedItems(citeIds)
  }

  bibliography() {
    const [params, data] = this.engine.makeBibliography()
    return [params.bibstart, ...data, params.bibend].join('')
  }
}
