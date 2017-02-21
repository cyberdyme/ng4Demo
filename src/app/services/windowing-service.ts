import {Injectable} from "@angular/core";
import {Subject, Observable} from "rxjs";

export interface ResizeValues {
  width: number;
  height: number;
}

@Injectable()
export class WindowingService {
  private resizeSubject = new Subject<ResizeValues>();

  public Resize(size: {width: number, height: number}) {
    this.resizeSubject.next({width: size.width, height: size.height});
    console.log(`width =${size.width} height=${size.height}`);
  }

  public getResizeObservable(): Observable<ResizeValues> {
    return this.resizeSubject.asObservable();
  }
}
