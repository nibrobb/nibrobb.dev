<script lang="ts">
	export let data;
</script>

<div class="construction-container">
	<div class="construction-content">
		<div class="worker-icon">🚧👷‍♂️🚧</div>
		<h1>Under Construction</h1>
		<p>This website is currently being built. Please check back soon!</p>
		<p class="github-link">
			In the meantime, check out some of my <a href="https://github.com/nibrobb" target="_blank" rel="noopener">GitHub</a> projects🚀
		</p>

		<div class="repo-cards-section">
			<div class="repo-cards">
				{#each data.repos as repo (repo.url)}
					<a
						class="repo-card"
						href={repo.url + '?utm_source=nibrobb.dev'}
						target="_blank"
						rel="noopener"
					>
						<div class="repo-title">{repo.name}</div>
						<div class="repo-desc">{repo.description || 'No description provided.'}</div>
						<div class="repo-stars">⭐ {repo.stars}</div>
					</a>
				{/each}
			</div>
		</div>

		<div class="progress-bar">
			<div class="progress-fill"></div>
		</div>
		<p class="progress-text">Progress: 30%</p>
	</div>
</div>
