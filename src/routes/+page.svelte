<script lang="ts">
    import type { PageProps } from "./$types.js";

    let { data }: PageProps = $props();
</script>

<main>
    <div class="construction-container">
        <div class="construction-content">
            <div class="worker-icon">🚧👷‍♂️🚧</div>
            <h1>Under Construction</h1>
            <p>This website is currently being built. Please check back soon!</p>
            <p class="github-link">
                In the meantime, check out some of my
                <!-- prettier-ignore -->
                <a tabindex="0" href="https://github.com/nibrobb" target="_blank" rel="noopener">
                    GitHub
                </a>
                projects🚀
            </p>

            <div class="repo-cards-section">
                <div class="repo-cards">
                    {#await data.repos then repos}
                        {#each repos as repo (repo.url)}
                            <a
                                tabindex="0"
                                class="repo-card"
                                href={repo.html_url + "?ref=nibrobb.dev"}
                                target="_blank"
                                rel="noopener"
                            >
                                <div aria-label={repo.name} class="repo-title">{repo.name}</div>
                                <div aria-label="{repo.name} description" class="repo-desc">
                                    {repo.description || "No description provided."}
                                </div>
                                <div aria-label="Stargazers" class="repo-stars">
                                    ⭐ {repo.stargazers_count ?? 0}
                                </div>
                            </a>
                        {/each}
                    {:catch error}
                        <p>Error loading repos: {error.message}</p>
                    {/await}
                </div>
            </div>

            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <p class="progress-text">Progress: 42%</p>
        </div>
    </div>
</main>
