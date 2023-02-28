export abstract class UseCase<Result extends unknown, Params = undefined> {
  abstract execute(params: Params): Promise<Result>;
}
