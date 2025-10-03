<script lang="ts">
	import Ellipses from './Ellipses.svelte';
</script>

<div
	class="border-border bg-card relative mx-auto w-full rounded-lg border border-dashed px-4 shadow-sm sm:px-6 md:px-8"
>
	<div class="bg-border absolute top-4 left-0 -z-0 h-px w-full sm:top-6 md:top-8"></div>
	<div class="bg-border absolute bottom-4 left-0 z-0 h-px w-full sm:bottom-6 md:bottom-8"></div>
	<div class="border-border relative w-full border-x">
		<Ellipses />
		<div class="relative z-20 mx-auto rounded-4xl py-9 sm:py-12 md:py-16">
			<slot>Default</slot>
		</div>
	</div>
</div>
