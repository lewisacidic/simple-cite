import _ from 'lodash'

class Countdown {
  constructor(from) {
    this.from = from
  }

  static delimiter = '...' // class properties

  count() {
    return _.range(this.from, 0, -1).reduce(
      (a, i) => a + i + Countdown?.delimiter, // optional chaining
      ''
    )
  }
}
export default Countdown
