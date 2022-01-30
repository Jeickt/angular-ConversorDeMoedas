import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conversao, ConversaoResponse } from '../models';
@Injectable()
export class ConversorService {
  // Nova url do fixer.io, que adiciona o parâmetro access_key, que é a chave de autenticação
  //private readonly BASE_URL = "http://api.fixer.io/latest";
  private readonly BASE_URL =
    'http://data.fixer.io/api/latest?access_key=eba7130a5b2d720ce43eb5fcddd47cc3';

  constructor(private http: HttpClient) {}

  converter(conversao: Conversao): Observable<any> {
    let params = `&base=${conversao.moedaDe}&symbols=${conversao.moedaPara}`;
    return this.http.get(this.BASE_URL + params);
  }

  cotacaoPara(
    conversaoResponse: ConversaoResponse,
    conversao: Conversao
  ): number {
    if (conversaoResponse === undefined) {
      return 0;
    }
    return conversaoResponse.rates[conversao.moedaPara];
  }

  cotacaoDe(
    conversaoResponse: ConversaoResponse,
    conversao: Conversao
  ): string {
    if (conversaoResponse === undefined) {
      return '0';
    }
    return (1 / conversaoResponse.rates[conversao.moedaPara]).toFixed(4);
  }

  dataCotacao(conversaoResponse: ConversaoResponse): string {
    if (conversaoResponse === undefined) {
      return '';
    }
    return conversaoResponse.date;
  }
}
