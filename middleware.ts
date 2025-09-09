import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl;

    // Remove 'srsltid' parameter if it exists
    if (url.searchParams.has('srsltid')) {
        url.searchParams.delete('srsltid'); // Remove the parameter
        return NextResponse.redirect(url, 301); // SEO-friendly 301 Redirect
    }

    return NextResponse.next(); // Continue processing the request
}

// Apply middleware to all routes
export const config = {
    matcher: '/:path*', // Matches all paths
};