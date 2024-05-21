import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VistaPreviaEntrevistaDto } from '../model/vista-previa-entrevista-dto';
import { OAuthService } from 'angular-oauth2-oidc';
import { FormularioDto } from '@shared/model/formulario-dto';
import { HojaDeVidaDto } from '@shared/model/hoja-de-vida-dto';
import { AuthService } from './auth/auth.service';
import { environment } from 'src/environments/environment.development';
import { Perfil } from '@shared/model/interfaces-perfil';

@Injectable()
export class IntegradorService {
  //orquestadorURL = 'https://gateway.pruebas-entrevistador-inteligente.site/api/orquestador';
  orquestadorURL = environment.orquestadorURL;
  entrevista = '/v1/entrevistadores';
  hojaDeVida = '/v1/hojas-de-vidas';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  username: any;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService,
    private oauthService: OAuthService
  ) {}

  public list(): Observable<VistaPreviaEntrevistaDto[]> {
    return this.httpClient.get<VistaPreviaEntrevistaDto[]>(
      `${this.orquestadorURL}/public/preguntas`
    );
  }

  public listPerfiles(): Observable<Perfil[]> {
    return this.httpClient.get<Perfil[]>(
      `${this.orquestadorURL}/v1/entrevistador/public/perfiles`
    );
  }

  public listAut(): Observable<VistaPreviaEntrevistaDto[]> {
    return this.httpClient.get<VistaPreviaEntrevistaDto[]>(
      `${this.orquestadorURL}/preguntas`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  public crearSolicitudEntrevista(formulario: FormularioDto): Observable<any> {
    return this.httpClient.post(
      `${this.orquestadorURL}${
        this.entrevista
      }/solicitudes-entrevistas?username=${this.authService.getUsername()}`,
      formulario,
      {
        headers: this.getHeaders(),
      }
    );
  }

  public obtenerHojaDeVida(): Observable<HojaDeVidaDto> {
    this.username = this.authService.getUsername();
    return this.httpClient.get<HojaDeVidaDto>(
      `${this.orquestadorURL}${this.hojaDeVida}/${this.username}`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  public corregirHojaDeVida(formulario: HojaDeVidaDto): Observable<any> {
    return this.httpClient.put(
      `${this.orquestadorURL}${this.hojaDeVida}/${formulario.uuid}`,
      formulario,
      {
        headers: this.getHeaders(),
      }
    );
  }

  public cargarHojaDeVida(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append(
      'username',
      new Blob([JSON.stringify(this.authService.getUsername())], {
        type: 'application/json',
      })
    );

    return this.httpClient.post(
      `${this.orquestadorURL}${this.hojaDeVida}/cargas`,
      formData,
      {
        headers: this.getHeadersSinContent(),
      }
    );
  }

  private getHeadersSinContent(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = this.authService.getToken();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return headers;
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');

    const token = this.authService.getToken();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return headers;
  }
}
