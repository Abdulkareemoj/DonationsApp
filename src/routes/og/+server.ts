import { ImageResponse } from '@ethercorps/sveltekit-og';
import type { RequestHandler } from '@sveltejs/kit';

const template = `
<div class="flex bg-[#f08564] w-full h-full items-center justify-center p-4">
    <div class="flex flex-col w-full h-full p-10">
        <div class="flex flex-col flex-grow justify-center">
            <h1 class="text-6xl font-bold  leading-tight">
                Support Creators You Love
            </h1>
            <p class="text-3xl text-gray-300 mt-4">
                Simple, secure donations for the creator economy.
            </p>
        </div>
        <div class="flex justify-between items-end text-2xl">
            <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-indigo-400 mr-3">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                    <path d="M2 17l10 5 10-5"></path>
                    <path d="M2 12l10 5 10-5"></path>
                </svg>
                <span class="font-bold text-white">DonationsApp</span>
            </div>
            <div class="text-gray-400">Simple • Secure • Creator-focused</div>
        </div>
    </div>
</div>`;

export const GET: RequestHandler = async () => {
	return new ImageResponse(template, {
		height: 400,
		width: 800,
		debug: false
	});
};
