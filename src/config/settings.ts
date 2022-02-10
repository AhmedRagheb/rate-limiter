/**
 * A class that acts as a wrapper around global settings, configuration and constants.
 */
export default class Settings {
  /**
   * The default port the server will listen on, if no other is configured.
   */
  public static DEFAULT_PORT = 8080;

  /**
   * The default local file;
   */
  public static DEFAULT_PATH = 'end-points.json';

  /**
   * The default conversion rate (rpm);
   */
  public static REVOLUTIONS_RATE = 60;

  static get port(): number {
    const port = process.env['PORT']
    return port ? parseInt(port) : this.DEFAULT_PORT;
  }

  static get endPointsFilePath(): string {
    const filepath = process.env['END_POINTS_FILE'];
    return filepath || this.DEFAULT_PATH;
  }
}
