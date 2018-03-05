/**
 * copy自
 * http://blog.csdn.net/bdss58/article/details/67151775
 * promisify
 * change logs:
 * 2018/2/28 herbluo created
 */
export const promisify = (f) => {
  return function () {
    const args = Array.prototype.slice.call(arguments)
    return new Promise(function (resolve, reject) {
      args.push(function (err, result) {
        if (err) reject(err)
        else resolve(result)
      })
      f.apply(null, args)
    })
  }
}

export function isFunction (o) {
  return typeof o === 'function'
}

export function isString (o) {
  return typeof o === 'string'
}

export function isImageDom (o) {
  return o && ['IMAGE', 'IMG'].includes(o.tagName)
}
