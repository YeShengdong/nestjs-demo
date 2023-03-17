declare module 'passport-jwt/lib/auth_header' {
  function parse(hdrValue: string): { scheme: string; value: string } | null;
}
