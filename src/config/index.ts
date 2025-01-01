import { DevConfig } from "./config.development"

export interface IConfig {
    BASE_API_URL: string
}

const getConfig = () : IConfig => {
    const currentConfig = DevConfig;
    return currentConfig;
}

export const AppConfig = getConfig(); 