import Papa from 'papaparse'
import { createI18n } from 'vue-i18n'
import { createDownloadBlobLink } from './download'

enum BatchSettingTypes {
  IoTDB = 'iotdb',
  TDengine = 'tdengine',
  InfluxDB = 'influxdb',
  Datalayers = 'datalayers',
}

export const useBatchSettings = (locale: 'zh' | 'en' = 'en') => {
  const i18n = createI18n({
    locale,
    messages: {
      en: {
        iotdbTemplateRemark:
          'Measurement, Value, and Data Type are required fields. The Data Type can have the optional values boolean, int32, int64, float, double, text.',
        invalidIsCharFlag: 'Invalid Char Value field: {isChar}',
        uploadMaxRowsError:
          'The number of rows in the CSV file exceeds the limit. Up to {max} rows of data are supported except for the header',
        influxdbTemplateRemark:
          'Append an i to the field value to tell InfluxDB to store the number as an integer.',
        datalayersTemplateRemark:
          'Append an i to the field value to tell Datalayers to store the number as an integer.',
      },
      zh: {
        iotdbTemplateRemark:
          '字段、值、数据类型是必填选项，数据类型可选的值为 boolean、int32、int64、float、double、text',
        invalidIsCharFlag: '无效的字符标识符值：{isChar}',
        uploadMaxRowsError: 'CSV 文件行数超过限制，除表头外，最多支持 {max} 行数据',
        influxdbTemplateRemark: '在字段值后追加 i，InfluxDB 则将该数值存储为整数类型。',
        datalayersTemplateRemark: '在字段值后追加 i，Datalayers 则将该数值存储为整数类型。',
      },
    },
  })
  const { t } = i18n.global

  const filenameMap = {
    [BatchSettingTypes.InfluxDB]: 'InfluxDB',
    [BatchSettingTypes.TDengine]: 'TDengine',
    [BatchSettingTypes.IoTDB]: 'IoTDB',
    [BatchSettingTypes.Datalayers]: 'Datalayers',
  }

  const templateContentMap = {
    [BatchSettingTypes.TDengine]: `Field,Value,Char Value,Remarks (Optional)
ts,now,FALSE,Example Remark
msgid,\${id},TRUE,
mqtt_topic,\${topic},TRUE,
qos,\${qos},FALSE,
temp,\${payload.temp},FALSE,
hum,\${payload.hum},FALSE,
status,\${payload.status},FALSE,
`,
    [BatchSettingTypes.IoTDB]: `Timestamp,Measurement,Data Type,Value,Remarks (Optional)
now,temp,float,\${payload.temp},"${t('iotdbTemplateRemark')}"
now,hum,float,\${payload.hum},
now,status,boolean,\${payload.status},
now,clientid,text,\${clientid},
`,
    [BatchSettingTypes.InfluxDB]: `Field,Value,Remarks (Optional)
temp,\${payload.temp},
hum,\${payload.hum},
precip,\${payload.precip}i,"${t('influxdbTemplateRemark')}"
`,
    [BatchSettingTypes.Datalayers]: `Field,Value,Remarks (Optional)
temp,\${payload.temp},
hum,\${payload.hum},
precip,\${payload.precip}i,"${t('datalayersTemplateRemark')}"
`,
  }

  const iotTableTemplateContent = `Column Category,Timestamp,Measurement,Data Type,Value,Remarks (Optional)
tag,now,temp,text,\${payload.temp},"${t('iotdbTemplateRemark')}"
field,now,hum,float,\${payload.hum},
attribute,now,status,string,\${payload.status},
attribute,now,clientid,string,\${clientid},
`

  const getTemplateContent = (type: BatchSettingTypes, isTable?: boolean) => {
    if (type === BatchSettingTypes.IoTDB) {
      return isTable ? iotTableTemplateContent : templateContentMap[BatchSettingTypes.IoTDB]
    }
    return templateContentMap[type]
  }

  /**
   * Processes TDengine data and returns a promise that resolves to a string.
   *
   * @param {string[][]} data - The TDengine data to be processed.
   * @returns {Promise<string>} - A promise that resolves to the generated SQL insert string.
   */
  const processTDengineData = (data: string[][]): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const tableName = '<table>'
        const fields = []
        const values = []
        for (let i = 1; i < data.length; i++) {
          const [field, value, isChar] = data[i]
          if (!field || !value) {
            continue
          }
          fields.push(field)
          const isCharValue = ['true', 'TRUE', '1', '', undefined].includes(isChar?.trim())
          const isNotCharValue = ['false', 'FALSE', '0'].includes(isChar?.trim())
          if (isCharValue) {
            values.push(`'${value}'`)
          } else if (isNotCharValue) {
            values.push(value)
          } else {
            throw new Error(t('invalidIsCharFlag', { isChar }))
          }
        }
        const result = `insert into ${tableName}(${fields.join(', ')}) values (${values.join(
          ', ',
        )})`
        resolve(result)
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * Processes IoTDB data and returns an array of records.
   * @param {string[][]} data - The IoTDB data to be processed.
   * @returns {Promise<Array<Record<string, any>>>} - A promise that resolves to an array of records.
   * @throws {Error} - If an invalid data type is encountered.
   */
  const processIoTDBData = (
    data: string[][],
    isTable?: boolean,
  ): Promise<Array<Record<string, any>>> => {
    return new Promise((resolve, reject) => {
      try {
        const validDataTypes = ['boolean', 'int32', 'int64', 'float', 'double', 'text']
        const validateType = (type: string) => validDataTypes.includes(type)
        const validColumnCategories = ['tag', 'field', 'attribute']
        const validateColumnCategory = (category: string) =>
          validColumnCategories.includes(category)

        const result = data
          .slice(1)
          .filter(
            (row) => row.length >= 4 && row.slice(0, 4).every((item) => item && item.trim() !== ''),
          )
          .map((row) => {
            if (isTable) {
              const [column_category, timestamp, measurement, data_type, value] = row
              // Check if data_type is valid
              if (!validateType(data_type)) {
                throw new Error(`Invalid data type: ${data_type}`)
              }
              // Check if column_category is valid
              if (!validateColumnCategory(column_category)) {
                throw new Error(`Invalid column category: ${column_category}`)
              }
              return {
                column_category,
                timestamp,
                measurement,
                data_type,
                value,
              }
            }
            const [timestamp, measurement, data_type, value] = row
            // Check if data_type is valid
            if (!validateType(data_type)) {
              throw new Error(`Invalid data type: ${data_type}`)
            }
            return {
              timestamp,
              measurement,
              data_type,
              value,
            }
          })

        resolve(result)
      } catch (error) {
        reject(error)
      }
    })
  }

  /**
   * Processes the InfluxDB data and returns a promise that resolves to an array of key-value pairs.
   * @param {string[][]} data - The InfluxDB data to be processed.
   * @returns {Promise<{ key: string; value: string }[]>} - A promise that resolves to an array of key-value pairs.
   */
  const processInfluxDBData = (data: string[][]): Promise<{ key: string; value: string }[]> => {
    return new Promise((resolve, reject) => {
      try {
        // Skip the first row and map each row to an object
        const result = [] as { key: string; value: string }[]
        for (let i = 1; i < data.length; i++) {
          const [key, value] = data[i]
          if (!key || !value) {
            continue
          }
          result.push({ key, value })
        }
        resolve(result)
      } catch (error) {
        reject(error)
      }
    })
  }

  const handleDownloadTemp = (template?: string, filename?: string) => {
    if (template) {
      const blob = new Blob([template], { type: 'text/csv' })
      createDownloadBlobLink(blob, `${filename}_template.csv`)
    } else {
      console.error('Template is empty')
    }
  }

  /**
   * Reads and parses a CSV file.
   * @param file The file to be read and parsed.
   * @returns A promise that resolves to a 2D array representing the CSV data.
   */
  const readFileAndParse = async (file: File, maxRows: number): Promise<string[][]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        if (!event.target) {
          return reject(new Error('FileReader event target is null'))
        }
        const csvData = event.target.result
        const results: any = Papa.parse(csvData as string, { skipEmptyLines: 'greedy' })
        if (results.errors.length > 0) {
          reject(new Error('Failed to parse CSV data: ' + results.errors[0].message))
        }
        if (results.data.length > maxRows + 1) {
          reject(new Error(t('uploadMaxRowsError', { max: maxRows })))
        } else {
          resolve(results.data)
        }
      }
      reader.onerror = () => {
        reject(new Error('An error occurred while reading the file'))
      }
      reader.onabort = () => {
        reject(new Error('File reading was aborted'))
      }
      reader.readAsText(file)
    })
  }

  return {
    filenameMap,
    templateContentMap,
    getTemplateContent,
    handleDownloadTemp,
    readFileAndParse,
    processIoTDBData,
    processTDengineData,
    processInfluxDBData,
  }
}
