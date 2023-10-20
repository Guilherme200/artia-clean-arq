require('dotenv').config();
import HttpClient from "#/infra/http/HttpClient";
import {AxiosClient} from "#/infra/http/AxiosClient";
import {PaginationInterface, RequestErrorInterface, RequestInterface} from "#/domain/shared/RequestInterface";

export interface BaseServiceInterface {
  data: any,
  url: string
}

export abstract class BaseService<T> {
  protected fetch: HttpClient;
  protected readonly data: any;
  protected readonly url: string;

  protected constructor(props: BaseServiceInterface) {
    this.url = props.url || '';
    this.data = props.data || null
    this.fetch = this.setDefaultFetch()
  }

  private setDefaultFetch() {
    const httpClient = process.env.HTTP_CLIENT
    switch (httpClient) {
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
    const response = await this.fetch.get<RequestInterface<T>>(`${this.url}/${id}`)
    return {item: new this.data(response)}
  }

  async create(data: any): Promise<RequestInterface<T>> {
    const response = await this.fetch.post<RequestInterface<T>>(this.url, data);
    return {item: new this.data(response)}
  }

  async update(id: number, data: any): Promise<RequestInterface<T>> {
    data['_method'] = 'PUT'
    const response = await this.fetch.put<RequestInterface<T>>(`${this.url}/${id}`, data)
    return {item: new this.data(response)}
  }

  async destroy(id: number): Promise<any> {
    return await this.fetch.delete<any>(`${this.url}/${id}`);
  }
}
