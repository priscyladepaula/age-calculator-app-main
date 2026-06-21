import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-age-calculator',
  imports: [],
  templateUrl: './age-calculator.html',
  styleUrl: './age-calculator.css',
})

export class AgeCalculator {
  // Signals para capturar a digitação do usuário
  day = signal<string>('');
  month = signal<string>('');
  year = signal<string>('');

  // Signals para armazenar os erros individuais
  dayError = signal<string>('');
  monthError = signal<string>('');
  yearError = signal<string>('');

  // Signals para armazenar o resultado final
  yearsResult = signal<string>('--');
  monthsResult = signal<string>('--');
  daysResult = signal<string>('--');

  calculateAge() {
    // Limpa os erros e resultados anteriores
    this.dayError.set('');
    this.monthError.set('');
    this.yearError.set('');
    this.resetResults();

    const dayStr = this.day().trim();
    const monthStr = this.month().trim();
    const yearStr = this.year().trim();

    let hasError = false;

    // Validação de campos vazios (Campos obrigatórios)
    if (dayStr === '') { this.dayError.set('Este campo é obrigatório'); hasError = true; }
    if (monthStr === '') { this.monthError.set('Este campo é obrigatório'); hasError = true; }
    if (yearStr === '') { this.yearError.set('Este campo é obrigatório'); hasError = true; }

    // Valores válidos
    const currentYear = new Date().getFullYear();
    const d = parseInt(dayStr, 10);
    const m = parseInt(monthStr, 10);
    const y = parseInt(yearStr, 10);

    // Valida o dia individualmente 
    if (dayStr !== '' && (isNaN(d) || d < 1 || d > 31)) {
      this.dayError.set('Deve ser um dia válido');
      hasError = true;
    }

    // Valida o mês individualmente
    if (monthStr !== '' && (isNaN(m) || m < 1 || m > 12)) {
      this.monthError.set('Deve ser um mês válido');
      hasError = true;
    }

    // Valida o ano individualmente
    if (yearStr !== '' && (isNaN(y) || y < 1 || y > currentYear)) {
      this.yearError.set('Deve ser um ano válido');
      hasError = true;
    }

    // Aqui termina para qualquer uma das validações individuais falhou
    if (hasError) return;

    // Validação de consistência da data completa (Ex: 31/04/2020)
    const birthDate = new Date(y, m - 1, d);
    const isDateCombinationValid = 
      birthDate.getFullYear() === y && 
      birthDate.getMonth() === m - 1 && 
      birthDate.getDate() === d;

    if (!isDateCombinationValid) {
      this.dayError.set('Deve ser uma data válida');
      return;
    }

    // Validação da data não pode ser no futuro
    const today = new Date();
    if (birthDate > today) {
      this.yearError.set('Deve ser no passado');
      return;
    }

    // Cálculo da idade
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += previousMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    // Atualiza a tela com o resultado real
    this.yearsResult.set(years.toString());
    this.monthsResult.set(months.toString());
    this.daysResult.set(days.toString());
  }

  private resetResults() {
    this.yearsResult.set('--');
    this.monthsResult.set('--');
    this.daysResult.set('--');
  }
}