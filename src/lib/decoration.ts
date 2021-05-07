export const Get = (url?: string) => (
  target: Object,
  key: string,
  decorator: any
) => {
  decorator.value.method = "GET";
  decorator.value.method = url || "";
  return decorator;
};
