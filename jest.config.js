module.exports = {
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.csl$': 'jest-raw-loader',
    '^.+\\.xml$': 'jest-raw-loader'
  },
  testRegex: '.+\\.spec\\.js$',
  testPathIgnorePatterns: ['node_modules', 'dist'],
  moduleFileExtensions: ['js'],
  testURL: 'http://localhost',
  reporters: [
    'default',
    [
      'jest-html-reporter',
      {
        outputPath: 'reports/html/unit-tests.html',
        theme: 'lightTheme'
      }
    ],
    [
      'jest-junit',
      {
        output: 'reports/junit/unit-tests.xml'
      }
    ]
  ],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageReporters: ['text', 'lcov', 'html'],
  coverageDirectory: 'reports/coverage'
}
