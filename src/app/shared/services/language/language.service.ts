import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, tap } from 'rxjs';
import { Language } from './language';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private _localStorageKey = 'stockfolio-language';
  private _defaultLanguage = 'en-US';
  private _supportedLanguages = new Map<string, Language>([
    ['en-US', { code: 'en-US', displayName: 'English' }],
    ['pl-PL', { code: 'pl-PL', displayName: 'Polski' }],
  ]);
  private _languageSubject$ = new BehaviorSubject<Language>(
    this.getLanguageFromLocalStorage() ?? this.detectUserLanguage() ?? this._supportedLanguages.get(this._defaultLanguage)
  );

  public supportedLanguages = Array.from(this._supportedLanguages.values());

  public language$ = this._languageSubject$.asObservable().pipe(
    tap(language => {
      this._translateService.use(language.code);
    })
  );

  constructor(private _translateService: TranslateService) {}

  public changeLanguage(languageCode: string): void {
    const language = this._supportedLanguages.get(languageCode);
    if (!languageCode) {
      throw new Error(`Language ${language} is not supported.`);
    }

    localStorage.setItem(this._localStorageKey, languageCode);
    this._languageSubject$.next(language);
  }

  private detectUserLanguage(): Nullable<Language> {
    const wn = window.navigator as any;
    let lang: string = wn.languages[0];
    lang = lang || wn.language || wn.browserLanguage || wn.userLanguage;
    return this._supportedLanguages.get(lang);
  }

  private getLanguageFromLocalStorage(): Nullable<Language> {
    const localStorageLanguage = localStorage.getItem(this._localStorageKey);
    return this._supportedLanguages.get(localStorageLanguage);
  }
}
