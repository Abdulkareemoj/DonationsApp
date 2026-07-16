<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { ExternalLink, Globe } from '@lucide/svelte';

	export let creatorName: string;
	export let tagline: string;
	export let bio: string;
	export let twitter: string;
	export let github: string;
	export let website: string;
	export let supporters: number = 0;

	const initials = creatorName
		.split(' ')
		.map((n) => n[0])
		.join('')
		.toUpperCase()
		.slice(0, 2);

	const socialLinks = [
		{ icon: ExternalLink, href: `https://twitter.com/${twitter}`, label: 'Twitter', show: !!twitter },
		{ icon: ExternalLink, href: `https://github.com/${github}`, label: 'GitHub', show: !!github },
		{ icon: Globe, href: website, label: 'Website', show: !!website }
	].filter((l) => l.show);
</script>

<div class="bg-card brutal p-6">
	<div class="flex items-center gap-3">
		<div
			class="bg-primary text-ink flex size-12 items-center justify-center rounded-md border-2 border-ink font-bold text-sm"
		>
			{initials}
		</div>
		<div class="flex-1 min-w-0">
			<h2 class="text-h3 text-ink truncate">{creatorName}</h2>
			<p class="text-caption text-muted-foreground truncate">{tagline}</p>
		</div>
	</div>

	<p class="text-body text-ink/80 mt-4">{bio}</p>

	<div class="mt-4 flex items-center gap-2">
		{#if socialLinks.length > 0}
			<div class="flex gap-1">
				{#each socialLinks as link}
					<a
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						class="hover:bg-muted inline-flex size-8 items-center justify-center rounded border-2 border-ink/20 text-ink/60 transition-colors"
						aria-label={link.label}
					>
						<link.icon class="size-4" />
					</a>
				{/each}
			</div>
		{/if}
		<Badge variant="secondary" class="ml-auto border-2 border-ink/20 text-caption">
			{supporters} supporters
		</Badge>
	</div>


</div>
