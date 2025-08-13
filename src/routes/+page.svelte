<script lang="ts">
	import { onMount } from 'svelte';
	import type { components } from '@octokit/openapi-types';

	type GitHubRepo = components['schemas']['repository'];
	let repos: GitHubRepo[] = [];
	let loading = true;
	let error = '';

	onMount(async () => {
		try {
			const res = await fetch('https://api.github.com/users/nibrobb/repos?per_page=100');
			if (!res.ok) throw new Error('Failed to fetch repos');
			const data: GitHubRepo[] = await res.json();
			repos = data
				.sort((a, b) => (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0))
				.slice(0, 4);
		} catch {
			error = 'Could not load repositories.';
		} finally {
			loading = false;
		}
	});
</script>

<div class="construction-container">
	<div class="construction-content">
		<div class="worker-icon">🚧👷‍♂️🚧</div>
		<h1>Under Construction</h1>
		<p>This website is currently being built. Please check back soon!</p>
		<p class="github-link">
			In the meantime, check out some of my <a
				href="https://github.com/nibrobb"
				target="_blank"
				rel="noopener">GitHub</a
			> projects🚀
		</p>

		<div class="repo-cards-section">
			{#if loading}
				<div class="repo-loading">Loading popular repositories…</div>
			{:else if error}
				<div class="repo-error">{error}</div>
			{:else}
				<div class="repo-cards">
					{#each repos as repo (repo.id)}
						<a
							class="repo-card"
							href="{repo.html_url}?utm_source=nibrobb.dev"
							target="_blank"
							rel="noopener"
						>
							<div class="repo-title">{repo.name}</div>
							<div class="repo-desc">{repo.description || 'No description provided.'}</div>
							<div class="repo-stars">⭐ {repo.stargazers_count}</div>
						</a>
					{/each}
				</div>
			{/if}
		</div>

		<div class="progress-bar">
			<div class="progress-fill"></div>
		</div>
		<p class="progress-text">Progress: 30%</p>
	</div>
</div>
