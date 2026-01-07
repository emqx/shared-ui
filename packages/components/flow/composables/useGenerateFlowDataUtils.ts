import { type CSSProperties } from 'vue'
import {
  AIProviderType,
  DEFAULT_SELECT,
  ENCRYPTED_PASSWORD,
  EditedWay,
  FlowNodeType,
  FrontendSourceType,
  GEMINI_DEFAULT_BASE_URL,
  NodeType,
  ProcessingType,
  RULE_INPUT_BRIDGE_TYPE_PREFIX,
  RULE_INPUT_EVENT_PREFIX,
  aiExpressionPartReg,
  isForeachReg,
  AI_PLACEHOLDER_TYPE,
  FALLBACK_EDGE_STYLE,
} from '@emqx/shared-ui-constants'
import {
  trimSpacesAndLFs,
  splitOnComma,
  ruleSelectionAliasPartReg,
  getRuleSelectionAlias,
  judgeRuleSelectionWithFunc,
  getBridgeTypeFromId,
  getBridgeIdFromInput,
  getBridgeNameFromId,
  getKeyPartsFromSQL,
  createRandomString,
} from '@emqx/shared-ui-utils'
import { escapeRegExp, isUndefined, omit } from 'lodash'
import ELK from 'elkjs/lib/elk.bundled'
import { Edge, type Node } from '@vue-flow/core'
import type {
  AICompletionProfile,
  AIProviderForm,
  FilterFormData,
  FunctionItem,
  GroupedNode,
} from '../types'
import {
  createEventForm,
  createFilterFormData,
  createFunctionItem,
  createMessageForm,
} from './useNodeForm'
import { useRuleFunc, type ArgItem } from './useRuleFunc'
import useParseWhere from './useParseWhere'
import useFlowNode from './useFlowNode'

interface CommonRule {
  from: Array<string>
  sql: string
  id: string
}

export default (): {
  detectInputType: (from: string) => string
  detectFieldsExpressionsEditedWay: (functionForm: Array<FunctionItem>) => EditedWay
  detectWhereDataEditedWay: (filterForm: FilterFormData) => EditedWay
  detectWhereSqlEditedWay: (whereSql: string) => EditedWay
  generateFunctionFormFromExpression: (expression: string) => Array<FunctionItem> | undefined
  addAIRecordToAINode: (
    node: Node,
    provider?: AIProviderForm,
    completion?: AICompletionProfile,
  ) => Node
  generateFallbackEdge: (source: Node, target: Node, style?: Record<string, string>) => Edge
  countNodesPosition: (nodes: GroupedNode, edgeArr: Array<Edge>) => Promise<void>
  isRemovedBridge: (node: Node) => boolean
  addFlagToRemovedBridgeNode: (node: Node) => Node
  addFlagToRemovedAINode: (node: Node) => Node
  addFallbackFlagToNodes: (nodes: Array<Node>) => Array<Node>
  generateEdgesFromNodes: (nodes: GroupedNode) => Array<Edge>
  createInitNodes: () => GroupedNode
  generateNodesBaseRuleFrom: (
    fromArr: Array<string>,
    getTypeLabel: (type: string) => string,
    getNodeInfo: (node: Node) => string,
    getSpecificType: (type: string) => string,
  ) => Array<Node>
  generateEdgeFromTwoNodes: (source: Node, target: Node, style?: CSSProperties) => Edge
  newFlowDataFromRuleItem: (
    commonRule: CommonRule,
    getSourceNodes: () => Array<Node>,
    getSinkNodes: () => Array<Node>,
  ) => {
    nodes: GroupedNode
    edges: Edge[]
  }
} => {
  const { getFuncGroupByName, getFuncItemByName, getArgIndex } = useRuleFunc()
  const { detectFilterFormLevel, generateFilterForm } = useParseWhere()
  const {
    nodeWidth,
    getNodeHeight,
    getTypeCommonData,
    getCommonTypeLabel,
    getNodeInfoFunc,
    isAIType,
    isBridgerNode,
  } = useFlowNode()

  /* FIELDS */
  const countArgsWhenLengthNotMatch = (
    functionParamTemplate: Array<ArgItem>,
    actualParams: Array<string>,
  ) => {
    let startIndex = -1
    return functionParamTemplate.map((item, index) => {
      if (item.required && startIndex < 0) {
        startIndex = index
      }
      const argIndex = index - startIndex
      return startIndex > -1 && actualParams[argIndex] !== undefined ? actualParams[argIndex] : ''
    })
  }

  /**
   * Because the subbits parameter is special, it is handled specially.
   * https://docs.emqx.com/en/enterprise/v5.1/data-integration/rule-sql-builtin-functions.html#bit-functions
   */
  const countActualArgsForSubbits = (actualParams: Array<string>): Array<string> => {
    return actualParams.length === 2 ? [actualParams[0], '', actualParams[1]] : actualParams
  }

  const strArgReg = /^'.*'$/
  const getFuncDataFromExpression = (
    expression: string,
  ): { field: string; func: { name: string; args: Array<string | number> } } | undefined => {
    const funcName = expression.slice(0, expression.indexOf('('))
    const funcGroup = getFuncGroupByName(funcName)
    const funcItem = getFuncItemByName(funcName)
    if (!funcGroup || !funcItem) {
      console.error(`can not find function ${funcName}`)
      return
    }
    const argIndex = getArgIndex(funcItem, funcGroup)
    const argsContent = expression.slice(expression.indexOf('(') + 1, expression.lastIndexOf(')'))
    let funcArgs = splitOnComma(argsContent).map((item) => item.trim())

    if (funcName === 'subbits') {
      funcArgs = countActualArgsForSubbits(funcArgs)
    }
    let argStrArr: Array<string> = []
    if (funcArgs.length !== funcItem.args.length) {
      argStrArr = countArgsWhenLengthNotMatch(funcItem.args, funcArgs)
    } else {
      argStrArr = funcArgs
    }
    const args = argStrArr.reduce(
      (result: Array<string | number>, argItem: string, index: number) => {
        const argInfo = funcItem.args?.[index]
        const isStringType =
          argInfo?.type === 'string' ||
          (argInfo?.type === 'enum' &&
            typeof argInfo?.optionalValues?.find(
              (enumItem) => enumItem === argItem.slice(1, -1),
            ) === 'string')
        const argResult = strArgReg.test(argItem) && isStringType ? argItem.slice(1, -1) : argItem
        result.push(argResult)
        return result
      },
      [],
    )
    return { func: { name: funcName, args }, field: argStrArr[argIndex].toString() }
  }

  const generateFunctionFormItemFromExpression = (expressionItem: string): FunctionItem => {
    const form = createFunctionItem()
    const alias = getRuleSelectionAlias(expressionItem)
    if (!isUndefined(alias)) {
      form.alias = alias
    }

    const selection = expressionItem.replace(ruleSelectionAliasPartReg, '')

    if (judgeRuleSelectionWithFunc(selection)) {
      const funcData = getFuncDataFromExpression(selection)
      if (funcData) {
        return { ...form, ...funcData }
      }
    }
    return { ...form, field: selection }
  }

  const generateFunctionFormFromExpression = (expression: string) => {
    if (trimSpacesAndLFs(expression) === DEFAULT_SELECT) {
      return
    }
    const expressionArr = splitOnComma(expression).map((item) => trimSpacesAndLFs(item))
    const formData = expressionArr.map((item) => generateFunctionFormItemFromExpression(item))
    return formData
  }

  const fieldWithFuncReg = /.*\(.*\).*/
  const detectFieldsExpressionsEditedWay = (functionForm: FunctionItem[]) => {
    const containsUnprocessedFields = functionForm.some(
      ({ field }) => fieldWithFuncReg.test(field) || isForeachReg.test(field),
    )
    return containsUnprocessedFields ? EditedWay.SQL : EditedWay.Form
  }
  const aiExpressionReg = new RegExp(`^${aiExpressionPartReg.source}$`, 'i')

  /**
   * normal_expression1, normal_expression2, ai_expression1, ai_expression2, normal_expression3, normal_expression4 =>
   * [normal_expression1, normal_expression2], [ai_expression1, ai_expression2], [normal_expression3, normal_expression4]
   */
  const chunkExpressionArr = (expressionArr: Array<string>) => {
    return expressionArr.reduce((acc: Array<Array<string>>, item) => {
      let isSameWithLastChunk = false
      const lastChunk = acc[acc.length - 1]
      if (lastChunk) {
        const isLastChunkAI = aiExpressionReg.test(lastChunk[lastChunk.length - 1])
        const isCurrentItemAI = aiExpressionReg.test(item)
        isSameWithLastChunk = isLastChunkAI === isCurrentItemAI
      }
      if (isSameWithLastChunk) {
        lastChunk.push(item)
      } else {
        acc.push([item])
      }
      return acc
    }, [])
  }
  const generateNodeBaseNormalFieldExpressions = (fieldExpressions: string): Node | undefined => {
    const formData = generateFunctionFormFromExpression(fieldExpressions)
    if (!formData) {
      return
    }
    const editedWay = detectFieldsExpressionsEditedWay(formData)
    const node = {
      id: createRandomString(),
      ...getTypeCommonData(NodeType.Processing),
      label: getCommonTypeLabel(ProcessingType.Function),
      position: { x: 0, y: 0 },
      data: {
        specificType: ProcessingType.Function,
        formData: {
          editedWay,
          sql: fieldExpressions,
          form: formData,
        },
        desc: '',
      },
    }
    node.data.desc = getNodeInfoFunc(node)
    return node
  }
  const generateNodeBaseAIFieldExpression = (fieldExpression: string): Node | undefined => {
    const match = fieldExpression.match(aiExpressionReg)
    if (!match?.groups) {
      return
    }
    const { name, alias, input } = match.groups
    const node = {
      id: createRandomString(),
      ...getTypeCommonData(NodeType.Processing),
      label: name,
      position: { x: 0, y: 0 },
      data: {
        specificType: AI_PLACEHOLDER_TYPE,
        formData: {
          input,
          name,
          alias,
        },
        desc: '',
      },
    }
    return node
  }
  /**
   * @returns function node and ai nodes
   */
  const generateNodesBaseFieldsExpressions = (fieldsExpressions: string) => {
    const expressionArr = splitOnComma(fieldsExpressions).map((item) => trimSpacesAndLFs(item))
    const chunkedExpressionArr = chunkExpressionArr(expressionArr)
    const nodes: Array<Node> = []
    chunkedExpressionArr.forEach((expressionArr) => {
      const isAI = aiExpressionReg.test(expressionArr[expressionArr.length - 1])
      if (isAI) {
        nodes.push(
          ...(expressionArr
            .map((expression) => generateNodeBaseAIFieldExpression(expression))
            .filter(Boolean) as Array<Node>),
        )
      } else {
        const normalNode = generateNodeBaseNormalFieldExpressions(expressionArr.join(','))
        if (normalNode) {
          nodes.push(normalNode)
        }
      }
    })
    return nodes
  }

  const aiNodeSpecificTypeMap = new Map([
    [AIProviderType.OpenAI, ProcessingType.AIOpenAI],
    [AIProviderType.Anthropic, ProcessingType.AIAnthropic],
  ])

  const geminiModelReg = /gemini|gemma/
  const getAiNodeSpecificType = (
    provider: AIProviderForm,
    completion: AICompletionProfile,
  ): string => {
    if (provider.type === AIProviderType.OpenAI) {
      const isGeminiModel = completion.model && geminiModelReg.test(completion.model)
      const isGeminiBaseUrl = provider.base_url === GEMINI_DEFAULT_BASE_URL
      if (isGeminiModel || isGeminiBaseUrl) {
        return ProcessingType.AIGemini
      }
    }
    return aiNodeSpecificTypeMap.get(provider.type) ?? ''
  }

  const addAIRecordToAINode = (
    node: Node,
    provider?: AIProviderForm,
    completion?: AICompletionProfile,
  ) => {
    if (isAIType(node.data.specificType) && provider && completion) {
      const nodeType = getAiNodeSpecificType(provider, completion)
      node.label = getCommonTypeLabel(nodeType)
      node.data.specificType = nodeType
      node.data.formData = {
        ...node.data.formData,
        ...provider,
        ...omit(completion, ['name', 'type']),
        api_key: ENCRYPTED_PASSWORD,
      }
      node.data.isCreated = true
      node.data.desc = getNodeInfoFunc(node)
    }
    return node
  }

  /* SOURCE */
  const eventInputReg = new RegExp(`^${escapeRegExp(RULE_INPUT_EVENT_PREFIX)}`)
  const bridgeInputReg = new RegExp(`^${escapeRegExp(RULE_INPUT_BRIDGE_TYPE_PREFIX)}`)
  /**
   * @returns If the returned type is a bridge type, it is a specific bridge type
   */
  const detectInputType = (from: string): string => {
    if (eventInputReg.test(from)) {
      return FrontendSourceType.Event
    }
    // now has mqtt & http
    if (bridgeInputReg.test(from)) {
      return getBridgeTypeFromId(from.replace(RULE_INPUT_BRIDGE_TYPE_PREFIX, ''))
    }
    return FrontendSourceType.Message
  }

  const getFormDataByType = (type: string, value: string) => {
    if (type === FrontendSourceType.Event) {
      return createEventForm(value)
    } else if (type === FrontendSourceType.Message) {
      return createMessageForm(value)
    }
    const bridgeId = getBridgeIdFromInput(value)
    return { name: getBridgeNameFromId(bridgeId), id: bridgeId }
  }

  /**
   * generate input node
   * - Message
   * - Event
   * - Bridge
   */
  const generateNodesBaseRuleFrom = (
    fromArr: Array<string>,
    getTypeLabel: (type: string) => string,
    getNodeInfo: (node: Node) => string,
    getSpecificType: (type: string) => string,
  ) => {
    return fromArr.reduce((arr: Array<Node>, fromItem): Array<Node> => {
      const type = detectInputType(fromItem)
      const formData = getFormDataByType(type, fromItem)

      const specificType = getSpecificType(type)
      const node = {
        id: createRandomString(),
        ...getTypeCommonData(NodeType.Source),
        label: getTypeLabel(specificType),
        position: { x: 0, y: 0 },
        data: { specificType, formData, desc: '' },
      }
      node.data.desc = getNodeInfo(node)
      arr.push(node)
      return arr
    }, [])
  }

  /* WHERE */

  const detectWhereDataEditedWay = (filterForm: FilterFormData) =>
    detectFilterFormLevel(filterForm) > 2 ? EditedWay.SQL : EditedWay.Form
  const detectWhereSqlEditedWay = (whereSql: string) => {
    try {
      const form = generateFilterForm(whereSql)
      return detectWhereDataEditedWay(form)
    } catch (error) {
      return EditedWay.SQL
    }
  }

  /**
   * generate filter node
   */
  const generateNodeBaseWhereData = (whereStr: string): Node => {
    // !!! If the filter form data cannot be created correctly, it will create an empty form
    let filterForm = createFilterFormData()
    let editedWay = EditedWay.Form
    try {
      filterForm = generateFilterForm(whereStr)
      editedWay = detectWhereSqlEditedWay(whereStr)
    } catch (error) {
      editedWay = EditedWay.SQL
    }
    const node = {
      id: createRandomString(),
      ...getTypeCommonData(NodeType.Processing),
      label: getCommonTypeLabel(ProcessingType.Filter),
      position: { x: 0, y: 0 },
      data: {
        specificType: ProcessingType.Filter,
        formData: {
          editedWay,
          sql: whereStr,
          form: filterForm,
        },
        desc: '',
      },
    }
    node.data.desc = getNodeInfoFunc(node)
    return node
  }

  /* RULE */
  const createInitNodes = (): GroupedNode => ({
    [NodeType.Source]: [],
    [ProcessingType.Function]: [],
    [ProcessingType.Filter]: [],
    [NodeType.Sink]: [],
    [NodeType.Fallback]: [],
  })

  /**
   * Generate message, event, filter, and function nodes based on the SQL of the rule.
   * Generate bridge, console, and republish nodes based on the actions.
   * And the corresponding edges.
   */
  const newFlowDataFromRuleItem = (
    commonRule: CommonRule,
    getSourceNodes: () => Array<Node>,
    getSinkNodes: () => Array<Node>,
  ): { nodes: GroupedNode; edges: Edge[] } => {
    const { from, sql } = commonRule
    const nodes: GroupedNode = createInitNodes()
    // If the rule is a webhook and the input is "all messages and events",
    // create an "all messages and events node".
    const { fieldStr, whereStr } = getKeyPartsFromSQL(sql)

    if (from && from.length > 0) {
      nodes[NodeType.Source] = getSourceNodes()
    }
    if (fieldStr !== undefined) {
      const processingNodes = generateNodesBaseFieldsExpressions(fieldStr)
      if (processingNodes) {
        nodes[ProcessingType.Function].push(...processingNodes)
      }
    }
    if (whereStr !== undefined) {
      nodes[ProcessingType.Filter].push(generateNodeBaseWhereData(whereStr))
    }
    nodes[NodeType.Sink] = getSinkNodes()
    const edges: Array<Edge> = generateEdgesFromNodes(nodes)
    return { nodes, edges }
  }

  const generateEdgeId = (source: Node, target: Node) => `${source.id}-${target.id}`
  const generateEdgeFromTwoNodes = (source: Node, target: Node, style = {}): Edge => ({
    id: generateEdgeId(source, target),
    source: source.id,
    target: target.id,
    style,
  })

  /* ACTIONS */
  const generateFallbackEdge = (source: Node, target: Node) =>
    generateEdgeFromTwoNodes(source, target, FALLBACK_EDGE_STYLE)
  const addFallbackFlagToNodes = (nodes: Array<Node>) => {
    nodes.forEach((node) => {
      node.data.isFallback = true
    })
    return nodes
  }

  /* EDGES */
  const generateEdgesFromNodes = (nodes: GroupedNode): Array<Edge> => {
    const keys: Array<keyof GroupedNode> = [
      NodeType.Source,
      ProcessingType.Function,
      ProcessingType.Filter,
      NodeType.Sink,
    ]
    const result: Edge[] = []
    const withMultipleFunctionNodes = nodes[ProcessingType.Function].length > 1

    for (let i = 0; i < keys.length - 1; i++) {
      const currentKey: keyof GroupedNode = keys[i]

      let nextKeyIndex = i + 1
      let nextKey: keyof GroupedNode = keys[nextKeyIndex]

      if (nodes[currentKey]?.length === 0) continue

      while (nodes[nextKey]?.length === 0 && i < keys.length - 2) {
        nextKeyIndex += 1
        nextKey = keys[nextKeyIndex]
      }
      const notNeedToConnectEachPrevAndNext =
        withMultipleFunctionNodes && [currentKey, nextKey].includes(ProcessingType.Function)
      if (nodes[currentKey] && nodes[nextKey]) {
        const nextNodes = nodes[nextKey] ?? []
        for (let i = 0; i < nodes[currentKey].length; i++) {
          const cur = nodes[currentKey][i]
          if (
            notNeedToConnectEachPrevAndNext &&
            currentKey === ProcessingType.Function &&
            i !== nodes[currentKey].length - 1
          ) {
            continue
          }
          for (let j = 0; j < nextNodes.length; j++) {
            const nex = nextNodes[j]
            result.push(generateEdgeFromTwoNodes(cur, nex))
            if (notNeedToConnectEachPrevAndNext && currentKey === NodeType.Source) {
              break
            }
          }
        }
      }
      if (withMultipleFunctionNodes && currentKey === ProcessingType.Function) {
        for (let i = 0; i < nodes[currentKey].length - 1; i++) {
          const cur = nodes[currentKey][i]
          const nex = nodes[currentKey][i + 1]
          result.push(generateEdgeFromTwoNodes(cur, nex))
        }
      }
    }
    return result
  }

  /* NODE POSITION */
  const convertEdgeToElkEdge = (edge: Edge) => ({
    ...edge,
    sources: [edge.source],
    targets: [edge.target],
  })

  const convertNodeToElkNode = (node: Node) => {
    let layoutOptions = {}
    if (node.type === FlowNodeType.Input) {
      layoutOptions = {
        'elk.layered.layering.layerConstraint': 'FIRST',
      }
    }
    const nodeHeight = getNodeHeight(node.data?.specificType)
    return {
      ...node,
      layoutOptions,
      width: nodeWidth,
      height: nodeHeight,
    }
  }
  const elk = new ELK()
  /**
   * count nodes position view all flows
   */
  const countComponentNodesPosition = async (nodes: GroupedNode, edgeArr: Array<Edge>) => {
    try {
      const allNodes = Object.values(nodes).flat()
      const { children } = await elk.layout({
        id: 'root',
        layoutOptions: {
          'elk.algorithm': 'layered',
          'elk.layered.spacing.nodeNodeBetweenLayers': '60',
          'elk.spacing.edgeNode': '50',
          'elk.edgeRouting': 'POLYLINE',
        },
        children: allNodes.map(convertNodeToElkNode),
        edges: edgeArr.map(convertEdgeToElkEdge),
      })
      allNodes.forEach((node) => {
        const resultNode = children?.find((item) => item.id === node.id)
        if (resultNode) {
          const { x, y } = resultNode
          node.position = { x: x ?? 0, y: y ?? 0 }
        }
      })
    } catch (error) {
      console.error(error)
    }
  }

  const getConnectedComponents = (nodeIds: string[], edges: Array<Edge>): Array<Array<string>> => {
    const adjacency = new Map<string, Set<string>>()
    nodeIds.forEach((id) => adjacency.set(id, new Set()))
    edges.forEach(({ source, target }) => {
      if (!adjacency.has(source) || !adjacency.has(target)) {
        return
      }
      adjacency.get(source)?.add(target)
      adjacency.get(target)?.add(source)
    })

    const visited = new Set<string>()
    const components: Array<Array<string>> = []

    for (const id of nodeIds) {
      if (visited.has(id)) {
        continue
      }
      const queue: Array<string> = [id]
      visited.add(id)
      const comp: Array<string> = []
      while (queue.length) {
        const cur = queue.shift() as string
        comp.push(cur)
        const neighbors = adjacency.get(cur)
        if (!neighbors) {
          continue
        }
        neighbors.forEach((next) => {
          if (!visited.has(next)) {
            visited.add(next)
            queue.push(next)
          }
        })
      }
      components.push(comp)
    }
    return components
  }

  /**
   * Objective: Place each flow (connected component) on its own line to avoid mixing.
   * Method: Split by connected components, run the shared ELK layout for each, and then stack them vertically using y-offsets.
   */
  const countNodesPosition = async (nodes: GroupedNode, edgeArr: Array<Edge>) => {
    const allNodes = Object.values(nodes).flat().filter(Boolean) as Array<Node>
    if (!allNodes.length) {
      return
    }

    const idSet = new Set(allNodes.map(({ id }) => id))
    const edges = edgeArr.filter(({ source, target }) => idSet.has(source) && idSet.has(target))

    const components = getConnectedComponents([...idSet], edges)

    const rowGap = 20
    let yOffset = 0

    for (const comp of components) {
      const compSet = new Set(comp)
      const compNodes: GroupedNode = {
        [NodeType.Source]: (nodes[NodeType.Source] ?? []).filter((n) => compSet.has(n.id)),
        [ProcessingType.Filter]: (nodes[ProcessingType.Filter] ?? []).filter((n) =>
          compSet.has(n.id),
        ),
        [ProcessingType.Function]: (nodes[ProcessingType.Function] ?? []).filter((n) =>
          compSet.has(n.id),
        ),
        [NodeType.Sink]: (nodes[NodeType.Sink] ?? []).filter((n) => compSet.has(n.id)),
        [NodeType.Fallback]: (nodes[NodeType.Fallback] ?? []).filter((n) => compSet.has(n.id)),
      }
      const compEdges = edges.filter(
        ({ source, target }) => compSet.has(source) && compSet.has(target),
      )

      await countComponentNodesPosition(compNodes, compEdges)

      const laidOutNodes = Object.values(compNodes).flat().filter(Boolean) as Array<Node>
      if (!laidOutNodes.length) {
        continue
      }

      let minX = Number.POSITIVE_INFINITY
      let minY = Number.POSITIVE_INFINITY
      let maxY = Number.NEGATIVE_INFINITY

      laidOutNodes.forEach((node) => {
        const x = node.position?.x ?? 0
        const y = node.position?.y ?? 0
        minX = Math.min(minX, x)
        minY = Math.min(minY, y)
        const specificType = node.data?.specificType ?? undefined
        const h = getNodeHeight(specificType) ?? 66
        maxY = Math.max(maxY, y + h)
      })

      laidOutNodes.forEach((node) => {
        const x = (node.position?.x ?? 0) - (Number.isFinite(minX) ? minX : 0)
        const y = (node.position?.y ?? 0) - (Number.isFinite(minY) ? minY : 0) + yOffset
        node.position = { x, y }
      })

      const compHeight = (Number.isFinite(maxY) ? maxY : 0) - (Number.isFinite(minY) ? minY : 0)
      yOffset += Math.max(compHeight, 0) + rowGap
    }
  }

  const isRemovedBridge = (node: Node) =>
    isBridgerNode(node) && Object.keys(node.data?.formData || {}).length < 3

  /* BRIDGE */
  /**
   * if is remove bridge, add flag and class
   */
  const addFlagToRemovedBridgeNode = (node: Node) => {
    if (isRemovedBridge(node)) {
      node.class = (node.class || '') + ' is-disabled'
      node.data.isRemoved = true
    }
    return node
  }

  const isRemovedAINode = (node: Node) => {
    if (isAIType(node.data.specificType)) {
      return !node.data.formData.system_prompt
    }
    return false
  }
  const addFlagToRemovedAINode = (node: Node) => {
    if (isRemovedAINode(node)) {
      node.class = (node.class || '') + ' is-disabled'
      node.data.isRemoved = true
    }
    return node
  }

  return {
    detectInputType,
    detectFieldsExpressionsEditedWay,
    detectWhereDataEditedWay,
    detectWhereSqlEditedWay,
    generateFunctionFormFromExpression,
    addAIRecordToAINode,
    generateFallbackEdge,
    countNodesPosition,
    isRemovedBridge,
    addFlagToRemovedBridgeNode,
    addFlagToRemovedAINode,
    addFallbackFlagToNodes,
    generateEdgesFromNodes,
    createInitNodes,
    generateNodesBaseRuleFrom,
    generateEdgeFromTwoNodes,
    newFlowDataFromRuleItem,
  }
}
