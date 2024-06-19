import { Injectable } from '@angular/core';

type RouteData = {
  langTo: string;
  voice: string;
};

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  synthesis = window.speechSynthesis;

  routeData: RouteData = {
    langTo: 'es-US',
    voice: 'Google español',
  };

  start(text: string, rate = 1) {
    const textToSpeech = new SpeechSynthesisUtterance(text);
    textToSpeech.lang = this.routeData.langTo;
    textToSpeech.text = text;
    textToSpeech.rate = rate;

    textToSpeech.onend = function () {
      console.info('SpeechSynthesisUtterance.onend');
    };

    textToSpeech.onerror = function (error) {
      console.error('SpeechSynthesisUtterance.onerror ', error);
    };

    textToSpeech.onstart = function () {
      console.info('SpeechSynthesisUtterance.onstart');
    };
    // GET VOICE

    const voice = speechSynthesis.getVoices().filter((voice) => {
      return voice.name === this.routeData.voice;
    })[0];
    textToSpeech.voice = voice;

    this.synthesis.speak(textToSpeech);
  }
}