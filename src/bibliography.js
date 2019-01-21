import { h } from './utils'

const TITLE = Symbol('title')

export default class Bibliography {
  value = null
  processor = null
  ids = []

  constructor({ title = false, processor }) {
    this.title = title
    this.processor = processor
  }

  get title() {
    let title = this[TITLE]
    if (title && title === true) {
      title = this.processor.term({
        name: 'reference',
        plural: this.ids.length !== 1,
        capitalize: true
      })
    }
    return title
  }

  set title(value) {
    this[TITLE] = value
  }

  rerender() {
    let { start, data, end, ids } = this.processor.makeBibliography()
    this.ids = ids

    if (this.title)
      start +=
        this.processor.format === 'html'
          ? h('h2.csl-bib-title', this.title, 2)
          : this.title + '\n\n'

    this.value = [start, ...data, end].join('')
    return this
  }
}
