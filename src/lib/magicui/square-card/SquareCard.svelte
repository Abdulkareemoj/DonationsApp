<script lang="ts">
	import CardBody from './CardBody.svelte';
	import CardIcon from './CardIcon.svelte';
	export let title: string;
	export let description: string;
</script>

<div>
	<div class="border-border bg-card relative h-full border border-dashed">
		<CardIcon class="-top-3 -left-3" />
		<CardIcon class="-top-3 -right-3" />
		<CardIcon class="-bottom-3 -left-3" />
		<CardIcon class="-right-3 -bottom-3" />
		<CardBody class="p-10" {title} {description} />
	</div>
</div>
