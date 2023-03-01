import type { Observable } from "rxjs";

export abstract class UseCase<Result extends unknown, Params = undefined> {
  abstract execute(params: Params): Observable<Result>;
}
