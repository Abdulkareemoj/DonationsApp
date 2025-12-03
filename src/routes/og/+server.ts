// src/routes/og/+server.ts
import { ImageResponse } from '@ethercorps/sveltekit-og';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const title = url.searchParams.get('title') ?? 'Support Creators You Love';
	const description =
		url.searchParams.get('description') ?? 'Simple, secure donations for the creator economy';
	const page = url.searchParams.get('page') ?? 'home';

	// Different colors for each page using your site's color scheme
	const themes: Record<string, { bg: string; accent: string }> = {
		home: { bg: 'oklch(72.712% 0.13936 37.882)', accent: 'rgba(255, 255, 255, 0.2)' },
		about: { bg: 'oklch(0.64 0.21 25.39)', accent: 'rgba(255, 255, 255, 0.2)' },
		donations: { bg: 'oklch(0.59 0.2 277.06)', accent: 'rgba(255, 255, 255, 0.2)' },
		donate: { bg: 'oklch(0.51 0.23 276.97)', accent: 'rgba(255, 255, 255, 0.2)' }
	};

	const theme = themes[page] || themes.home;

	const template = `
    <div class="flex w-full h-full items-center justify-center" style="background: ${theme.bg};">
      <div class="flex flex-col py-12 px-16 w-full">
        
        <div class="flex items-center mb-12">
          <div class="flex items-center justify-center bg-white rounded-lg mr-4" style="width: 48px; height: 48px;">
            <div class="text-2xl font-black" style="color: ${theme.bg};">D</div>
          </div>
          <h2 class="text-3xl font-bold text-white">DonationsApp</h2>
        </div>
        
        <h1 class="text-7xl font-black text-white mb-8" style="line-height: 1.1;">
          ${title}
        </h1>
        
        <p class="text-3xl text-white mb-12" style="opacity: 0.9;">${description}</p>
        
        <div class="flex items-center">
          <div class="bg-white rounded-full mr-3" style="width: 8px; height: 8px;"></div>
          <div class="text-white text-xl font-medium" style="opacity: 0.85;">Simple • Secure • Creator-focused</div>
        </div>
      </div>
    </div>
  `;

	return new ImageResponse(template, {
		height: 630,
		width: 1200,
		debug: false
	});
};
