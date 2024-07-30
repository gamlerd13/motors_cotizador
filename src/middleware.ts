export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import withAuth, { NextRequestWithAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const publicPaths = [
  /^\/api\/cotizacion$/,
  /^\/api\/client$/,
  /^\/api\/codeCotizacion$/,
  /^\/api\/client\/.*$/, // repasar este funcionamiento
];

const authMiddleware = withAuth({
  callbacks: {
    async authorized({ req, token }) {
      // Permite acceso si hay un token válido
      if (token) return true;

      // Permite acceso a las rutas públicas
      const path = req.nextUrl.pathname;
      return publicPaths.some((publicPath) => publicPath.test(path));
    },
  },
});

export async function middleware(
  request: NextRequestWithAuth,
  event: NextFetchEvent
) {
  // Ejecutar el middleware de autenticación primero
  const authResponse = await authMiddleware(request, event);

  // Si la autenticación falla, retornar la respuesta de autenticación
  if (authResponse?.status !== 200) {
    return authResponse;
  }
}

// export async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   const url = req.nextUrl.clone();
//   url.pathname = "/auth/login";
//   const token = await getToken({ req });

//   // Permite el acceso a las rutas que no requieren autenticación
//   if (noAuthRequired.some((path) => pathname.startsWith(path))) {
//     return NextResponse.next();
//   }

//   // Si no hay token y la ruta no está en noAuthRequired, redirige al login
//   if (!token) {
//     console.log("No existe tocken");
//     return NextResponse.redirect(new URL("/auth/login", req.url));
//     // return NextResponse.redirect(url);
//     // return NextResponse.rewrite(new URL("/auth/login", req.url));
//     // return NextResponse.rewrite(url);
//   }

//   // Si hay token, permite continuar
//   return NextResponse.next();
// }
export const config = {
  matcher: ["/((?!api/auth|auth/login|logo.png).*)"],
};
