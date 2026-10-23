import { describe, expect, it } from 'vitest'
import * as root from '../index'
import { zhConnectorsLabel } from '../zh/connectorsLabel'
import { zhActionsLabel } from '../zh/actionsLabel'
import { zhIntegrationDesc } from '../zh/integrationDesc'
import { zhSymbolLabel } from '../zh/symbolLabel'
import { zhRuleSQL } from '../zh/ruleSQL'
import { zhRuleFunction } from '../zh/ruleFunction'
import { zhFlow } from '../zh/flow'
import * as integration from '../zh-TW/integration'
import { zhTWRuleSQL } from '../zh-TW/ruleSQL'
import { zhTWRuleFunction } from '../zh-TW/ruleFunction'
import { zhTWFlow } from '../zh-TW/flow'

const flatten = (value: Record<string, unknown>, prefix = ''): Record<string, string> =>
  Object.fromEntries(
    Object.entries(value).flatMap(([key, entry]) => {
      const path = prefix ? `${prefix}.${key}` : key
      return typeof entry === 'string'
        ? [[path, entry]]
        : Object.entries(flatten(entry as Record<string, unknown>, path))
    }),
  )

const tokens = (text: string) =>
  (
    text.match(/<code>[\s\S]*?<\/code>|`[^`]*`|\{[a-zA-Z_][\w.]*\}|t\/[a-zA-Z0-9/+#]+/g) ?? []
  ).filter((token) => !/\p{Script=Han}/u.test(token))

describe('optional Traditional Chinese resources', () => {
  it('covers all shared keys and preserves technical tokens and placeholders', () => {
    for (const [source, translated] of [
      [zhConnectorsLabel, integration.zhTWConnectorsLabel],
      [zhActionsLabel, integration.zhTWActionsLabel],
      [zhIntegrationDesc, integration.zhTWIntegrationDesc],
      [zhSymbolLabel, integration.zhTWSymbolLabel],
      [zhRuleSQL, zhTWRuleSQL],
      [zhRuleFunction, zhTWRuleFunction],
      [zhFlow, zhTWFlow],
    ]) {
      const original = flatten(source)
      const actual = flatten(translated)
      expect(Object.keys(actual).sort()).toEqual(Object.keys(original).sort())
      for (const [key, text] of Object.entries(original)) {
        expect(actual[key].trim().length, key).toBeGreaterThan(0)
        expect(tokens(actual[key]), key).toEqual(tokens(text))
      }
    }
  })

  it('keeps Traditional Chinese resources out of the root entry', () => {
    for (const key of [
      ...Object.keys(integration),
      'zhTWRuleSQL',
      'zhTWRuleFunction',
      'zhTWFlow',
    ]) {
      expect(root).not.toHaveProperty(key)
    }
  })
})
