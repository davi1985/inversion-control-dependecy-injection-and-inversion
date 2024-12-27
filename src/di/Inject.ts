export const Inject =
  (token: string) => (target: unknown, _: unknown, propertyIndex: number) =>
    Reflect.defineMetadata(`inject:${propertyIndex}`, token, target as object);
