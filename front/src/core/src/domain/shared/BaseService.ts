import HttpClient from "#/infra/http/HttpClient";
import {AxiosClient} from "#/infra/http/AxiosClient";
import {PaginationInterface, RequestInterface} from "#/domain/shared/RequestInterface";
import {ConfigHttpClient} from "../../../config";

export interface BaseServiceInterface {
  data: any,
  url: string,
}

export class BaseService<T> {
  protected fetch: HttpClient;
  protected readonly data: any;
  protected readonly url: string;

  constructor(props: BaseServiceInterface) {
    this.url = props.url || '';
    this.data = props.data || null
    this.fetch = this.setDefaultFetch()
  }

  private setDefaultFetch() {
    switch (ConfigHttpClient) {
      case 'axios':
        return new AxiosClient()
      default:
        return new AxiosClient()
    }
  }

  async index(params?: object): Promise<PaginationInterface<T> | any> {
    return await this.fetch.get<any>(this.url, {params}).then((response: any) => {
      return {
        meta: response?.meta,
        data: response?.data.map((item: any) => new this.data(item)),
      }
    }).catch((error: any) => error)
  }

  async get(id: number): Promise<RequestInterface<T>> {
    return await this.fetch.get<RequestInterface<T>>(`${this.url}/${id}`).then((response: any) => {
      return {item: new this.data(response.data)}
    }).catch((error: any) => error)
  }

  async create(data: any, options: any = null): Promise<RequestInterface<T>> {
    return await this.fetch.post<RequestInterface<T>>(this.url, data, options).then((response: any) => {
      return {item: new this.data(response.data)}
    }).catch((error: any) => error)
  }

  async update(id: number, data: any, options: any = null): Promise<RequestInterface<T>> {
    data['_method'] = 'PUT'
    return await this.fetch.post<RequestInterface<T>>(`${this.url}/${id}`, data, options)
      .then((response: any) => {
        return {item: new this.data(response.data)}
      }).catch((error: any) => error)
  }

  async destroy(id: number): Promise<any> {
    return await this.fetch.delete<any>(`${this.url}/${id}`).catch((error: any) => error);
  }
}
