
  // * Svelte 5 rune-based port of the React useScroll hook.
  // * `.svelte.ts` files can use runes ($state, $effect) outside of components.

export function useScroll(downThreshold: number, upThreshold?: number) {
	let scrolled = $state(false);
	const scrollUpThreshold = upThreshold ?? downThreshold / 2;

	$effect(() => {
		const handleScroll = () => {
			const y = window.scrollY;
			// Hysteresis: different thresholds for up/down to prevent flickering
			if (scrolled) {
				// Currently scrolled - only unscroll when below lower threshold
				scrolled = y > scrollUpThreshold;
			} else {
				// Currently not scrolled - only scroll when above higher threshold
				scrolled = y > downThreshold;
			}
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();

		return () => window.removeEventListener("scroll", handleScroll);
	});

	return {
		get scrolled() {
			return scrolled;
		}
	};
}
