import { Quote } from "./quote";

export interface SearchQuotesResponse {
  quotes: Quote[]
  count: number
}
