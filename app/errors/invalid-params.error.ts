export class InvalidParams extends Error {
  constructor() {
    super('Invalid params')
    this.name = 'InvalidParams'
  }
}