<script lang="ts">
  import { cn } from "$lib/utils";

  let className: any = "p-4";
  export { className as class };
  let cardContent = {
    title: "Svelte is Vibe",
    description:
      "Svelte is a fun way to build web applications.",
  };
</script>

<div class={cn("text-left", className)}>
  <h3 class="text-lg font-bold mb-1 text-card-foreground">
    {cardContent.title}
  </h3>
  <p class="text-muted-foreground">
    {cardContent.description}
  </p>

</div>