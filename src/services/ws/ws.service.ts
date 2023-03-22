import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { WS_LOCATIONS } from 'src/app/commons/const/ws.const';
import { ENUM_WS_LOCATIONS } from 'src/app/commons/enum/ws.enum';
import { Observable } from 'rxjs';
import { TConnationResult } from 'src/app/commons/type/ws.type';

@Injectable({
  providedIn: 'root'
})
export class WsService {

  // ws$!: {[key in ENUM_WS_LOCATIONS]: WebSocketSubject<any>}
  ws$: {[key:string]: WebSocketSubject<any>} | {[key in ENUM_WS_LOCATIONS]: WebSocketSubject<any>} = {}
  constructor() {
  }

  selectWs( wss:ENUM_WS_LOCATIONS ): Observable<TConnationResult>{
    return new Observable((observer) => {
      this.ws$[wss] = webSocket( WS_LOCATIONS[wss] )
      let thisWs = this.ws$[wss]
      thisWs.subscribe()
      observer.next({
        ws: thisWs,
      })
    })
  }

  // selectWs( wss: ENUM_WS_LOCATIONS ): WebSocketSubject<any> {
  //   this.ws$[wss] = webSocket( WS_LOCATIONS[wss] )
  //   this.ws$[wss].subscribe()
  //   return this.ws$[wss]
  // }

  // selectWs( wss: ENUM_WS_LOCATIONS ): Observable<TConnationResult> {
  //   // console.log();
  //   // this.ws$[wss] = webSocket( WS_LOCATIONS[wss] )
  //   // console.log(WS_LOCATIONS[wss]);
  //   // this.ws$[wss].subscribe()
  //   // this.ws$[wss].next('gaga')
  //   return new Observable((observer) => {
  //     this.ws$[wss] = webSocket( WS_LOCATIONS[wss] );
  //     let thisWs = this.ws$[wss]
  //     thisWs.subscribe((res) => {
  //       console.log(wss + '已連接');
  //       observer.next({
  //         ws : thisWs,
  //         wsResult : res
  //       })
  //     })
  //   })
  // }

  getWs( wss: ENUM_WS_LOCATIONS ): WebSocketSubject<any> {
    return this.ws$[wss];
  }
}
