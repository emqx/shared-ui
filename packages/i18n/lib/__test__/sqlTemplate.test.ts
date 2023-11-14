import { SQLTemplates } from '../sqlTemplate'
import { describe, it, expect } from 'vitest'

describe('sqlTemplate', () => {
  it('contains valid SQL templates', () => {
    SQLTemplates.forEach((template) => {
      expect(template).toHaveProperty('title')
      expect(template).toHaveProperty('scene')
      expect(template).toHaveProperty('sql')
      expect(template).toHaveProperty('input')
      expect(template).toHaveProperty('outputs')

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
