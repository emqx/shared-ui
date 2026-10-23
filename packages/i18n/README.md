# Shared UI i18n

Traditional Chinese data integration resources are available through an optional
subpath. They are not re-exported by the root entry, so existing consumers do not
load these resources. The npm archive includes both entries.

```ts
import {
  zhTWConnectorsLabel,
  zhTWActionsLabel,
  zhTWIntegrationDesc,
  zhTWSymbolLabel,
} from '@emqx/shared-ui-i18n/zh-TW/integration'
```

The first three exports use the same type/field structure as the corresponding
Simplified Chinese resources; symbol labels are a flat key/value map. Register
them with the application's own i18n instance. Merge connector labels first,
action labels second, then application overrides. Merge description overrides
after shared descriptions. Avoid mutating the exported objects when merging.

Keep Traditional Chinese keys aligned with the corresponding files in lib/zh.
Preserve placeholders, code snippets and technical identifiers when translating.
Application-specific wording belongs in the consuming project's overrides.

AI SQL generator resources use a separate optional entry:

```ts
import { zhTWRuleSQL } from '@emqx/shared-ui-i18n/zh-TW/ruleSQL'
```

Register this dictionary under the application's ruleSQL namespace, alongside
enRuleSQL and zhRuleSQL from the root entry. Its keys match those dictionaries.

Built-in function resources are also optional:

```ts
import { zhTWRuleFunction } from '@emqx/shared-ui-i18n/zh-TW/ruleFunction'

app.use(FlowComponents, {
  locale: 'zh-TW',
  messages: { ruleFunction: zhTWRuleFunction },
})
```

Flow's messages option accepts additional common and flow dictionaries. Resources
are selected by the consumer, so default component and utility imports do not
include Traditional Chinese dictionaries. Missing zh-TW entries fall back to
English, without implicitly using Simplified Chinese. Existing en/zh/ja consumers
continue to use the built-in dictionaries.

Flow labels and validation messages have their own optional entry:

```ts
import { zhTWFlow } from '@emqx/shared-ui-i18n/zh-TW/flow'

app.use(FlowComponents, {
  locale: 'zh-TW',
  messages: { flow: zhTWFlow, ruleFunction: zhTWRuleFunction },
})
```

This dictionary covers all keys in zhFlow, including node status and AI connection
settings. Add application-specific Flow messages separately when registering the
application's own i18n instance.
