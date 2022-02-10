
export class DateUtil {
  public static getTimeNowSeconds(): number {
    return Math.round(Date.now() / 1000);
  }
}
