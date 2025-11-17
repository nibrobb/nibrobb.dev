<script lang="ts">
    import type { PageProps } from './$types';

    let { data }: PageProps = $props();
</script>

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
</style>

<div class="luxafor-ui-content">
    <h1 class="heading-text">Luxafor UI</h1>
    <!-- <a href="https://slack.com/oauth/v2/authorize?client_id=7816636666498.7805940374471&scope=users.profile:read&user_scope=users.profile:read,users.profile:write,users:write"> -->
    <a href="/oauth/slack">
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
        src="https://raw.githubusercontent.com/nibrobb/luxafor-ui/refs/heads/slack-integration/public/gui.png"
        alt="Illustration of the Luxafor-ui app"
    >

</div>