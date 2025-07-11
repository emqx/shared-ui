declare module 'hocon-parser' {
  function parse(text: string): Record<string, any>
  export default parse
}
