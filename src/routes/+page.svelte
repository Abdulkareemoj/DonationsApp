<script>
  // Creator information
  const creator = {
    name: "Sarah Johnson",
    tagline: "Digital Artist & Illustrator",
    avatar: "/placeholder.svg?height=150&width=150",
    description: "I create digital art and illustrations inspired by nature and fantasy. Your support helps me continue creating and sharing my work with the world."
  };

  // Handle support button click
  function handleSupportClick() {
    alert("Thank you for your support!");
    // In a real app, this would open a payment modal or redirect to a payment page
  }
  import Seo from '$lib/components/Seo.svelte'
 </script>
<Seo title="DonationsApp — Home" description="Support creators you love with one-time or monthly donations." />

<main class="min-h-screen bg-background text-foreground">
  <!-- Decorative background -->
  <div aria-hidden="true" class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
    <div class="absolute left-1/2 top-[-120px] h-[300px] w-[800px] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"></div>
    <div class="absolute right-[-200px] bottom-[-120px] h-[240px] w-[480px] rounded-full bg-muted/60 blur-3xl"></div>
  </div>

  <!-- Hero Section -->
  <section class="w-full py-16 md:py-28 lg:py-32" style="view-transition-name: hero-section">
    <div class="container px-4 md:px-6">
      <div class="grid items-center gap-8 lg:grid-cols-2">
        <div class="space-y-6 text-center lg:text-left">
          <span class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
            <span class="h-1.5 w-1.5 rounded-full bg-primary"></span>
            Crowdfunding for creators
          </span>
          <h1 class="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl" style="view-transition-name: main-heading">
            Support creators you love, in seconds
          </h1>
          <p class="mx-auto max-w-[620px] text-muted-foreground md:text-lg lg:mx-0">
            Beautiful, simple donations for your audience. One-time or monthly, with secure checkout and instant notifications.
          </p>
          <div class="flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a href="/donationspage" class="inline-flex h-11 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90" style="view-transition-name: get-started-button">Get Started</a>
            <a href="/about" class="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground">Learn More</a>
          </div>
          <div class="mt-4 flex items-center justify-center gap-6 text-xs text-muted-foreground lg:justify-start">
            <div class="flex items-center gap-2"><span class="h-2 w-2 rounded-full bg-emerald-500"></span> No platform lock-in</div>
            <div class="flex items-center gap-2"><span class="h-2 w-2 rounded-full bg-blue-500"></span> Low fees</div>
            <div class="flex items-center gap-2"><span class="h-2 w-2 rounded-full bg-amber-500"></span> Secure payments</div>
          </div>
        </div>
        <div class="relative mx-auto w-full max-w-xl">
          <div class="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary/20 to-transparent blur-2xl"></div>
          <div class="relative rounded-2xl border bg-card/70 p-6 shadow-sm backdrop-blur" style="view-transition-name: hero-card">
            <div class="flex items-center gap-4">
              <img src={creator.avatar} alt="Avatar" class="h-14 w-14 rounded-full" style="view-transition-name: creator-avatar" />
              <div>
                <p class="text-sm text-muted-foreground">Featured creator</p>
                <p class="font-semibold">{creator.name}</p>
              </div>
            </div>
            <p class="mt-4 text-sm text-muted-foreground">“{creator.description}”</p>
            <div class="mt-6 grid grid-cols-3 divide-x rounded-lg border">
              <div class="p-4 text-center">
                <div class="text-2xl font-bold">12k+</div>
                <div class="text-xs text-muted-foreground">Supporters</div>
              </div>
              <div class="p-4 text-center">
                <div class="text-2xl font-bold">$480k</div>
                <div class="text-xs text-muted-foreground">Raised</div>
              </div>
              <div class="p-4 text-center">
                <div class="text-2xl font-bold">92%</div>
                <div class="text-xs text-muted-foreground">Recurring</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Logos / Social proof -->
  <section class="w-full py-8">
    <div class="container px-4 md:px-6">
      <div class="flex flex-wrap items-center justify-center gap-8 opacity-70">
        <div class="text-xs">Trusted by thousands of creators worldwide</div>
      </div>
    </div>
  </section>

 <!-- Features Section -->
  <section id="features" class="w-full bg-muted/40 py-12 md:py-20">
    <div class="container px-4 md:px-6">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to get supported</h2>
        <p class="mt-3 text-muted-foreground">From a beautiful donation page to seamless payments and analytics, we’ve got you covered.</p>
      </div>
      <div class="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        <div class="rounded-xl border bg-card p-6 shadow-xs">
          <div class="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">💳</div>
          <h3 class="text-lg font-semibold">Fast, secure checkout</h3>
          <p class="mt-2 text-sm text-muted-foreground">Optimized checkout with top payment providers and fraud protection.</p>
        </div>
        <div class="rounded-xl border bg-card p-6 shadow-xs">
          <div class="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">📈</div>
          <h3 class="text-lg font-semibold">Insights & analytics</h3>
          <p class="mt-2 text-sm text-muted-foreground">Track donations, recurring revenue and supporter growth in real-time.</p>
        </div>
        <div class="rounded-xl border bg-card p-6 shadow-xs">
          <div class="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">🔗</div>
          <h3 class="text-lg font-semibold">Share anywhere</h3>
          <p class="mt-2 text-sm text-muted-foreground">A simple link that works across your socials, website and newsletters.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Featured Creator -->
  <section id="creators" class="w-full py-12 md:py-20" style="view-transition-name: creator-section">
    <div class="container px-4 md:px-6">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Featured creator</h2>
        <p class="mt-3 text-muted-foreground">See how creators are using our platform to connect with supporters.</p>
      </div>
      <div class="mx-auto mt-10 max-w-3xl">
        <div class="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <div class="h-36 w-full bg-gradient-to-r from-primary/30 to-primary"></div>
          <div class="p-6">
            <div class="flex flex-col items-center sm:flex-row sm:items-start">
              <img src={creator.avatar || "/placeholder.svg"} alt={creator.name} class="-mt-16 h-24 w-24 rounded-full border-4 border-background sm:mr-6" style="view-transition-name: creator-avatar" />
              <div class="mt-4 text-center sm:mt-0 sm:text-left">
                <h3 class="text-2xl font-bold" style="view-transition-name: creator-name">{creator.name}</h3>
                <p class="text-muted-foreground">{creator.tagline}</p>
                <p class="mt-4 text-sm">{creator.description}</p>
                <div class="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button onclick={handleSupportClick} class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90" style="view-transition-name: support-button">Support this creator</button>
                  <a href="/donationspage" class="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium shadow-xs transition-colors hover:bg-accent hover:text-accent-foreground" style="view-transition-name: donations-link">Open donations</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="w-full bg-muted/40 py-12 md:py-20">
    <div class="container px-4 md:px-6">
      <div class="grid gap-6 md:grid-cols-3">
        <div class="rounded-xl border bg-card p-6 text-sm shadow-xs">
          “Switching to this platform doubled my monthly support.”
          <div class="mt-4 font-semibold">Alex • Podcaster</div>
        </div>
        <div class="rounded-xl border bg-card p-6 text-sm shadow-xs">
          “Setup took minutes and my donors love the simplicity.”
          <div class="mt-4 font-semibold">Maya • Designer</div>
        </div>
        <div class="rounded-xl border bg-card p-6 text-sm shadow-xs">
          “The analytics help me plan content around supporter peaks.”
          <div class="mt-4 font-semibold">Ken • Developer</div>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section id="get-started" class="w-full py-16 md:py-24 lg:py-28" style="view-transition-name: cta-section">
    <div class="container px-4 md:px-6">
      <div class="rounded-2xl border bg-primary text-primary-foreground px-6 py-12 shadow-sm">
        <div class="mx-auto flex max-w-3xl flex-col items-center text-center">
          <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Ready to get supported?</h2>
          <p class="mt-3 opacity-90">Join thousands of creators who are getting direct support from their audience.</p>
          <div class="mt-6 flex flex-col items-center gap-3 sm:flex-row">
            <a href="/donationspage" class="inline-flex h-11 items-center justify-center rounded-md bg-background px-6 text-sm font-medium text-primary shadow-sm transition-colors hover:bg-accent">Create your page</a>
            <a href="/about" class="inline-flex h-11 items-center justify-center rounded-md border border-background/40 bg-primary/20 px-6 text-sm font-medium text-primary-foreground/90 hover:bg-primary/30">How it works</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Quick Start -->
  <section class="w-full py-12 md:py-20">
    <div class="container px-4 md:px-6">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Get started in minutes</h2>
        <p class="mt-3 text-muted-foreground">It’s this simple to launch your donations page.</p>
      </div>
      <div class="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
        <div class="rounded-xl border bg-card p-5">
          <div class="text-sm font-semibold text-muted-foreground">Step 1</div>
          <div class="mt-1 text-lg font-semibold">Create your page</div>
          <p class="mt-2 text-sm text-muted-foreground">Add your name, avatar and a short bio.</p>
        </div>
        <div class="rounded-xl border bg-card p-5">
          <div class="text-sm font-semibold text-muted-foreground">Step 2</div>
          <div class="mt-1 text-lg font-semibold">Connect payments</div>
          <p class="mt-2 text-sm text-muted-foreground">Enable secure one-time or monthly donations.</p>
        </div>
        <div class="rounded-xl border bg-card p-5">
          <div class="text-sm font-semibold text-muted-foreground">Step 3</div>
          <div class="mt-1 text-lg font-semibold">Share your link</div>
          <p class="mt-2 text-sm text-muted-foreground">Post it on your socials and website.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="w-full bg-muted/40 py-12 md:py-20">
    <div class="container px-4 md:px-6">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-3xl font-bold tracking-tight sm:text-4xl">Frequently asked questions</h2>
        <p class="mt-3 text-muted-foreground">Answers to the most common questions.</p>
      </div>
      <div class="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-4">
        <div class="rounded-xl border bg-card p-5">
          <div class="font-semibold">How do payouts work?</div>
          <p class="mt-2 text-sm text-muted-foreground">Donations are processed securely and paid out to your connected account on a regular schedule.</p>
        </div>
        <div class="rounded-xl border bg-card p-5">
          <div class="font-semibold">Can I accept recurring donations?</div>
          <p class="mt-2 text-sm text-muted-foreground">Yes, supporters can choose monthly contributions. You can manage plans anytime.</p>
        </div>
        <div class="rounded-xl border bg-card p-5">
          <div class="font-semibold">What are the fees?</div>
          <p class="mt-2 text-sm text-muted-foreground">We keep fees low and transparent. Processing fees may apply depending on your region.</p>
        </div>
      </div>
    </div>
  </section>
</main>