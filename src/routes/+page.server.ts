import { GITHUB_TOKEN } from "$app/env/private";
import type { PageServerLoad } from "./$types";
import { Octokit } from "@octokit/rest";

const octokit = new Octokit({ auth: GITHUB_TOKEN });

// The node server has no shared HTTP cache in front of it, so cache the GitHub result in-process.
// This is per pod: each replica refreshes at most once per TTL.
const CACHE_TTL_MS = 60 * 60 * 1000;

type Repo = Awaited<ReturnType<typeof fetchTopRepos>>[number];

let cached: { repos: Repo[]; fetchedAt: number } | undefined;
let inFlight: Promise<Repo[]> | undefined;

async function fetchTopRepos() {
    const { data: repos } = await octokit.rest.repos.listForUser({
        username: "nibrobb",
        per_page: 100,
        headers: {
            "user-agent": "nibrobb.dev/1.0",
        },
    });

    return repos
        .sort((a, b) => {
            return (b.stargazers_count ?? 0) - (a.stargazers_count ?? 0);
        })
        .slice(0, 4);
}

async function getTopRepos(): Promise<Repo[]> {
    if (cached && Date.now() - cached.fetchedAt < CACHE_TTL_MS) {
        return cached.repos;
    }

    // Share one refresh between concurrent requests instead of calling GitHub once per request
    inFlight ??= fetchTopRepos()
        .then((repos) => {
            cached = { repos, fetchedAt: Date.now() };
            return repos;
        })
        .finally(() => {
            inFlight = undefined;
        });

    try {
        return await inFlight;
    } catch (error) {
        // Rate limits or network errors: serve stale data rather than failing the homepage
        if (cached) {
            console.warn("GitHub fetch failed, serving stale repos", error);
            return cached.repos;
        }
        throw error;
    }
}

export const load: PageServerLoad = async ({ setHeaders }) => {
    const top_repos = await getTopRepos();

    setHeaders({
        "cache-control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
    });

    return {
        repos: top_repos,
    };
};
