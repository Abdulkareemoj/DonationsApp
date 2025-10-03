<script lang="ts">
  import { cn } from "$lib/utils";

  let className: any = "";
  export { className as class };

  export let title: string;
  export let description: string;
</script>

<div class={cn("text-left", className)}>
  <h3
    class="text-lg  font-bold  text-card-foreground"
  >
    {title}
  </h3>
  <p class="text-muted-foreground">
    {description}
  </p>
</div>