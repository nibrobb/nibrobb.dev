<script lang="ts">
    import { resolve } from "$app/paths";
    import Seo from "#lib/components/Seo.svelte";

    // import type { PageProps } from './$types';
    // let { data }: PageProps = $props();
</script>

<Seo
    title="Luxafor-ui"
    description="Luxafor-ui is a dashboard for your Luxafor FLAG™"
    path="/luxafor-ui"
    image="https://raw.githubusercontent.com/nibrobb/luxafor-ui/refs/heads/tauri/public/gui.png"
    imageAlt="A Windows® application with eight vertically arranged buttons in different colors; the penultimate button glows bright green, mirroring the lamp's current setting."
/>

<main>
    <style>
        :root {
            background-color: #181818;
        }
        .heading-text {
            color: white;
        }
        .luxafor-ui-content {
            display: flex;
            flex-direction: column;
            flex-wrap: wrap;
            align-items: center;
            position: absolute;
            left: 50%;
            top: 50%;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
        }
        #luxafor-ui-img {
            object-fit: cover;
            clip-path: inset(3px);
        }
        #luxafor-ui-install {
            font-size: 24pt;
            color: white;
        }
    </style>

    <div class="luxafor-ui-content">
        <h1 class="heading-text">Luxafor-ui</h1>
        <a href={resolve(`oauth/slack`)}>
            <img
                style="margin: 20px"
                alt="Add to Slack"
                height="40"
                width="139"
                src="https://platform.slack-edge.com/img/add_to_slack.png"
                srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
            />
        </a>
        <img
            id="luxafor-ui-img"
            src="https://raw.githubusercontent.com/nibrobb/luxafor-ui/refs/heads/tauri/public/gui.png"
            alt="Illustration of the Luxafor-ui app"
        />
        <a
            rel="external"
            href="https://github.com/nibrobb/luxafor-ui/tree/tauri?tab=readme-ov-file#installation"
            target="_blank"
        >
            <h2 id="luxafor-ui-install">Install</h2>
        </a>
    </div>
</main>
