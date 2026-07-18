import { ImageResponse } from '@ethercorps/sveltekit-og';
import { GoogleFont, resolveFonts } from '@ethercorps/sveltekit-og/fonts';
import type { RequestHandler } from '@sveltejs/kit';

const PAGES: Record<string, { title: string; description: string; label: string; accent: string }> = {
	donationspage: {
		title: 'Buy me a coffee.\nFund the next drop.',
		description: 'Support a creator with a one-time or monthly donation via Paystack.',
		label: 'Donate',
		accent: '#fdc800'
	},
	donationslist: {
		title: 'Wall of love.\nEvery naira counts.',
		description: 'See who has been supporting the mission.',
		label: 'Supporters',
		accent: '#432dd7'
	},
	about: {
		title: 'No signups.\nJust code you own.',
		description: 'A lightweight donation page for creators.',
		label: 'About',
		accent: '#e8ffe0'
	}
};

function buildHTML(title: string, description: string, label: string, accent: string): string {
	const titleLines = title.split('\n').map((l) => `<span style="display:block">${l}</span>`).join('');

	return `
<div style="display:flex;flex-direction:column;width:100%;height:100%;background-color:#fbfbf9;font-family:'Inter';position:relative;overflow:hidden">
  <div style="position:absolute;top:0;left:0;right:0;height:8px;background-color:${accent};border-bottom:3px solid #1c293c"></div>

  <div style="display:flex;flex-direction:column;justify-content:center;padding:80px 72px 60px;flex:1">
    <div style="display:inline-flex;align-self:flex-start;background-color:${accent};color:#1c293c;border:2px solid #1c293c;border-radius:4px;padding:6px 14px;font-size:14px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;margin-bottom:28px;box-shadow:2px 2px 0 #1c293c">
      ${label}
    </div>

    <h1 style="font-size:64px;font-weight:900;color:#1c293c;line-height:1.0;letter-spacing:-0.03em;margin:0 0 20px 0;max-width:820px">
      ${titleLines}
    </h1>

    <p style="font-size:24px;font-weight:400;color:#6d7a8d;line-height:1.5;margin:0;max-width:700px">
      ${description}
    </p>
  </div>

  <div style="display:flex;align-items:center;justify-content:space-between;padding:24px 72px;border-top:3px solid #1c293c;background-color:#ffffff">
    <div style="display:flex;align-items:center;gap:12px">
      <div style="width:36px;height:36px;background-color:#fdc800;border:2px solid #1c293c;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:900;color:#1c293c;box-shadow:2px 2px 0 #1c293c">
        D
      </div>
      <span style="font-size:18px;font-weight:700;color:#1c293c;letter-spacing:-0.01em">
        DonationsApp
      </span>
    </div>
    <div style="font-size:14px;font-weight:500;color:#6d7a8d">
      Powered by Paystack
    </div>
  </div>

  <div style="position:absolute;bottom:80px;right:60px;width:80px;height:80px;border:3px solid #1c293c;border-radius:8px;background-color:${accent};opacity:0.15"></div>
  <div style="position:absolute;bottom:100px;right:80px;width:60px;height:60px;border:3px solid #1c293c;border-radius:8px;background-color:${accent};opacity:0.1"></div>
</div>`;
}

export const GET: RequestHandler = async ({ url }) => {
	try {
		const page = url.searchParams.get('page') ?? 'default';
		const pageConfig = PAGES[page] ?? {
			title: 'DonationsApp',
			description: 'A lightweight donation page for creators.',
			label: 'DonationsApp',
			accent: '#fdc800'
		};

		const fonts = await resolveFonts([
			new GoogleFont('Inter', { weight: 400, name: 'Inter' }),
			new GoogleFont('Inter', { weight: 700 }),
			new GoogleFont('Inter', { weight: 900 })
		]);

		const html = buildHTML(
			pageConfig.title,
			pageConfig.description,
			pageConfig.label,
			pageConfig.accent
		);

		return new ImageResponse(html, {
			width: 1200,
			height: 630,
			fonts
		});
	} catch (e) {
		console.error('OG generation failed:', e);
		return new Response('OG generation failed', { status: 500 });
	}
};
