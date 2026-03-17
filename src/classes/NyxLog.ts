export default class NyxLog {
  private static getFormattedMessage(prefix: any, args: string[]): string {
    let p = prefix
    let a = args
    if (typeof prefix !== 'string' || !prefix.toLowerCase().startsWith('nyx')) {
      p = 'NYX'
      a = [prefix, ...args]
    }
    return `%c${ p }%c ${ a.join(' ') }`
  }

  private static getPrefixStyle(): string {
    return 'background: #9F50F0; color: white; padding: 4px 8px; border-radius: 2px; font-weight: bold; line-height: 1.5; margin-bottom: 4px; display: inline-flex;';
  }

  private static getMessageStyle(type: string): string {
    switch (type) {
      case 'info':
        return 'color: #4CAF50; font-weight: normal; line-height: 1.5; padding: 4px; display: inline-flex;'
      case 'warn':
        return 'color: #FF9800; font-weight: normal; line-height: 1.5; padding: 4px; display: inline-flex;'
      case 'error':
        return 'color: #F44336; font-weight: normal; line-height: 1.5; padding: 4px; display: inline-flex;'
      default:
        return ''
    }
  }

  private static getArgsStrings(args: any[]): string[] {
    return args.filter((arg) => typeof arg === 'string')
  }

  private static getArgsOther(args: any[]): any[] {
    return args.filter((arg) => typeof arg !== 'string')
  }

  private static getCaller(): string {
    const stack = new Error().stack
    if (stack) {
      const stackLines = stack.split('\n')
      const caller = stackLines[3] ?? 'unknown'
      return caller
    }
    return 'unknown'
  }

  public static info(prefix: any, ...args: any[]): void {
    console.log.apply(console, [
      this.getFormattedMessage(prefix, this.getArgsStrings(args)),
      this.getPrefixStyle(),
      this.getMessageStyle('info'),
      ...this.getArgsOther(args)
    ])
  }

  public static warn(prefix: any, ...args: any[]): void {
    console.warn.apply(console, [
      this.getFormattedMessage(prefix, this.getArgsStrings(args)),
      this.getPrefixStyle(),
      this.getMessageStyle('warn'),
      ...this.getArgsOther(args)
    ])
  }

  public static error(prefix: any, ...args: any[]): void {
    console.error.apply(console, [
      this.getFormattedMessage(prefix, this.getArgsStrings(args)),
      this.getPrefixStyle(),
      this.getMessageStyle('error'),
      ...this.getArgsOther(args)
    ])
  }
}
