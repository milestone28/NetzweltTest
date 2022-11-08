import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class BaseService {
  constructor () { }

  protected GenerateUrl(domain: string, apiUrl: string) {
    return domain.concat("/", apiUrl);
  }

  protected GenerateUrlQueryString(
    domain: string,
    apiUrl: string,
    queryParams: any[],
    queryParamsValue: any[]
  ) {
    let finalUrl = domain.concat("/", apiUrl);
    for (var i = 0; i < queryParams.length; i++) {
      if (i == 0) {
        finalUrl = finalUrl.concat(
          "?",
          queryParams[i],
          "=",
          queryParamsValue[i]
        );
      } else {
        finalUrl = finalUrl.concat(
          "&",
          queryParams[i],
          "=",
          queryParamsValue[i]
        );
      }
    }

    return finalUrl;
  }
}
