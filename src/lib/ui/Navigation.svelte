<script>
  import { page } from "$app/state";
</script>

<div class="navbar bg-base-100 shadow-2xl">
  <div class="flex-1">
    <p class="text-3xl">Leaf Library</p>
  </div>
  <div class="flex items-center">
    <div role="tablist" class="menu tabs-border tabs">
      <a href="/garden" role="tab" class="tab" class:tab-active={page.url.pathname === "/garden"}>
        Garden
      </a>

      <a
        href="/collections"
        role="tab"
        class="tab"
        class:tab-active={page.url.pathname === "/collections"}
      >
        Collections
      </a>

      <a href="/charts" role="tab" class="tab" class:tab-active={page.url.pathname === "/charts"}>
        Charts
      </a>
    </div>
    <div class="avatar h-12 w-12">
      <div class="rounded-full">
        <img
          alt="User profile."
          src="https://images.unsplash.com/vector-1745610393569-9373c9c64117?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </div>
    </div>
  </div>
</div>
