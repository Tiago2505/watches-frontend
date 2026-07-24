import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordCapitalized'
})

export class FirstWordCapitalized implements PipeTransform {
  transform(sentence: string): string {
    const sentenceSplit = sentence.split(' ');
    const firstLetterCapitalized = sentenceSplit[0].charAt(0).toLocaleUpperCase();

    sentenceSplit[0] = firstLetterCapitalized + sentenceSplit[0].slice(1);

    return sentenceSplit.join(' ');
  }
}
