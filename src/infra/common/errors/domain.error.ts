export abstract class DomainError extends Error {
  abstract readonly httpStatus: number;
}
