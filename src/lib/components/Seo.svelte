<script lang="ts">
    const SITE_URL = "https://www.nibrobb.dev";

    // Dimensions are only known for the default image; pass them alongside a custom one
    const DEFAULT_IMAGE = {
        src: "/bg.png",
        alt: "Purple-to-orange gradient background of nibrobb.dev",
        width: 1920,
        height: 1080,
        type: "image/png",
    };

    interface Props {
        title: string;
        description: string;
        path: string;
        image?: string;
        imageAlt?: string;
        imageWidth?: number;
        imageHeight?: number;
        imageType?: string;
        // Extra line shown in Slack unfurls
        label?: string;
        data?: string;
    }

    let {
        title,
        description,
        path,
        image,
        imageAlt,
        imageWidth,
        imageHeight,
        imageType,
        label,
        data,
    }: Props = $props();

    const isDefaultImage = $derived(image === undefined);
    const url = $derived(new URL(path, SITE_URL).href);
    const imageUrl = $derived(new URL(image ?? DEFAULT_IMAGE.src, SITE_URL).href);
    const alt = $derived(imageAlt ?? (isDefaultImage ? DEFAULT_IMAGE.alt : undefined));
    const width = $derived(imageWidth ?? (isDefaultImage ? DEFAULT_IMAGE.width : undefined));
    const height = $derived(imageHeight ?? (isDefaultImage ? DEFAULT_IMAGE.height : undefined));
    const type = $derived(imageType ?? (isDefaultImage ? DEFAULT_IMAGE.type : undefined));
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={url} />

    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={imageUrl} />
    {#if alt}<meta property="og:image:alt" content={alt} />{/if}
    {#if width}<meta property="og:image:width" content={String(width)} />{/if}
    {#if height}<meta property="og:image:height" content={String(height)} />{/if}
    {#if type}<meta property="og:image:type" content={type} />{/if}

    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={imageUrl} />
    {#if alt}<meta name="twitter:image:alt" content={alt} />{/if}
    {#if label && data}
        <meta name="twitter:label1" content={label} />
        <meta name="twitter:data1" content={data} />
    {/if}
</svelte:head>
