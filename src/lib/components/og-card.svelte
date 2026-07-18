<svelte:options css="injected" />

<script lang="ts">
	let {
		title = 'DonationsApp',
		description = 'A lightweight donation page for creators.',
		page = 'default'
	}: {
		title: string;
		description: string;
		page: string;
	} = $props();

	const accentColor = $derived(
		page === 'donationspage' ? '#fdc800' :
		page === 'donationslist' ? '#432dd7' :
		page === 'about' ? '#e8ffe0' :
		'#fdc800'
	);

	const label = $derived(
		page === 'donationspage' ? 'Donate' :
		page === 'donationslist' ? 'Supporters' :
		page === 'about' ? 'About' :
		'DonationsApp'
	);
</script>

<div
	style="
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		background-color: #fbfbf9;
		font-family: 'Inter';
		position: relative;
		overflow: hidden;
	"
>
	<!-- Top border accent -->
	<div style="
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 8px;
		background-color: {accentColor};
		border-bottom: 3px solid #1c293c;
	"></div>

	<!-- Main content -->
	<div style="
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 80px 72px 60px;
		flex: 1;
	">

		<!-- Page label badge -->
		<div style="
			display: inline-flex;
			align-self: flex-start;
			background-color: {accentColor};
			color: #1c293c;
			border: 2px solid #1c293c;
			border-radius: 4px;
			padding: 6px 14px;
			font-size: 14px;
			font-weight: 700;
			letter-spacing: 0.05em;
			text-transform: uppercase;
			margin-bottom: 28px;
			box-shadow: 2px 2px 0 #1c293c;
		">
			{label}
		</div>

		<!-- Title -->
		<h1 style="
			font-size: 64px;
			font-weight: 900;
			color: #1c293c;
			line-height: 1.0;
			letter-spacing: -0.03em;
			margin: 0 0 20px 0;
			max-width: 820px;
		">
			{title}
		</h1>

		<!-- Description -->
		<p style="
			font-size: 24px;
			font-weight: 400;
			color: #6d7a8d;
			line-height: 1.5;
			margin: 0;
			max-width: 700px;
		">
			{description}
		</p>
	</div>

	<!-- Bottom bar -->
	<div style="
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 24px 72px;
		border-top: 3px solid #1c293c;
		background-color: #ffffff;
	">
		<div style="
			display: flex;
			align-items: center;
			gap: 12px;
		">
			<div style="
				width: 36px;
				height: 36px;
				background-color: #fdc800;
				border: 2px solid #1c293c;
				border-radius: 4px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 18px;
				font-weight: 900;
				color: #1c293c;
				box-shadow: 2px 2px 0 #1c293c;
			">
				D
			</div>
			<span style="
				font-size: 18px;
				font-weight: 700;
				color: #1c293c;
				letter-spacing: -0.01em;
			">
				DonationsApp
			</span>
		</div>

		<div style="
			font-size: 14px;
			font-weight: 500;
			color: #6d7a8d;
		">
			Powered by Paystack
		</div>
	</div>

	<!-- Decorative corner elements -->
	<div style="
		position: absolute;
		bottom: 80px;
		right: 60px;
		width: 80px;
		height: 80px;
		border: 3px solid #1c293c;
		border-radius: 8px;
		background-color: {accentColor};
		opacity: 0.15;
	"></div>
	<div style="
		position: absolute;
		bottom: 100px;
		right: 80px;
		width: 60px;
		height: 60px;
		border: 3px solid #1c293c;
		border-radius: 8px;
		background-color: {accentColor};
		opacity: 0.1;
	"></div>
</div>
