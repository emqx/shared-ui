import { formatSizeUnit, flattenObject, unflattenObject, RuleFunc, RuleField } from '../lib'

console.log(formatSizeUnit(12969))

console.log('Output of flattenObject function: ', flattenObject({ a: { b: { c: 1 } } }))

console.log('Output of unflattenObject function: ', unflattenObject({ 'a.b.c': 1 }))

console.log('RuleFunc: ', RuleFunc)
console.log('RuleField: ', RuleField)
