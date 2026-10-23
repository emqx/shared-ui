import type { zhRuleSQL } from '../zh/ruleSQL'

export const zhTWRuleSQL = {
  generateSQLByAIBtn: 'SQL 生成器',
  generateSQLWithAI: '使用 AI 生成 SQL',
  taskDescPlaceholder: '請輸入自然語言的任務描述，例如："從 t/# 主題選擇所有欄位"',
  taskDesc: '任務描述',
  relatedTopics: '相關主題',
  relatedTopicsDesc:
    '支援單個主題，或多個主題（請使用逗號分隔，支援 +/#），例如："t/a" 或 "t/a, t/b/#, t/c/+/d"',
  relatedTopicsPlaceholder: '請輸入相關主題，例如："t/a" 或 "t/a, t/b/#, t/c/+/d"',
  sqlExampleInput: '輸入範例 (JSON)',
  sqlExampleInputDesc: '提供一個輸入訊息的 JSON 範例',
  sqlExampleOutput: '輸出範例 (JSON)',
  sqlExampleOutputDesc: '提供一個輸出結果的 JSON 範例',
  applySQL: '應用 SQL',
  generatedSQLOutputTitle: '生成的 SQL',
  generatedSQLOutputDesc: '請檢查 AI 生成的 SQL。可直接應用，或返回修改描述並重新生成。',
} satisfies Record<keyof typeof zhRuleSQL, string>
