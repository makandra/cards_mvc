import {Injectable} from 'angular2/core';
import {URLSearchParams} from 'angular2/http';

export class SearchQueryService {
  static toSearchParams(params) {
    let searchParams = new URLSearchParams();
    for ( let key of Object.keys(params) ) {
      searchParams.append(key, params[key]);
    }
    return searchParams;
  }
}
