<p align="center">
  <img src="static/logo.png" alt="simple-cite" />
</p>

<p align="center">
  <a href="https://wwww.npmjs.com/package/simple-cite">
    <img src="https://flat.badgen.net/npm/v/simple-cite" alt="NPM version" />
  </a>
  <a href="https://wwww.npmjs.com/package/simple-cite">
    <img src="https://flat.badgen.net/badge/module/umd,cjs,esm" alt="module formats" />
  </a>
  <a href="https://circleci.com/gh/richlewis42/simple-cite">
    <img src="https://flat.badgen.net/circleci/github/richlewis42/simple-cite" alt="status" />
  </a>
  <a href="https://codecov.io/gh/richlewis42/simple-cite">
    <img src="https://flat.badgen.net/codecov/c/github/richlewis42/simple-cite" alt="coverage" />
  </a>  
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://flat.badgen.net/badge/license/MIT/blue" alt="license" />
  </a>
</p>
<p align="center">
A simple package for generating citations and bibliographies, wrapping the excellent <a href="https://citeproc-js.readthedocs.io/en/latest/"><code>citeproc-js</code></a>.
</p>

## Install

Download the package from NPM using [`npm`](https://npmjs.org):

```shell
npm install --save simple-cite style-apa locale-en-us
```

or [`yarn`](https://yarnpkg.com/):

```shell
yarn add simple-cite style-apa locale-en-us
```

## Simple Usage

Import the citation processor from the package, configure it with a CSL [style](#citation-style) and [locale](#citation-locale), a list of citeable [items](#items) and optionally a format ('html', 'text' or 'rst'):

```js
import Processor from 'simple-cite'

// citation formatting configuration
import style from 'style-apa'

// localization configuration
import locale from 'locale-en-US'

// a list of citable items with relevant metadata
import items from './references'

const processor = new Processor({
  items,
  style,
  locale
})
```

### Making Citations

`Citation` objects may be made using the `cite` method of the `Processor`, providing a [citation](#citation) datastructure as argument:

```js
const citation = processor.cite({ citationItems: [{ id: 'hawking1988' }] })
```

`Citation` objects maintain the value of a citation registered with the processor within their `value` property:

```js
citation.value
// (Hawking, 1988)
```

This allows disambiguations to future citations and more to be made.
For example, if we cite Lucy Hawking within the same context, we ought to disambiguate the authors according to the APA style.
This would be tracked by the processor:

```js
const lucyCitation = processor.cite({ citationItems: [{ id: 'hawking2000' }] })

lucyCitation.value
// (Lucy Hawking, 2000)

citation.value
// (Stephen Hawking, 1988)
```

As such, it is important to remember that _citation values may change while citations are being registered_.

### Making Bibliographies

A `Bibliography` object may be made using the `bibliography` method:

```js
const bibliography = processor.bibliography()
```

Like with `Citation`, this maintains the value of long form references for items previously cited by the processor with a `value` property:

```js
bibliography.value
// Hawking, S. W. (1988). A brief history of time: from the big bang to black holes. Toronto: Bantam Books
```

Again, the value will update as citations are registered with the `Processor`.

### In depth Usage

In addition to simple citations, in-narrative citations by adding an `"in-narrative"` property to the citation:

```js
const citation = processor.cite({
  citationItems: [{ id: 'hawking1988' }],
  properties: { 'in-narrative': true }
})
citation.value
// Hawking (1988)
```

Items to be included in bibliographies without explicit citation (no-cites) may be registered with the `noCite` method, which takes an array of [item](#items) ids as argument:

```js
processor.noCite(['hawking1988'])
```

## Citation data structures

Citation data is described according to the [CSL-JSON schema](https://github.com/citation-style-language/schema).

### Items

A single bibliographic work or resource, such as an article, book or book chapter.
An item is represented as an object, with a required `id` field (analogous to the BibTeX cite-key) and `type` field (analogous to the BibTeX entry type).
Further metadata, such as authors, date of issue etc. may be included with appropriate fields.
An example would be:

```json
[
  {
    "id": "hawking1988",
    "type": "book",
    "title": "A brief history of time: from the big bang to black holes",
    "publisher": "Bantam Books",
    "number-of-pages": "198",
    "event-place": "Toronto",
    "ISBN": "978-0-553-05340-1",
    "shortTitle": "A brief history of time",
    "author": [
      {
        "family": "Hawking",
        "given": "Stephen W."
      }
    ],
    "issued": {
      "date-parts": [["1988"]]
    }
  }
]
```

These data are most easily generated using a compatible citation manager, such as [Zotero](https://www.zotero.org/).

### Cite-Items

A cite-item corresponds to a single in-document reference to an [item](#items) via matching id property, with optional `locator` and `label`, `prefix` and `suffix` annotations, and the option to not include reference to the author (`"suppress-author"`) or include _only_ the author (`"author-only"`).

For example,

```json
{
  "id": "hawking1988",
  "label": "page",
  "locator": "140",
  "prefix": "see",
  "suffix": "for the most expensive equation in history"
}
```

### Citations

A citation corresponds to a collection of [cite-items](#cite-items) referenced at a single point within a document, with a properties object providing metadata about the citation within the text, for example the index of the footnote in which it is located (if using a "note"-based [citation style](#citation-styles)).

For example,

```json
{
  "citationItems": [
    {
      "id": "hawking1988",
      "label": "chapter",
      "locator": "3"
    }
  ],
  "properties": {
    "noteIndex": 2
  }
}
```

### Citation Styles

The CSL style may be specified using either the XML-based Citation Style Language, or a derived JSON representation.
These may be found for a great many journals in the [official CSL style repository](https://github.com/citation-style-language/styles), or obtained as a JavaScript package hosted on NPM under the scope `style-*`.

### Citation Locales

The CSL locale may be specified in the same way, and obtained from the [official CSL locale repository](https://github.com/citation-style-language/locales), or obtained from NPM under the scope `locale-*`.
