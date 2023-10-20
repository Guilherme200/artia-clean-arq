import {ConfigBaseUrl} from "../../../config";

require('dotenv').config();
import {AxiosClient} from "#/infra/http/AxiosClient";

describe('AxiosClient', () => {
  const http = new AxiosClient();
  test('Should inject baseUrl equal config env', () => {
    const baseUrl = http?.instance?.defaults?.baseURL;
    expect(baseUrl).toBe(ConfigBaseUrl);
  })

  test('Should inject headers', () => {
    const headers = http?.instance?.defaults?.headers;
    expect(headers).not.toBeNull();
    expect(headers?.Accept).toBe('application/json');
    expect(headers?.['Content-Type']).toBe('application/json');
  })
})