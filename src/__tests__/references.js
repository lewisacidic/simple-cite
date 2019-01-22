export default [
  {
    id: 'example-a',
    type: 'article-journal',
    title: 'Item A',
    author: [{ given: 'Joe', family: 'Bloggs' }],
    'container-title': 'Journal of Examples',
    volume: '2',
    issue: '4',
    page: '42-64',
    issued: { 'date-parts': [[2016]] }
  },
  {
    id: 'example-b',
    type: 'article-journal',
    title: 'Item B',
    author: [{ given: 'Jane', family: 'Doe' }],
    'container-title': 'Journal of Examples',
    volume: '4',
    issue: '2',
    page: '22-33',
    issued: { 'date-parts': [[2017]] }
  },
  {
    id: 'example-c',
    type: 'article-journal',
    title: 'Item C',
    'container-title': 'Journal of Examples',
    author: [{ given: 'John', family: 'Smith' }],
    volume: '8',
    issue: '3',
    page: '15-30',
    issued: { 'date-parts': [[2018, 6]] }
  },
  {
    id: 'example-janedoe',
    type: 'article',
    title: 'Jane Doe Article',
    author: [{ given: 'Jane', family: 'Doe' }],
    issued: { 'date-parts': [[2011]] }
  },
  {
    id: 'example-johndoe',
    type: 'article',
    title: 'First John Doe Article',
    author: [{ given: 'John', family: 'Doe' }],
    issued: { 'date-parts': [[2015]] }
  },
  {
    id: 'example-johndoe2',
    type: 'article',
    title: 'Second John Doe Article',
    author: [{ given: 'John', family: 'Doe' }],
    issued: { 'date-parts': [[2015]] }
  },
  {
    id: 'example-twoauthors',
    type: 'article-journal',
    title: 'Article with two authors',
    'container-title': 'Journal of Minor Collaboration',
    'container-title-short': 'J. Min. Collab.',
    author: [
      { given: 'Greg', family: 'Thomas' },
      { given: 'Steven', family: 'Jones' }
    ],
    volume: '10',
    issue: '4',
    issued: { 'date-parts': [[2014]] }
  },
  {
    id: 'example-fourauthors',
    type: 'article-journal',
    title: 'Article with many authors',
    'container-title': 'Journal of Major Collaboration',
    'container-title-short': 'J. Maj. Collab.',
    author: [
      { given: 'Felicity', family: 'Williams' },
      { given: 'Harvey', family: 'Taylor' },
      { given: 'Gary', family: 'Davies' },
      { given: 'Thomas', family: 'Brown' }
    ],
    volume: '42',
    issue: '8',
    issued: { 'date-parts': [[2015]] }
  },
  {
    id: 'example-manyauthors',
    type: 'article-journal',
    title: 'Article with many authors',
    'container-title': 'Journal of Major Collaboration',
    'container-title-short': 'J. Maj. Collab.',
    author: [
      { given: 'Anne', family: 'Hunter' },
      { given: 'Harriet', family: 'Thompson' },
      { given: 'Piers', family: 'Wolf' },
      { given: 'Benjamin', family: 'Donnel' },
      { given: 'Georgia', family: 'Wilson' },
      { given: 'Jeff', family: 'Evans' }
    ],
    volume: '42',
    issue: '8',
    issued: { 'date-parts': [[2015]] }
  },
  {
    id: 'example-url',
    type: 'article-journal',
    title: 'Online Article',
    'container-title': 'Journal of Examples',
    author: [{ given: 'Bill', family: 'Walker' }],
    URL: 'https://www.testurl.com',
    issued: { 'date-parts': [[2019]] }
  },
  {
    id: 'example-article-journal',
    type: 'article-journal',
    title: 'Protein measurement with the Folin phenol reagent',
    'container-title': 'Journal of biological chemistry',
    page: '265–275',
    volume: '193',
    issue: '1',
    source: 'Google Scholar',
    author: [
      {
        family: 'Lowry',
        given: 'Oliver H.'
      },
      {
        family: 'Rosebrough',
        given: 'Nira J.'
      },
      {
        family: 'Farr',
        given: 'A. Lewis'
      },
      {
        family: 'Randall',
        given: 'Rose J.'
      }
    ],
    issued: {
      'date-parts': [['1951']]
    }
  },
  {
    id: 'example-paper-conference',
    type: 'paper-conference',
    title: 'ImageNet Classification with Deep Convolutional Neural Networks',
    'container-title': 'Advances in Neural Information Processing Systems 25',
    page: '1097–1105',
    event: 'Neural Information Processing Systems 25',
    author: [
      {
        family: 'Krizhevsky',
        given: 'Alex'
      },
      {
        family: 'Sutskever',
        given: 'Ilya'
      },
      {
        family: 'Hinton',
        given: 'Geoffrey E'
      }
    ],
    issued: {
      'date-parts': [['2012']]
    }
  },
  {
    id: 'example-book',
    type: 'book',
    title:
      'The fellowship of the ring: being the first part of The lord of the rings',
    'collection-title': 'The lord of the rings / by J.R.R. Tolkien',
    'collection-number': 'pt. 1',
    publisher: 'Houghton Mifflin Co',
    'publisher-place': 'Boston',
    'number-of-pages': '423',
    edition: '2nd ed',
    source: 'Library of Congress ISBN',
    'event-place': 'Boston',
    ISBN: '978-0-395-08254-6',
    'call-number': 'PR6039.O32 L6 1986 pt. 1',
    shortTitle: 'The fellowship of the ring',
    author: [
      {
        family: 'Tolkien',
        given: 'J. R. R.'
      }
    ],
    issued: {
      'date-parts': [['1986']]
    }
  },

  {
    id: 'example-webpage',
    type: 'webpage',
    title: 'CSL search by example',
    'container-title': 'Citation Style Editor',
    URL: 'http://editor.citationstyles.org/searchByExample/',
    accessed: {
      'date-parts': [[2012, 12, 15]]
    }
  }
]
