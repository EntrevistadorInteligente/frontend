import { Injectable, NgZone } from '@angular/core';
import { FeedbackDto } from '@shared/model/feedback-dto';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';
import { NotifiacionDto } from '@shared/model/notificacion-dto';
import { TipoNotificacionEnum } from '@shared/model/tipo-notificacion.enum';

@Injectable({
  providedIn: 'root'
})

export class SseService {
  private eventoSource  = new BehaviorSubject<NotifiacionDto>(undefined);
  currentEvento = this.eventoSource.asObservable();

  private sseUrl = 'https://gateway.pruebas-entrevistador-inteligente.site/api/websocket/v1/eventos/subscribe';

  constructor(private authService: AuthService, private zone: NgZone) { }

  getServerSentEvent(): Observable<any> {
    const user = this.authService.getUsername();
    return new Observable(observer => {
      const eventSource = this.connect(observer, `${this.sseUrl}/${user}`);
      return () => eventSource.close();
    });
  }

  private connect(observer: any, url: string): EventSource {
    const eventSource = new EventSource(url);

    eventSource.onmessage = event => {
      console.log('Received event:', event.data );
      this.zone.run(() => {
        const data = JSON.parse(event.data) as NotifiacionDto;
        if (data.tipo === TipoNotificacionEnum.NOTIFICACION_FRONT) {
          return;
        }
        
        observer.next(data);
        this.eventoSource.next(data);
      });
    };

    eventSource.onerror = error => {
      eventSource.close();
      setTimeout(() => {
        this.connect(observer, url);
      }, 10);
    };

    return eventSource;
  }

}
