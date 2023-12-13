import { HttpException } from '@nestjs/common';

export class CustomException extends HttpException {
  private readonly i18nFile: string;

  private readonly arguments: Record<string, string>;

  /**
   * Constructor for the CustomException class.
   *
   * @param messageKey - The key used to fetch the error message.
   * @param statusCode - The HTTP status code.
   * @param i18nFile - The file name for internationalization. Defaults to 'error'.
   * @param args - An object containing key-value pairs of arguments.
   *
   * Example:
   *   throw new CustomException("USER_ACTION", 404, "error", { user: "John", action: "deleted", resource: "post" }).
   *   This will set messageKey to "USER_ACTION" and arguments object to { user: "John", action: "deleted", resource: "post" }.
   */
  constructor(
    messageKey: string,
    statusCode: number,
    i18nFile = 'error',
    args: Record<string, any> = {},
  ) {
    super(messageKey, statusCode);
    this.i18nFile = i18nFile;
    this.arguments = args;
  }

  /**
   * Gets the internationalization (i18n) file associated with the exception.
   *
   * @returns The i18n file name.
   */
  public getI18nFile(): string {
    return this.i18nFile;
  }

  /**
   * Gets the arguments associated with the exception.
   *
   * @returns The arguments object.
   */
  public getArguments(): Record<string, string> {
    return this.arguments;
  }
}