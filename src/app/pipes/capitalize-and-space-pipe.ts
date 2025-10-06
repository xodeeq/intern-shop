import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeAndSpace',
  standalone: true
})
export class CapitalizeAndSpacePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    const spacedValue = value.replace(/([a-z])([A-Z])/g, '$1 $2')

    const capitalized = spacedValue.replace(/\b\w/g, char => char.toUpperCase());

    return capitalized;
  }
}
