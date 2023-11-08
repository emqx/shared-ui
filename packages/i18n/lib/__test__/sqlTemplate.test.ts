// sqlTemplate.test.ts
import { SQLTemplates } from '../sqlTemplate'
import { describe, it, expect } from 'vitest'

describe('sqlTemplate', () => {
  it('contains valid SQL templates', () => {
    SQLTemplates.forEach((template) => {
      // 测试基本属性
      expect(template).toHaveProperty('title')
      expect(template).toHaveProperty('scene')
      expect(template).toHaveProperty('sql')
      expect(template).toHaveProperty('input')
      expect(template).toHaveProperty('outputs')

      // 测试 title 和 scene 的结构
      expect(template.title).toHaveProperty('zh')
      expect(template.title).toHaveProperty('en')
      expect(template.scene).toHaveProperty('zh')
      expect(template.scene).toHaveProperty('en')
      expect(typeof template.title.zh).toBe('string')
      expect(typeof template.title.en).toBe('string')
      expect(typeof template.scene.zh).toBe('string')
      expect(typeof template.scene.en).toBe('string')
      expect(typeof template.sql).toBe('string')
    })
  })
})
