export default class Mp2Calculation {

  constructor(private contributions: number[], private _interestRates: number[]) { }

  get numberOfYears(): number {
    return Math.floor(this.contributions.length / 12);
  }

  get totalContributionAmount(): number {
    return this.contributions.reduce((a, b) => a + b, 0);
  }

  get totalDividends(): number {
    return Array.from({ length: this.numberOfYears }, (_, year) => this.getDividendsForYear(year))
      .reduce((a, b) => a + b, 0);
  }

  get endingBalance(): number {
    return this.getEndingBalanceForYear(this.numberOfYears - 1);
  }

  get interestRates(): number[] {
    return [...this._interestRates];
  }

  getRateForYear(index: number): number {
    return this._interestRates[index];
  }

  /**
   * @param 0-based index for year (0 for year 1, 1 for year2, etc...)
   * @returns all contributions for the given year 
   */
  getContributionsForYear(index: number): number[] {
    const startIndex = Math.ceil(12 * index);
    return this.contributions.slice(startIndex, startIndex + 12);
  }

  /**
   * @param 0-based index for year (0 for year 1, 1 for year2, etc...)
   * @returns total contributions for the given year 
   */
  getTotalContributionsForYear(index: number): number {
    const contributions = this.getContributionsForYear(index);
    return contributions.reduce((a, b) => a + b, 0);
  }

  /**
   * @param 0-based index for year (0 for year 1, 1 for year2, etc...)
   * @returns accumulated balance from year 1 to the given year
   */
  getAccumulatedMonthlyContributionsSinceYear(index: number): number[] {
    const lastIndex = 12 * (Math.floor(index) + 1)
    const contributions = this.contributions.slice(0, lastIndex);

    const x = contributions.reduce((result, contribution, idx) => {
      const previousAccumulated = idx > 0 ? result[idx - 1] : 0;

      let previousYearDividends = 0;
      if (idx % 12 === 0 && idx !== 0) {
        previousYearDividends = this.getDividendsForYear(Math.floor(idx / 12) - 1);
      }

      const accumulated = previousAccumulated + contribution + previousYearDividends;

      result.push(accumulated);
      return result;
    }, [] as number[]);

    return x.slice(lastIndex - 12, lastIndex);
  }

  /**
   * @param 0-based index for year (0 for year 1, 1 for year2, etc...)
   * @returns average monthly balance for the given year 
   */
  getAverageMonthlyBalanceForYear(index: number): number {
    const accumulatedBalances = this.getAccumulatedMonthlyContributionsSinceYear(index);
    const yearLumpContributions = accumulatedBalances.slice(-12)

    return yearLumpContributions.reduce((a, b) => a + b, 0) / 12;
  }

  /**
   * @param 0-based index for year (0 for year 1, 1 for year2, etc...)
   * @returns total contributions for the given year 
   */
  getDividendsForYear(index: number): number {
    const getAverageMonthlyBalanceForYear = this.getAverageMonthlyBalanceForYear(index);
    const interestRate = this._interestRates[index] / 100;

    return getAverageMonthlyBalanceForYear * interestRate;
  }

  /**
   * @param 0-based index for year (0 for year 1, 1 for year2, etc...)
   * @returns ending balance for the given year 
   */
  getEndingBalanceForYear(index: number): number {
    const accumulatedBalances = this.getAccumulatedMonthlyContributionsSinceYear(index);
    const lastMonthAccumulation = accumulatedBalances[accumulatedBalances.length - 1];
    const dividends = this.getDividendsForYear(index);

    return lastMonthAccumulation + dividends;
  }
}