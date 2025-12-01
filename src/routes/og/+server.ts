import { ImageResponse } from '@ethercorps/sveltekit-og';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ url }) => {
	const title = url.searchParams.get('title') ?? 'DonationsApp';
	const description = url.searchParams.get('description') ?? 'Support creators you love';
	const page = url.searchParams.get('page') ?? 'home';

	// Different gradient colors for each page
	const gradients: Record<string, string> = {
		home: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
		about: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
		donations: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
		donate: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
	};

	const gradient = gradients[page] || gradients.home;

	const html = `
    <div style="
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      padding: 80px;
      background: ${gradient};
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      justify-content: space-between;
    ">
      <!-- Logo/Brand at top -->
      <div style="display: flex; align-items: center; gap: 12px;">
        <div style="
          width: 48px;
          height: 48px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
        ">💝</div>
        <span style="font-size: 24px; font-weight: 600; opacity: 0.95;">DonationsApp</span>
      </div>

      <!-- Main content -->
      <div style="display: flex; flex-direction: column; gap: 20px;">
        <h1 style="
          font-size: 72px;
          font-weight: 800;
          margin: 0;
          line-height: 1.1;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
        ">${title}</h1>
        <p style="
          font-size: 32px;
          margin: 0;
          opacity: 0.9;
          font-weight: 400;
          max-width: 900px;
        ">${description}</p>
      </div>

      <!-- Footer badge -->
      <div style="display: flex; align-items: center; gap: 8px; opacity: 0.8;">
        <div style="
          width: 8px;
          height: 8px;
          background: white;
          border-radius: 50%;
        "></div>
        <span style="font-size: 18px;">Simple • Secure • Creator-focused</span>
      </div>
    </div>
  `;

	return new ImageResponse(html, {
		width: 1200,
		height: 630
	});
};
