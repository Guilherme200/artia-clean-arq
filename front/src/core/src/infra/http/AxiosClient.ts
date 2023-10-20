require('dotenv').config();
import axios, {AxiosInstance} from 'axios';
import HttpClient from '#/infra/http/HttpClient';

export class AxiosClient implements HttpClient {

  readonly instance: any;

  constructor() {
    this.instance = this.create()
  }

  create(): AxiosInstance {
    return axios.create({
      baseURL: process.env.API_URL,
      withCredentials: true,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }

  async request<T>(options: object): Promise<T> {
    const response = await this.instance(options)
    return response.data
  }

  async get<T>(url: string, options: object = {}): Promise<T> {
    const response = await this.instance.get(url, options)
    return response.data
  }

  async delete<T>(url: string, options: object = {}): Promise<T> {
    const response = await this.instance.delete(url, options)
    return response.data
  }

  async patch<T>(url: string, data: object = {}, options: object = {}): Promise<T> {
    const response = await this.instance.patch(url, data, options)
    return response.data
  }

  async post<T>(url: string, data: object = {}, options: object = {}): Promise<T> {
    const response = await this.instance.post(url, data, options)
    return response.data
  }

  async put<T>(url: string, data: object = {}, options: object = {}): Promise<T> {
    const response = await this.instance.put(url, data, options)
    return response.data
  }
}
