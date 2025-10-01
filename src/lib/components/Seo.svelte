<script lang="ts">
  export let title: string = 'DonationsApp — Support creators you love';
  export let description: string = 'A simple way to support your favorite creators with one-time or monthly donations.';
  export let image: string = '/favicon.png';
  export let type: string = 'website';
  export let siteName: string = 'DonationsApp';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:site_name" content={siteName} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:type" content={type} />
  <meta property="og:image" content={image} />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={image} />
</svelte:head>


