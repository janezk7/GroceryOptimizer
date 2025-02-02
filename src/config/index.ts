import { DevConfig } from "./config.development"
import { ProdConfig } from "./config.production";

export interface IConfig {
    BASE_API_URL: string,
    ALERT_TIMEOUT_MS: number
}

const getConfig = () : IConfig => {
    const currentConfig = ProdConfig;
    return currentConfig;
}

export const AppConfig = getConfig(); 