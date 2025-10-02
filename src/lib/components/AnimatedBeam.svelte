<script lang="ts">
	import { browser } from '$app/environment';
	import { cn } from '$lib/utils';
	import { onMount, tick } from 'svelte';
	import { M, Motion } from 'svelte-motion';

	let className: any = '';
	export { className as class };
	export let containerRef: HTMLElement;
	export let fromRef: HTMLElement;
	export let toRef: HTMLElement;
	export let curvature = 0;
	export let reverse = false;
	export let duration = Math.random() * 3 + 4;
	export let delay = 0;
	export let pathColor = 'gray';
	export let pathWidth = 2;
	export let pathOpacity = 0.2;
	export let gradientStartColor = '#ffaa40';
	export let gradientStopColor = '#9c40ff';
	export let startXOffset = 0;
	export let startYOffset = 0;
	export let endXOffset = 0;
	export let endYOffset = 0;

	let id = crypto.randomUUID().slice(0, 8);
	let pathD = '';
	let svgDimensions = { width: 0, height: 0 };

	let gradientCoordinates = reverse
		? {
				x1: ['90%', '-10%'],
				x2: ['100%', '0%'],
				y1: ['0%', '0%'],
				y2: ['0%', '0%']
		  }
		: {
				x1: ['10%', '110%'],
				x2: ['0%', '100%'],
				y1: ['0%', '0%'],
				y2: ['0%', '0%']
		  };

	const updatePath = () => {
		if (!containerRef || !fromRef || !toRef) return;

		const containerRect = containerRef.getBoundingClientRect();
		const rectA = fromRef.getBoundingClientRect();
		const rectB = toRef.getBoundingClientRect();

		svgDimensions.width = containerRect.width;
		svgDimensions.height = containerRect.height;

		const startX = rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
		const startY = rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
		const endX = rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
		const endY = rectB.top - containerRect.top + rectB.height / 2 + endYOffset;

		const controlY = startY - curvature;
		pathD = `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`;
	};

	onMount(() => {
		const init = async () => {
			await tick();
			updatePath();

			const resizeObserver = new ResizeObserver(() => {
				updatePath();
			});

			if (containerRef) {
				resizeObserver.observe(containerRef);
			}

			return () => {
				resizeObserver.disconnect();
			};
		};
		init();
	});
</script>

{#if browser}
	<svg
		fill="none"
		width={svgDimensions.width}
		height={svgDimensions.height}
		xmlns="http://www.w3.org/2000/svg"
		class={cn('pointer-events-none absolute left-0 top-0 transform-gpu stroke-2', className)}
		viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
	>
		<path
			d={pathD}
			stroke={pathColor}
			stroke-width={pathWidth}
			stroke-opacity={pathOpacity}
			stroke-linecap="round"
		/>
		<path d={pathD} stroke-width={pathWidth} stroke={`url(#${id})`} stroke-opacity="1" stroke-linecap="round" />
		<defs>
			<M.linearGradient />
			<Motion
				initial={{
					x1: '0%',
					x2: '0%',
					y1: '0%',
					y2: '0%'
				}}
				animate={{
					x1: gradientCoordinates.x1,
					x2: gradientCoordinates.x2,
					y1: gradientCoordinates.y1,
					y2: gradientCoordinates.y2
				}}
				transition={{
					delay,
					duration,
					ease: [0.16, 1, 0.3, 1],
					repeat: Infinity,
					repeatDelay: 0
				}}
				isSVG={true}
				let:motion
			>
				<linearGradient use:motion id={id} gradientUnits="userSpaceOnUse" class="transform-gpu">
					<stop stop-color={gradientStartColor} stop-opacity="0" />
					<stop stop-color={gradientStartColor} />
					<stop offset="32.5%" stop-color={gradientStopColor} />
					<stop offset="100%" stop-color={gradientStopColor} stop-opacity="0" />
				</linearGradient>
			</Motion>
		</defs>
	</svg>
{/if}