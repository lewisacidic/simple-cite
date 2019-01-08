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
npm install --save simple-cite @citation-style-language/{style-apa,locale-en-US}
```

or [yarn](https://yarnpkg.com/):

```shell
yarn add simple-cite @citation-style-language/{style-apa,locale-en-US}
```

## Simple Usage

Import the citation processor from the package, configure it with a CSL [style](#citation-style) and [locale](#citation-locale), a list of citeable [items](#items) and optionally a format ('html', 'text' or 'rst'):

```js
import Processor from 'simple-cite'

// citation formatting configuration
import style from '@citation-style-language/style-apa'

// localization configuration
import locale from '@citation-style-language/locale-en-US'

// a list of citable items with relevant metadata
import items from './references'

const processor = new Processor({
  items,
  style,
  locale
})
```

Make **citations** using the `cite` method, providing a [citation](#citation) data-structure as argument:

```js
processor.cite({ citationItems: { id: 'hawking1988' } })
// (Hawking, 1988)
```

Make **in-text citations** using the `citeInText` method, providing a single [cite-item](#cite-item) as argument:

```js
processor.citeInText({ id: 'hawking1988' })
// Hawking (1988)
```

Register items to include without explicit citation (no-cites) with the `noCite` method, providing an array of cite-item ids as argument:

```js
processor.noCite(['hawking1988'])
```

Make a bibliography for items previously cited by the processor using the `bibliography` method:

```js
processor.bibliography()
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

A cite-item corresponds to a single in-document reference to an [item](#items) via matching id property, with optional _locator_, _prefix_ and _suffix_ annotations.
The option to not include reference to the author (_suppress-author_) or include only the author (_author-only_).

For example,

```json
{ "id": "hawking1988", "prefix": "see", "suppress-author": true }
```

### Citations

A citation corresponds to a collection of [cite-items](#cite-items) referenced at a single point within a document, with a properties object providing metadata about the citation within the text, for example the index of the footnote in which it is located.

For example,

```json
{
  "citationItems": [{ "id": "hawking1988", "locator": "pp. 42--44" }],
  "properties": {
    "noteIndex": 2
  }
}
```

### Citation Styles

The CSL style may be specified using either the XML-based Citation Style Language, or a derived JSON representation.
These may be found for a great many journals in the [official CSL style repository](https://github.com/citation-style-language/styles), or obtained as a JavaScript package hosted on NPM under the scope `@citation-style-language/style-*`.

### Citation Locales

The CSL locale may be specified in the same way, and obtained from the [official CSL locale repository](https://github.com/citation-style-language/locales), or obtained from NPM under the scope `@citation-style-language/locale-*`.
