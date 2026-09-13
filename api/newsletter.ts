import { signupNewsletter } from '../src/lib/newsletter-signup.js';

// A Web handler export is recognized by Vercel's Node runtime.
export function POST(request: Request): Promise<Response> {
  // Vercel serves this public endpoint over HTTPS, but its Web adapter may
  // construct an internal http URL. Keep the routed host (including previews)
  // and restore the public protocol; never trust Origin or forwarded-host here.
  const publicUrl = new URL(request.url);
  publicUrl.protocol = 'https:';
  return signupNewsletter(request, process.env.LUMAIL_API_KEY, publicUrl.origin);
}
