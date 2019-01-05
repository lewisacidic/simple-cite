import citeproc from 'citeproc'

export default class Manager {
  constructor({ items, style, locale, format = 'html' }) {
    Object.assign(this, { items, style, locale, format })
  }

  get itemLookup() {
    if (this._itemLookup) return this._itemLookup
    else {
      this._itemLookup = {}
      this.items.forEach(item => (this._itemLookup[item.id] = item))
      return this._itemLookup
    }
  }

  get engine() {
    if (this._engine) return this._engine
    else {
      this._engine = new citeproc.Engine(this, this.style)
      this._engine.setOutputFormat(this.format)
      return this._engine
    }
  }

  get format() {
    return this._format
  }

  set format(fmt) {
    this.engine.setOutputFormat(fmt)
    this._format = fmt
  }

  retrieveItem(item) {
    return this.itemLookup[item]
  }

  retrieveLocale() {
    return this.locale
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

  bibliography() {
    const [params, data] = this.engine.makeBibliography()
    return [params.bibstart, ...data, params.bibend].join('')
  }
}
