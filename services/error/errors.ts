export class UnauthorizedError extends Error {
  constructor() {
    super("User is not authenticated")
  }
}
