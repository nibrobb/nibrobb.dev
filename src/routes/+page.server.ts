import type { PageServerLoad } from './$types';
import { Octokit } from '@octokit/rest';
import 'dotenv/config';

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

export const load: PageServerLoad = async () => {
	const { data: repos } = await octokit.rest.repos.listForUser({
		username: 'nibrobb',
		per_page: 100,
		headers: {
			'user-agent': 'nibrobb.dev'
		}
	});

	const topRepos = repos
		.sort((a, b) => {
			return (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0);
		})
		.slice(0, 4);

	return {
		repos: topRepos.map((repo) => ({
			name: repo.name,
			description: repo.description,
			stars: repo.stargazers_count ?? 0,
			url: repo.html_url
		}))
	};
};
