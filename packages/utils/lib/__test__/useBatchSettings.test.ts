import { describe, it, expect, vi } from 'vitest'
import { useBatchSettings } from '../useBatchSettings'

describe('useBatchSettings', () => {
  const {
    filenameMap,
    templateContentMap,
    handleDownloadTemp,
    readFileAndParse,
    processIoTDBData,
    processTDengineData,
    processInfluxDBData,
  } = useBatchSettings()

  describe('filenameMap', () => {
    it('should have the correct format', () => {
      Object.keys(filenameMap).forEach((key) => {
        expect(typeof key).toBe('string')
        expect(typeof filenameMap[key]).toBe('string')
      })
    })
  })

  describe('templateContentMap', () => {
    it('should have the correct format', () => {
      Object.keys(templateContentMap).forEach((key) => {
        expect(typeof key).toBe('string')
        expect(typeof templateContentMap[key]).toBe('string')
      })
    })
  })

  describe('handleDownloadTemp', () => {
    it('should generate correct blob', () => {
      const blob = new Blob(['test template'], { type: 'text/csv' })
      const fakeURL = 'http://fakeurl.com/blob'
      const createObjectURL = vi.fn(() => fakeURL)
      const revokeObjectURL = vi.fn(() => {})

      window.URL.createObjectURL = createObjectURL
      window.URL.revokeObjectURL = revokeObjectURL

      handleDownloadTemp('test template', 'test.csv')
      expect(createObjectURL).toHaveBeenCalledWith(blob)
      expect(revokeObjectURL).toHaveBeenCalledWith(fakeURL)
    })

    it('should log an error if the template is empty', () => {
      console.error = vi.fn()
      handleDownloadTemp()
      expect(console.error).toHaveBeenCalledWith('Template is empty')
    })
  })

  describe('readFileAndParse', () => {
    it('should parse CSV file correctly', async () => {
      const file = new File(['1,2,3\n4,5,6'], 'test.csv', { type: 'text/csv' })
      const maxRows = 10
      const expectedData = [
        ['1', '2', '3'],
        ['4', '5', '6'],
      ]

      const result = await readFileAndParse(file, maxRows)
      expect(result).toEqual(expectedData)
    })

    it('should reject with an error if failed to parse CSV data', async () => {
      const file = new File(['Name,Age\nJohn,30\n,40\nAlice'], 'test.csv', { type: 'text/csv' })
      const maxRows = 10

      const result = readFileAndParse(file, maxRows)
      await expect(result).rejects.toThrow('Failed to parse CSV data')
    })

    it('should reject with an error if the number of rows exceeds the maximum limit', async () => {
      const file = new File(['1,2,3\n4,5,6\n7,8,9'], 'test.csv', { type: 'text/csv' })
      const maxRows = 1

      const result = readFileAndParse(file, maxRows)
      await expect(result).rejects.toThrow(
        'The number of rows in the CSV file exceeds the limit. Up to 1 rows of data are supported except for the header',
      )
    })
  })

  describe('processIoTDBData', () => {
    it('should process IoTDB data correctly', async () => {
      const data = [
        ['timestamp', 'measurement', 'data_type', 'value'],
        ['2022-01-01', 'temperature', 'float', '25.5'],
        ['2022-01-02', 'humidity', 'int32', '60'],
      ]
      const expectedOutput = [
        {
          timestamp: '2022-01-01',
          measurement: 'temperature',
          data_type: 'float',
          value: '25.5',
        },
        {
          timestamp: '2022-01-02',
          measurement: 'humidity',
          data_type: 'int32',
          value: '60',
        },
      ]

      const result = await processIoTDBData(data)
      expect(result).toEqual(expectedOutput)
    })

    it('should throw an error for invalid data type', async () => {
      const data = [
        ['timestamp', 'measurement', 'data_type', 'value'],
        ['2022-01-01', 'temperature', 'INVALID', '25.5'],
      ]

      await expect(processIoTDBData(data)).rejects.toThrow('Invalid data type: INVALID')
    })
  })

  describe('processTDengineData', () => {
    it('should process TDengine data correctly', async () => {
      const data = [
        ['field', 'value', 'isChar'],
        ['field1', 'value1', 'true'],
        ['field2', 'value2', 'false'],
      ]
      const expectedOutput = "insert into <table>(field1, field2) values ('value1', value2)"

      const result = await processTDengineData(data)
      expect(result).toEqual(expectedOutput)
    })

    it('should skip empty field or value', async () => {
      const data = [
        ['field', 'value', 'isChar'],
        ['', 'value1', 'true'],
        ['field1', '', 'true'],
        ['field2', 'value2', 'false'],
      ]
      const expectedOutput = 'insert into <table>(field2) values (value2)'

      const result = await processTDengineData(data)
      expect(result).toEqual(expectedOutput)
    })

    it('should throw an error for invalid isChar flag', async () => {
      const data = [
        ['field', 'value', 'isChar'],
        ['field1', 'value1', 'invalid'],
      ]

      await expect(processTDengineData(data)).rejects.toThrow('Invalid Char Value field: invalid')
    })
  })

  describe('processInfluxDBData', () => {
    it('should process InfluxDB data correctly', async () => {
      const data = [
        ['key', 'value'],
        ['temperature', '25.5'],
        ['humidity', '60'],
      ]
      const expectedOutput = [
        { key: 'temperature', value: '25.5' },
        { key: 'humidity', value: '60' },
      ]

      const result = await processInfluxDBData(data)
      expect(result).toEqual(expectedOutput)
    })

    it('should skip rows with missing key or value', async () => {
      const data = [
        ['key', 'value'],
        ['', '25.5'],
        ['humidity', ''],
        ['pressure', '30'],
      ]
      const expectedOutput = [{ key: 'pressure', value: '30' }]

      const result = await processInfluxDBData(data)
      expect(result).toEqual(expectedOutput)
    })

    it('should catch error', async () => {
      const badData = [['key1', 'value1'], null]

      try {
        // @ts-ignore
        await processInfluxDBData(badData)
      } catch (error) {
        expect(error).toBeTruthy()
      }
    })
  })
})
