export class InternalError extends Error {
  constructor() {
    super(
      'Внутренняя ошибка приложения',
    );
  }
}
