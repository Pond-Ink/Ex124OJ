declare function GM_addElement(tag_name: string, attributes: { [key: string]: string; }): void;
declare function GM_addElement(parent_node: Element, tag_name: string, attributes: { [key: string]: string; }): void;
declare function GM_addStyle(css: string): void;
declare function GM_setClipboard(data: any, info: string | { type: string; mimetype?: string; }): void;
declare function GM_getValue(key: string, defaultValue?: any): any;
declare function GM_setValue(key: string, value: any): void;
declare function GM_deleteValue(key: string): void;
declare function GM_listValues(): string[];
declare function GM_xmlhttpRequest(details: GMXMLHttpRequestDetails): void;

interface GMXMLHttpRequestDetails {
  method: string;
  url: string;
  headers?: { [key: string]: string };
  data?: string | FormData;
  responseType?: "text" | "json" | "arraybuffer" | "blob" | "document";
  timeout?: number;
  onload?: (response: GMXMLHttpRequestResponse) => void;
  onerror?: (response: GMXMLHttpRequestResponse) => void;
  ontimeout?: (response: GMXMLHttpRequestResponse) => void;
}

interface GMXMLHttpRequestResponse {
  finalUrl: string;
  status: number;
  statusText: string;
  responseHeaders: string;
  response: any;
}