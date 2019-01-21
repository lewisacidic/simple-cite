export default class Citation {
  constructor({ citationItems, properties }) {
    this.citationItems = citationItems
    this.properties = properties || {}
    this.properties.noteIndex = this.properties.noteIndex || 0
  }
  clone() {
    return new Citation(JSON.parse(JSON.stringify(this)))
  }
}
