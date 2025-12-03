// src/routes/og/+server.ts
import { ImageResponse } from '@ethercorps/sveltekit-og';
import type { RequestHandler } from '@sveltejs/kit';

const template = `
  <div class="flex w-full h-full" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 80px;">
    <div class="flex flex-col w-full h-full justify-between">
      
      <div class="flex items-center">
        <div class="flex items-center justify-center bg-white" style="width: 60px; height: 60px; border-radius: 16px; font-size: 36px; margin-right: 20px;">
          💝
        </div>
        <div class="text-white font-bold" style="font-size: 32px;">
          DonationsApp
        </div>
      </div>

      <div class="flex flex-col" style="max-width: 900px;">
        <h1 class="text-white font-black" style="font-size: 76px; line-height: 1.1; margin: 0 0 24px 0;">
          Support Creators You Love
        </h1>
        <p class="text-white" style="font-size: 36px; opacity: 0.95; line-height: 1.4; margin: 0;">
          Simple, secure donations for the creator economy
        </p>
      </div>

      <div class="flex items-center">
        <div class="bg-white" style="width: 12px; height: 12px; border-radius: 50%; margin-right: 12px;"></div>
        <div class="text-white font-medium" style="font-size: 24px; opacity: 0.9;">
          Simple • Secure • Creator-focused
        </div>
      </div>

    </div>
  </div>
`;

export const GET: RequestHandler = async () => {
	return new ImageResponse(template, {
		width: 1200,
		height: 630,
		debug: false
	});
};
