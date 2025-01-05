import { DevConfig } from "./config.development"

export interface IConfig {
    BASE_API_URL: string,
    ALERT_TIMEOUT_MS: number
}

const getConfig = () : IConfig => {
    const currentConfig = DevConfig;
    return currentConfig;
}

export const AppConfig = getConfig(); 