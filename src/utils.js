export const h = (selector, value, indent) => {
  let tag,
    fields = selector.split(/(?=[#.])/)
  if (fields[0].charAt(0).match(/[#.]/)) {
    tag = 'div'
  } else {
    tag = fields[0]
    fields = fields.slice(1)
  }
  let id,
    classes = []
  fields.forEach(v =>
    v.startsWith('.') ? classes.push(v.substr(1)) : (id = v.substr(1))
  )

  const open = `<${tag}${id ? ` id="${id}"` : ''}${
    classes.length ? ' class="' + classes.join(' ') + '"' : ''
  }>`
  const close = '</' + tag + '>\n'
  return ' '.repeat(indent) + open + value + close
}
