export const jaFlow = {
  guideSourceNodeLabel: 'ソース',
  guideSourceNodeDesc: '複数のノードをドラッグしてメッセージとイベント入力を選択',
  guideProcessingNodeLabel: '処理（任意）',
  guideProcessingNodeDesc: 'ノードをドラッグしてデータを変換・フィルター',
  guideSinkNodeLabel: 'シンク',
  guideSinkNodeDesc: '複数のノードをドラッグして外部連携にデータを出力',
  guideFallbackNodeLabel: 'フォールバック（任意）',
  guideFallbackNodeDesc: 'ノードをドラッグしてフォールバックアクションとして設定します',
  actionAvailable: '利用可能',
  actionUnavailable: '利用不可',
  connecting: '接続中',
  inconsistent: 'クラスタ内のノードで不一致',
  disconnected: '切断',
  message: 'メッセージ',
  event: 'イベント',
  dataProcessing: 'データ処理',
  filter: 'フィルター',
  consoleOutput: 'Console Output', // TODO: ja
  republish: '再パブリッシュ（Republish）',
  condition: '条件',
  systemPrompt: 'システムメッセージ',
  consoleFallbackWrong: 'Console cannot be used as a fallback action', // TODO: ja
  incorrectConnection: '不正な接続',
  filterFunctionsWrongOrder:
    '関数ノードはフィルターノードより前に配置する必要があります。ノードの位置を調整してください。',
  flowEmptyError:
    '保存できません。フローには少なくとも1つのシンクノードと1つのソースノードが必要です。',
  flowIntegrityError: '保存できません。フローには少なくとも 1 つの{missing}ノードが必要です。',
  isolatedNodeError: 'フローに未接続のノードがあります。接続するか削除してください。',
  multipleFlowError: '一度に作成できるフローは1つだけです。',
  multipleFallbackWrong: 'フローは多段階のフォールバックアクションの編集をサポートしていません',
  incorrectInputOutputConnection:
    'すべてのソースノードが同じデータ処理ノードに正しく接続されていることを確認してください',
  incorrectOutputNodeConnection:
    'すべてのシンクノードが同じデータ処理ノードから出力されていることを確認してください',
  incorrectDefaultNodeConnection:
    'すべてのデータ処理ノードが開始から終了まで順に接続されていることを確認してください',
  decisionQuestionsRequired: '質問を少なくとも 1 つ追加してください。',
  decisionNameRequired: '質問名を入力してください。',
  decisionInstructionsRequired: 'すべての質問に指示を入力してください。',
  decisionDuplicateNames: '質問名は重複できません。',
  decisionChoicesRequired: '選択肢を少なくとも 1 つ追加してください。',
  decisionChoiceValueRequired: '選択肢の値は文字列または真偽値にしてください。',
  decisionDuplicateChoices: '選択肢の値は重複できません。',
  decisionLevelsRequired: '評価レベルを少なくとも 1 つ追加してください。',
  decisionLevelLabelRequired: 'すべての評価レベルにラベルを入力してください。',
  decisionInvalidQuestionType: '対応する質問の種類を選択してください。',
  input: '入力',
  systemPromptDesc:
    'システムメッセージ。AI モデルに期待どおりの出力を生成させるために使用します。例：入力 JSON データの数値キーの値を合計し、その結果のみを返す。',
  decisionQuestions: '質問',
  decisionType: '種類',
  decisionInstructions: '指示',
  decisionPredicate: '判定',
  decisionChoice: '選択',
  decisionScore: 'スコア',
  decisionChoices: '選択肢',
  decisionLevels: '評価レベル',
  decisionLabel: 'ラベル',
  decisionDescription: '説明（任意）',
  decisionValue: '値',
  decisionString: '文字列',
  decisionBoolean: '真偽値',
  decisionRemove: '削除',
  decisionAddChoice: '選択肢を追加',
  decisionAddLevel: 'レベルを追加',
  decisionAddQuestion: '質問を追加',
  decisionRemoveQuestion: '質問を削除',
  decisionMoveUp: '上へ移動',
  decisionMoveDown: '下へ移動',
  decisionLevelsHint:
    'レベルを低い順に並べてください。スコアには 0 から始まるレベルのインデックスを使用します。',
  model: 'モデル',
  maxTokens: '最大トークン数',
  anthropicVersion: 'Anthropic バージョン',
  apiKey: 'API キー',
  baseURL: 'ベース URL',
  // TODO: ja
  geminiBaseUrlTips:
    'This Gemini connection uses an OpenAI-compatible API. Please enter a compatible Base URL.',
  aiOutputAlias: '出力結果のエイリアス',
  aiOutputAliasDesc:
    '出力結果のエイリアス。アクションや後続処理で出力結果を参照するために使用します',
  decisionOutputHint:
    '出力は answers 配列を含む JSON 文字列で、確率、信頼度、拒否が含まれる場合があります。フィールドへのアクセス前にデコードしてください。失敗時の空の結果は、デコードする前に処理してください。',
  aliasDesc:
    'エイリアスに英数字とアンダースコア以外の文字が含まれる場合、数字で始まる場合、または SQL キーワードの場合は、エイリアスを二重引用符で囲んでください',
  // S - TODO: ja
  connectTimeout: 'Connect Timeout',
  recvTimeout: 'Receive Timeout',
  checkoutTimeout: 'Checkout Timeout',
  maxConn: 'Max Connections',
  maxConnectionsDesc: 'Maximum number of simultaneous connections to the AI provider.',
  checkoutTimeoutDesc:
    'Timeout for the checkout from connection pool for a request to the AI provider.',
  // E - TODO: ja
  confirm: '確認',
  baseURLDesc:
    'デフォルト値は {url} です。{name} API 形式と互換性のある任意のベース URL を使用することもできます。',
}
