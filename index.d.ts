import OpenAI, { ClientOptions } from 'openai';

export declare const BASE_URL: string;
export declare const IRAN_BASE_URL: string;

export interface GisooOptions extends Omit<ClientOptions, 'apiKey' | 'baseURL'> {
  apiKey?: string;
  iran?: boolean;
  baseURL?: string;
}

export interface GisooModel {
  id: string;
  type?: 'chat' | 'image' | 'audio' | 'embedding' | 'video' | 'music' | string;
  [key: string]: unknown;
}

export declare function createGisoo(options?: GisooOptions): OpenAI;
export declare function listModels(options?: {
  type?: string;
  iran?: boolean;
  baseURL?: string;
}): Promise<GisooModel[]>;
