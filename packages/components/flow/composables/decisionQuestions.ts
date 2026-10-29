import { DecisionQuestionType, type DecisionQuestion } from '../types'

export type DecisionValidationCode =
  | 'decisionQuestionsRequired'
  | 'decisionNameRequired'
  | 'decisionInstructionsRequired'
  | 'decisionDuplicateNames'
  | 'decisionChoicesRequired'
  | 'decisionChoiceValueRequired'
  | 'decisionDuplicateChoices'
  | 'decisionLevelsRequired'
  | 'decisionLevelLabelRequired'
  | 'decisionInvalidQuestionType'

/** Return the first violation of the backend Decisions schema. Boolean false is a valid choice. */
export const validateDecisionQuestions = (
  questions: DecisionQuestion[],
): DecisionValidationCode | undefined => {
  if (!questions?.length) return 'decisionQuestionsRequired'
  const names = new Set<string>()
  for (const question of questions) {
    if (!question.name) return 'decisionNameRequired'
    if (!question.instructions) return 'decisionInstructionsRequired'
    if (names.has(question.name)) return 'decisionDuplicateNames'
    names.add(question.name)
    if (question.type === DecisionQuestionType.Choice) {
      if (!question.choices?.length) return 'decisionChoicesRequired'
      const values = question.choices.map(({ value }) => value)
      if (values.some((value) => typeof value !== 'string' && typeof value !== 'boolean'))
        return 'decisionChoiceValueRequired'
      if (new Set(values).size !== values.length) return 'decisionDuplicateChoices'
    } else if (question.type === DecisionQuestionType.Score) {
      if (!question.levels?.length) return 'decisionLevelsRequired'
      if (question.levels.some((level) => !level.label)) return 'decisionLevelLabelRequired'
    } else if (question.type !== DecisionQuestionType.Predicate) {
      return 'decisionInvalidQuestionType'
    }
  }
}
