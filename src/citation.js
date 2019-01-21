export default class Citation {
  value = null
  processor = null

  constructor({ citationItems, properties, id, processor }) {
    this.citationItems = citationItems
    this.properties = properties || {}
    this.properties.noteIndex = this.properties.noteIndex || 0
    this.id = id
    this.processor = processor
  }

  rerender() {
    if (this.properties['in-narrative']) {
      const clone = this.clone()
      clone.properties['in-narrative'] = false
      clone.citationItems = [
        { id: this.citationItems[0].id, 'author-only': true }
      ]
      const authorOnly = this.processor.preview(clone)
      clone.citationItems = [
        { ...this.citationItems[0], 'suppress-author': true }
      ]
      this.value = [authorOnly, this.processor.preview(clone)].join(' ').trim()
    } else {
      this.value = this.processor.preview(this)
    }
    return this
  }

  clone() {
    return new Citation({
      id: this.id,
      citationItems: this.citationItems,
      processor: this.processor,
      properties: { ...this.properties }
    })
  }
}
