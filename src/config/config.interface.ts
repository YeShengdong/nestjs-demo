export enum Environment {
  Development = 'development',
  Production = 'production',
  Beta = 'beta',
  Alpha = 'alpha',
}

export interface ICorsConfig {
  origin: string | string[];
}
