import {PaginationInterface, RequestInterface} from "#/domain/shared/RequestInterface";

export abstract class BaseService<T> {
  protected constructor(protected fetch: any, protected url: string, protected data: any) {
    this.url = url;
    this.fetch = fetch;
    this.data = data;
  }

  async index(params?: object): Promise<PaginationInterface<T>> {
    const response = await this.fetch(this.url, {params})
    return {
      meta: response.meta,
      data: response.data.map((item: any) => new this.data(item)),
    }
  }

  async get(id: number): Promise<RequestInterface<T>> {
    const response = await this.fetch(`${this.url}/${id}`)
    return {item: new this.data(response)}
  }

  async create(data: any): Promise<RequestInterface<T>> {
    const response = await this.fetch(this.url, data);
    return {item: new this.data(response)}
  }

  async update(id: number, data: any): Promise<RequestInterface<T>> {
    const response = await this.fetch(`${this.url}/${id}`, data)
    return {item: new this.data(response)}
  }

  async destroy(id: number): Promise<any> {
    return await this.fetch(`${this.url}/${id}`, {method: 'DELETE'});
  }
}
