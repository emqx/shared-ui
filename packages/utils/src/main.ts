import { flattenObject, unflattenObject } from '../lib'

console.log('Output of flattenObject function: ', flattenObject({ a: { b: { c: 1 } } }))

console.log('Output of unflattenObject function: ', unflattenObject({ 'a.b.c': 1 }))
