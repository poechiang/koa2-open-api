declare namespace Octopus {
  interface RouteInfo {
    url: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "HEAD" | "OPTIONS" | "DELETE";
    action: Function;
  }
}
