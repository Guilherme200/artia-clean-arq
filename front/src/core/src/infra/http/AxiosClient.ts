import axios, {AxiosInstance} from 'axios';
import HttpClient from '#/infra/http/HttpClient';
import {ConfigBaseUrl} from "../../../config";

export class AxiosClient implements HttpClient {

  readonly instance: any;

  constructor() {
    this.instance = this.create()
    this.instance.interceptors.response.use((response: any) => {
      return response;
    }, (error: any) => {
      const errors: any = [];
      const status: number = error.response.status || 500
      const statusText: number = error.response.statusText || 'Request rejected'

      if (status === 422) {
        const responseErrors = error.response.data.errors
        for (const [field, message] of Object.entries(responseErrors)) {
          // @ts-ignore
          errors[field] = message[0]
        }
      }
      return Promise.reject({
        status: status,
        message: statusText,
        errors: errors
      });
    });
  }

  create(): AxiosInstance {
    return axios.create({
      baseURL: ConfigBaseUrl,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
  }

  async request<T>(options: object): Promise<T> {
    const response = await this.instance.request(options)
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
