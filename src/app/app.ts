import { Component, signal } from '@angular/core';
import { AgeCalculator } from './componentes/age-calculator/age-calculator';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [AgeCalculator]
})
export class App {
  protected readonly title = signal('age-calculator-app-main-ang');
}
