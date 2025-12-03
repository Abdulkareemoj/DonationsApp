<!-- src/lib/components/og/og-card.svelte -->
<script lang="ts">
	let {
		title = 'DonationsApp',
		description = 'Support creators you love',
		page = 'home'
	} = $props();

	const themes: Record<string, { from: string; to: string; emoji: string }> = {
		home: { from: '#667eea', to: '#764ba2', emoji: '💝' },
		about: { from: '#f093fb', to: '#f5576c', emoji: '✨' },
		donations: { from: '#4facfe', to: '#00f2fe', emoji: '💰' },
		donate: { from: '#43e97b', to: '#38f9d7', emoji: '🎁' }
	};

	const theme = themes[page] || themes.home;
</script>

<div
	class="relative flex h-full w-full"
	style="background: linear-gradient(135deg, {theme.from} 0%, {theme.to} 100%)"
>
	<!-- Decorative circles -->
	<div
		class="absolute rounded-full"
		style="top: -100px; right: -100px; width: 400px; height: 400px; background: rgba(255, 255, 255, 0.1);"
	></div>
	<div
		class="absolute rounded-full"
		style="bottom: -150px; left: -150px; width: 500px; height: 500px; background: rgba(0, 0, 0, 0.1);"
	></div>

	<!-- Content -->
	<div class="relative z-10 flex h-full w-full flex-col justify-between" style="padding: 80px;">
		<!-- Header -->
		<div class="flex items-center">
			<div
				class="flex items-center justify-center rounded-2xl bg-white"
				style="width: 60px; height: 60px; font-size: 36px; margin-right: 20px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);"
			>
				{theme.emoji}
			</div>
			<div class="font-bold text-white" style="font-size: 32px;">DonationsApp</div>
		</div>

		<!-- Main content -->
		<div class="flex flex-col" style="max-width: 900px;">
			<h1
				class="mb-6 font-black text-white"
				style="font-size: 76px; line-height: 1.1; letter-spacing: -0.02em; margin: 0 0 24px 0;"
			>
				{title}
			</h1>
			<p
				class="font-normal text-white"
				style="font-size: 36px; opacity: 0.95; line-height: 1.4; margin: 0;"
			>
				{description}
			</p>
		</div>

		<!-- Footer -->
		<div class="flex items-center">
			<div
				class="rounded-full bg-white"
				style="width: 12px; height: 12px; margin-right: 12px;"
			></div>
			<div class="font-medium text-white" style="font-size: 24px; opacity: 0.9;">
				Simple • Secure • Creator-focused
			</div>
		</div>
	</div>
</div>
