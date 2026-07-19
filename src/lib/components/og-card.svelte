<script lang="ts">
	let {
		title = 'DonationsApp',
		description = 'A lightweight donation page for creators.',
		label = 'DonationsApp',
		accent = '#fdc800'
	}: {
		title: string;
		description: string;
		label: string;
		accent: string;
	} = $props();

	const titleLines = $derived(title.split('\n'));

	const barWidths = [100, 80, 60, 90, 70, 50, 85, 75, 95, 65];
</script>

<div style="display:flex;flex-direction:column;width:100%;height:100%;background-color:#fbfbf9;font-family:'Inter',sans-serif;border:4px solid #1c293c">
	<div style="display:flex;flex-direction:row;flex:1">
		<div style="display:flex;flex-direction:column;flex:1;padding:64px 56px 40px">
			<div style="display:flex;align-self:flex-start;background-color:{accent};color:#1c293c;border:3px solid #1c293c;border-radius:4px;padding:6px 16px;font-size:13px;font-weight:800;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:28px;box-shadow:3px 3px 0 #1c293c;font-family:'Inter',sans-serif">
				{label}
			</div>
			<div style="display:flex;flex-direction:column;margin-bottom:20px">
				{#each titleLines as line}
					<div style="display:flex;font-size:56px;font-weight:900;color:#1c293c;line-height:1.05;letter-spacing:-0.04em;font-family:'Inter',sans-serif">{line}</div>
				{/each}
			</div>
			<div style="display:flex;font-size:20px;font-weight:400;color:#6d7a8d;line-height:1.5;max-width:560px;font-family:'Inter',sans-serif">
				{description}
			</div>
			<div style="display:flex;margin-top:32px;gap:10px">
				<div style="display:flex;background-color:#1c293c;color:#ffffff;border:3px solid #1c293c;border-radius:4px;padding:10px 22px;font-size:15px;font-weight:800;font-family:'Inter',sans-serif">
					Donate now
				</div>
				<!-- <div style="display:flex;background-color:{accent};color:#1c293c;border:3px solid #1c293c;border-radius:4px;padding:10px 22px;font-size:15px;font-weight:800;box-shadow:3px 3px 0 #1c293c;font-family:'Inter',sans-serif">
					donationsapp.vercel.app
				</div> -->
			</div>
		</div>
		<div style="display:flex;flex-direction:column;width:260px;background-color:{accent};border-left:4px solid #1c293c;padding:40px 28px;justify-content:space-between">
			<div style="display:flex;flex-direction:column;gap:10px">
				{#each barWidths as w}
					<div style="display:flex;width:{w}%;height:10px;background-color:#1c293c;border-radius:2px;opacity:0.15"></div>
				{/each}
			</div>
			<div style="display:flex;flex-direction:column">
				<div style="display:flex;width:56px;height:56px;background-color:#1c293c;border:3px solid #1c293c;border-radius:6px;align-items:center;justify-content:center;margin-bottom:14px;box-shadow:4px 4px 0 #1c293c">
					<div style="display:flex;font-size:28px;font-weight:900;color:{accent};font-family:'Inter',sans-serif">D</div>
				</div>
				<div style="display:flex;font-size:18px;font-weight:900;color:#1c293c;letter-spacing:-0.02em;font-family:'Inter',sans-serif">DonationsApp</div>
				<div style="display:flex;font-size:12px;font-weight:600;color:#1c293c;opacity:0.5;margin-top:4px;font-family:'Inter',sans-serif">For Creators</div>
				<div style="display:flex;margin-top:16px;border:3px solid #1c293c;border-radius:4px;background-color:#fbfbf9;padding:8px 14px;box-shadow:3px 3px 0 #1c293c">
					<div style="display:flex;font-size:11px;font-weight:700;color:#1c293c;letter-spacing:0.04em;text-transform:uppercase;font-family:'Inter',sans-serif">open source</div>
				</div>
			</div>
		</div>
	</div>
	<div style="display:flex;align-items:center;justify-content:space-between;padding:12px 56px;border-top:4px solid #1c293c;background-color:#1c293c">
		<div style="display:flex;font-size:11px;font-weight:600;color:#fbfbf9;opacity:0.5;letter-spacing:0.03em;font-family:'Inter',sans-serif">
			Self-hosted donation page for creators
		</div>
		<div style="display:flex;gap:12px">
			<div style="display:flex;background-color:#fbfbf9;border:2px solid #1c293c;border-radius:3px;padding:3px 10px;font-size:10px;font-weight:800;color:#1c293c;letter-spacing:0.04em;text-transform:uppercase;font-family:'Inter',sans-serif">paystack</div>
			<div style="display:flex;background-color:#fbfbf9;border:2px solid #1c293c;border-radius:3px;padding:3px 10px;font-size:10px;font-weight:800;color:#1c293c;letter-spacing:0.04em;text-transform:uppercase;font-family:'Inter',sans-serif">airtable</div>
			<div style="display:flex;background-color:#fbfbf9;border:2px solid #1c293c;border-radius:3px;padding:3px 10px;font-size:10px;font-weight:800;color:#1c293c;letter-spacing:0.04em;text-transform:uppercase;font-family:'Inter',sans-serif">svelte</div>
		</div>
	</div>
</div>
