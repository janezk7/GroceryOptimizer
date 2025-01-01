import { create, ApiResponse, ApisauceInstance } from "apisauce";
import { Article } from "../models/DbEntities";
import { AppConfig } from "../config";

export interface IApiService {
	fetchArticles(): Promise<Article[]>;
}

export class ApiService implements IApiService {
	api: ApisauceInstance

	constructor() {
		this.api = create({
			baseURL: AppConfig.BASE_API_URL,
			timeout: 10000, // 10 seconds timeout
			headers: {
				Accept: "application/json",
			},
		});

		this.api.addRequestTransform((request) => {
			const token = localStorage.getItem("token"); // Replace with your token retrieval method
			if (token) {
				if (!request.headers) request.headers = {};
				request.headers.Authorization = `Bearer ${token}`;
			}
		});
	}
	
	async fetchArticles(): Promise<Article[]> {
		const response: ApiResponse<Article[]> = await this.api.get<Article[]>("/article");
		console.log("Response:", response);
	
		if (response.ok && response.data) {
			return response.data;
		} else {
			throw new Error(response.problem || "Failed to fetch articles");
		}
	}
}