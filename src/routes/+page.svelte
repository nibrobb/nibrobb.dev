<script lang="ts">
	export let data;
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
					{#each data.repos as repo (repo.url)}
						<a
							tabindex="0"
							class="repo-card"
							href={repo.url + '?utm_source=nibrobb.dev'}
							target="_blank"
							rel="noopener"
						>
							<div aria-label={repo.name} class="repo-title">{repo.name}</div>
							<div aria-label="{repo.name} description" class="repo-desc">
								{repo.description || 'No description provided.'}
							</div>
							<div aria-label="Stargazers" class="repo-stars">⭐ {repo.stars}</div>
						</a>
					{/each}
				</div>
			</div>

			<div class="progress-bar">
				<div class="progress-fill"></div>
			</div>
			<p class="progress-text">Progress: 33%</p>
		</div>
	</div>
</main>
