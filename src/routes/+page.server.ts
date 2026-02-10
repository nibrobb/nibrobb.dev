import { GITHUB_TOKEN } from "$env/static/private";
import type { PageServerLoad } from "./$types";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: GITHUB_TOKEN });

export const load: PageServerLoad = async ({ setHeaders }) => {
    const { data: repos } = await octokit.rest.repos.listForUser({
        username: "nibrobb",
        per_page: 100,
        headers: {
            "user-agent": "nibrobb.dev/1.0",
        },
    });

    const top_repos = repos
        .sort((a, b) => {
            return (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0);
        })
        .slice(0, 4);

    setHeaders({
        "cache-control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    });

    return {
        repos: top_repos,
    };
};
