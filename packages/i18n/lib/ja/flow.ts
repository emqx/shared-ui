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
}
