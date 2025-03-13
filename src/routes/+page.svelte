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
</script>

<main class="min-h-screen bg-background text-foreground">

  <!-- Hero Section -->
  <section class="w-full py-12 md:py-24 lg:py-32">
    <div class="container px-4 md:px-6">
      <div class="flex flex-col items-center justify-center space-y-4 text-center">
        <div class="space-y-2">
          <h1 class="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Support creators you love
          </h1>
          <p class="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            A simple way to support your favorite creators with one-time or monthly donations.
          </p>
        </div>
        <div class="space-x-4">
          <a 
            href="/donationspage" 
            class="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Get Started
          </a>
          <a 
            href="/about" 
            class="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section id="features" class="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
    <div class="container px-4 md:px-6">
      <div class="flex flex-col items-center justify-center space-y-4 text-center">
        <div class="space-y-2">
          <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">How It Works</h2>
          <p class="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Our platform makes it easy to support creators and get supported.
          </p>
        </div>
      </div>
      <div class="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3">
        <div class="flex flex-col items-center space-y-4 rounded-lg border bg-card p-6 shadow-sm">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold">Create a profile</h3>
          <p class="text-muted-foreground">Set up your page in minutes and share your story with your audience.</p>
        </div>
        <div class="flex flex-col items-center space-y-4 rounded-lg border bg-card p-6 shadow-sm">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold">Share your link</h3>
          <p class="text-muted-foreground">Share your unique link with your audience on social media or your website.</p>
        </div>
        <div class="flex flex-col items-center space-y-4 rounded-lg border bg-card p-6 shadow-sm">
          <div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
              <path d="M12 18V6"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold">Receive support</h3>
          <p class="text-muted-foreground">Get paid directly to your bank account with our secure payment system.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Featured Creator -->
  <section id="creators" class="w-full py-12 md:py-24 lg:py-32">
    <div class="container px-4 md:px-6">
      <div class="flex flex-col items-center justify-center space-y-4 text-center">
        <div class="space-y-2">
          <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">Featured Creator</h2>
          <p class="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            See how creators are using our platform to connect with their supporters.
          </p>
        </div>
      </div>
      <div class="mx-auto max-w-3xl py-12">
        <div class="rounded-lg border bg-card shadow-sm">
          <div class="h-32 w-full rounded-t-lg bg-gradient-to-r from-primary/40 to-primary"></div>
          <div class="p-6">
            <div class="flex flex-col items-center sm:flex-row sm:items-start">
              <img 
                src={creator.avatar || "/placeholder.svg"} 
                alt={creator.name} 
                class="h-24 w-24 rounded-full border-4 border-background -mt-16 sm:mr-6"
              />
              <div class="mt-4 sm:mt-0 text-center sm:text-left">
                <h3 class="text-2xl font-bold">{creator.name}</h3>
                <p class="text-muted-foreground">{creator.tagline}</p>
                <p class="mt-4">{creator.description}</p>
                <button 
                  onclick={handleSupportClick}
                  class="mt-6 inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  Support this creator
                </button>
                <a href="/donationspage"> here!!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>


  <!-- CTA Section -->
  <section id="get-started" class="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
    <div class="container px-4 md:px-6">
      <div class="flex flex-col items-center justify-center space-y-4 text-center">
        <div class="space-y-2">
          <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to get supported?</h2>
          <p class="mx-auto max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Join thousands of creators who are getting direct support from their audience.
          </p>
        </div>
        <a 
          href="https://github.com/abdulkareemoj/donationsapp" 
          class="inline-flex h-10 items-center justify-center rounded-md bg-background px-8 text-sm font-medium text-primary shadow transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        >
          Create your page
        </a>
      </div>
    </div>
  </section>
  </main>



