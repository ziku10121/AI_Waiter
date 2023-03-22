import { WebSocketSubject } from "rxjs/webSocket"
import { ENUM_CONNATION_RESULT, ENUM_WS_LOCATIONS } from "../enum/ws.enum"

export type TWsLoactionSrtingmapping = {[key in ENUM_WS_LOCATIONS]: string }

export type TConnationResult = {[kye in ENUM_CONNATION_RESULT]?:
  kye extends ENUM_CONNATION_RESULT.ws ? WebSocketSubject<any> : any }
