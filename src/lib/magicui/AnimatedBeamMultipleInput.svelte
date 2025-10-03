<script lang="ts">
	import { cn } from '$lib/utils';
	import AnimatedBeam from './AnimatedBeam.svelte';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Tooltip from '$lib/components/ui/tooltip';

	let containerRef: HTMLElement;
	let div1Ref: HTMLElement;
	let div2Ref: HTMLElement;
	let div3Ref: HTMLElement;
	let div4Ref: HTMLElement;
	let div5Ref: HTMLElement;
	let div6Ref: HTMLElement;
	let div7Ref: HTMLElement;

	let className: any = '';
	export { className as class };
</script>

<div
	bind:this={containerRef}
	class={cn(
		'bg-background relative mx-auto flex w-full max-w-[500px] items-center justify-center overflow-hidden rounded-lg ',
		className
	)}
>
	<div
		class="absolute top-0 right-5 h-px w-1/2 bg-gradient-to-l from-transparent via-white/30 via-10% to-transparent"
	/>

	<div class="flex h-full w-full flex-row items-center justify-between gap-10">
		<div class="flex flex-col justify-center gap-2">
			<div bind:this={div1Ref}>
				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger>
							<Avatar.Root>
								<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
								<Avatar.Fallback>CN</Avatar.Fallback>
							</Avatar.Root>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>Donation: $50</p>
						</Tooltip.Content>
					</Tooltip.Root></Tooltip.Provider
				>
			</div>
			<div bind:this={div2Ref}>
				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger>
							<Avatar.Root>
								<Avatar.Image src="https://github.com/sveltejs.png" alt="@sveltejs" />
								<Avatar.Fallback>SV</Avatar.Fallback>
							</Avatar.Root>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>Donation: $25</p>
						</Tooltip.Content>
					</Tooltip.Root></Tooltip.Provider
				>
			</div>
			<div bind:this={div3Ref}>
				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger>
							<Avatar.Root>
								<Avatar.Image src="https://github.com/tailwindcss.png" alt="@tailwindcss" />
								<Avatar.Fallback>TW</Avatar.Fallback>
							</Avatar.Root>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>Donation: $100</p>
						</Tooltip.Content>
					</Tooltip.Root></Tooltip.Provider
				>
			</div>
			<div bind:this={div4Ref}>
				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger>
							<Avatar.Root>
								<Avatar.Image src="https://github.com/vercel.png" alt="@vercel" />
								<Avatar.Fallback>VC</Avatar.Fallback>
							</Avatar.Root>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>Donation: $10</p>
						</Tooltip.Content>
					</Tooltip.Root></Tooltip.Provider
				>
			</div>
			<div bind:this={div5Ref}>
				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger>
							<Avatar.Root>
								<Avatar.Image src="https://github.com/vitejs.png" alt="@vitejs" />
								<Avatar.Fallback>VT</Avatar.Fallback>
							</Avatar.Root>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>Donation: $75</p>
						</Tooltip.Content>
					</Tooltip.Root></Tooltip.Provider
				>
			</div>
		</div>
		<div class="flex flex-col justify-center">
			<div bind:this={div6Ref}>
				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger>
							<Avatar.Root>
								<Avatar.Image src="https://github.com/monicahq.png" alt="@monicahq" />
								<Avatar.Fallback>MH</Avatar.Fallback>
							</Avatar.Root>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>Recipient</p>
						</Tooltip.Content>
					</Tooltip.Root></Tooltip.Provider
				>
			</div>
		</div>
		<div class="flex flex-col justify-center">
			<div bind:this={div7Ref}>
				<Tooltip.Provider>
					<Tooltip.Root>
						<Tooltip.Trigger>
							<Avatar.Root>
								<Avatar.Image src="https://github.com/jack.png" alt="@jack" />
								<Avatar.Fallback>J</Avatar.Fallback>
							</Avatar.Root>
						</Tooltip.Trigger>
						<Tooltip.Content>
							<p>You</p>
						</Tooltip.Content>
					</Tooltip.Root></Tooltip.Provider
				>
			</div>
		</div>
	</div>

	<AnimatedBeam {containerRef} fromRef={div1Ref} toRef={div6Ref} />
	<AnimatedBeam {containerRef} fromRef={div2Ref} toRef={div6Ref} />
	<AnimatedBeam {containerRef} fromRef={div3Ref} toRef={div6Ref} />
	<AnimatedBeam {containerRef} fromRef={div4Ref} toRef={div6Ref} />
	<AnimatedBeam {containerRef} fromRef={div5Ref} toRef={div6Ref} />
	<AnimatedBeam {containerRef} fromRef={div6Ref} toRef={div7Ref} />
</div>
