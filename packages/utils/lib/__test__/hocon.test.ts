import { describe, it, expect } from 'vitest'
import { hoconToObject, objectToHocon } from '../hocon'

describe('hoconToObject', () => {
  it('should parse a simple HOCON string to an object', () => {
    const hocon = `
      bridges.mqtt.emqx1 = {
        server = "mqtt://127.0.0.1:1883"
        proto_ver = 4
        clientid = "bridge_client"
        keepalive = "60s"
        clean_start = false
        username = "username"
        password = "passwd"
        will = {
          topic = "will_topic"
          qos = 1
          retain = false
          payload = "will_message"
          properties = {
            payload_format_indicator = 0
            message_expiry_interval = 0
            content_type = ""
            response_topic = ""
            correlation_data = ""
            will_delay_interval = 0
            user_property = {
              key1 = "value1"
              key2 = "value2"
            }
          }
        }
        ssl = {
          key_password = "yourpass"
          keyfile = "/etc/certs/key.pem"
          certfile = "/etc/certs/cert.pem"
          cacertfile = "/etc/certs/cacert.pem"
        }
        forwards = [
          {
            remote_topic = "fwd/topic1"
            local_topic = "topic1"
          },
          {
            remote_topic = "fwd/topic2"
            local_topic = "topic2"
          }
        ]
        subscription = [
          {
            remote_topic = "cmd/topic1"
            local_topic = "topic3"
            qos = 1
            retain = 2
          },
          {
            remote_topic = "cmd/topic2"
            local_topic = "topic4"
            qos = 2
          }
        ]
        max_parallel_processes = 2
        max_send_queue_len = 32
        max_recv_queue_len = 128
      }
    `
    const expected = {
      bridges: {
        mqtt: {
          emqx1: {
            server: 'mqtt://127.0.0.1:1883',
            proto_ver: 4,
            clientid: 'bridge_client',
            keepalive: '60s',
            clean_start: false,
            username: 'username',
            password: 'passwd',
            will: {
              topic: 'will_topic',
              qos: 1,
              retain: false,
              payload: 'will_message',
              properties: {
                payload_format_indicator: 0,
                message_expiry_interval: 0,
                content_type: '',
                response_topic: '',
                correlation_data: '',
                will_delay_interval: 0,
                user_property: {
                  key1: 'value1',
                  key2: 'value2',
                },
              },
            },
            ssl: {
              key_password: 'yourpass',
              keyfile: '/etc/certs/key.pem',
              certfile: '/etc/certs/cert.pem',
              cacertfile: '/etc/certs/cacert.pem',
            },
            forwards: [
              {
                remote_topic: 'fwd/topic1',
                local_topic: 'topic1',
              },
              {
                remote_topic: 'fwd/topic2',
                local_topic: 'topic2',
              },
            ],
            subscription: [
              {
                remote_topic: 'cmd/topic1',
                local_topic: 'topic3',
                qos: 1,
                retain: 2,
              },
              {
                remote_topic: 'cmd/topic2',
                local_topic: 'topic4',
                qos: 2,
              },
            ],
            max_parallel_processes: 2,
            max_send_queue_len: 32,
            max_recv_queue_len: 128,
          },
        },
      },
    }
    expect(hoconToObject(hocon)).toEqual(expected)
  })

  it('should parse a HOCON string with units to an object', () => {
    const hocon = `
      mqtt = {
        max_packet_size = 1KB
        max_mqueue_len = 2048
        retry_interval = 10s
        keepalive_multiplier = 1.25
        property_size = 32
      }
    `
    const expected = {
      mqtt: {
        max_packet_size: '1KB',
        max_mqueue_len: 2048,
        retry_interval: '10s',
        keepalive_multiplier: 1.25,
        property_size: 32,
      },
    }
    expect(hoconToObject(hocon)).toEqual(expected)
  })

  it('should handle various data types', () => {
    const hocon = `
      a = true
      b = false
      c = null
      d = "a string"
      e = 123
      f = 123.45
      g = { a: 1 }
      h = [1, 2, 3]
    `
    const expected = {
      a: true,
      b: false,
      c: null,
      d: 'a string',
      e: 123,
      f: 123.45,
      g: { a: 1 },
      h: [1, 2, 3],
    }
    expect(hoconToObject(hocon)).toEqual(expected)
  })

  it('should throw an error for invalid HOCON', () => {
    const invalidHocon = `{ a: 1, b: 2 `
    expect(() => hoconToObject(invalidHocon)).toThrow()
  })

  it('should parse hocon without root braces', () => {
    const hocon = `
      key = value
      another {
        nested = true
      }
    `
    const expected = {
      key: 'value',
      another: {
        nested: true,
      },
    }
    expect(hoconToObject(hocon)).toEqual(expected)
  })
})

describe('objectToHocon and back', () => {
  it('should convert an object to HOCON and back to the same object', () => {
    const obj = {
      bridges: {
        mqtt: {
          emqx1: {
            server: 'mqtt://127.0.0.1:1883',
            proto_ver: 4,
            clientid: 'bridge_client',
            clean_start: false,
            subscription: [
              {
                remote_topic: 'cmd/topic1',
                local_topic: 'topic3',
                qos: 1,
              },
            ],
            max_parallel_processes: 2,
          },
        },
      },
    }
    const hoconString = objectToHocon(obj)
    const convertedObj = hoconToObject(hoconString)
    expect(convertedObj).toEqual(obj)
  })

  it('should handle an empty object', () => {
    const obj = {}
    const hoconString = objectToHocon(obj)
    expect(hoconString).toBe('{}')
    // Parsing an empty string should result in an empty object
    expect(hoconToObject(hoconString)).toEqual({})
  })

  it('should handle object with various data types', () => {
    const obj = {
      a: true,
      b: false,
      c: null,
      d: 'a string',
      e: 123,
      f: 123.45,
      g: { a: 1, b: 'nested' },
      h: [1, 'two', false, null, { i: 3 }],
    }
    const hoconString = objectToHocon(obj)
    const convertedObj = hoconToObject(hoconString)
    expect(convertedObj).toEqual(obj)
  })
})
