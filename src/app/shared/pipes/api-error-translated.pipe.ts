import { Pipe, PipeTransform } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Pipe({ name: 'apiErrorTranslated' })
export class ApiErrorTranslatedPipe implements PipeTransform {
  constructor(private _translateService: TranslateService) { }

  transform(errorCode: string, prefix = 'apiErrors'): string {
    return this._translateService.instant(`${prefix}.${errorCode}`);
  }
}
