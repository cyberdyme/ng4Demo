import {Injectable} from "@angular/core";
@Injectable()
export class WindowingService
{
  public Resize(size : {width:number, height:number})
  {
    console.log(`width =${size.width} height=${size.height}`);
  }
}
