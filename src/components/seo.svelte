<script lang="ts">
  export let data: SEODataType;
</script>

<title>{data.title}</title>

<!-- Primary Meta Tags -->
<meta name="title" content={data.title} />
<meta name="description" content={data.description} />
<meta name="keywords" content="" />
<meta
  name="robots"
  content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="language" content="English" />
<meta name="author" content="Alexander Schau" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content={data.url} />
<meta property="og:title" content={data.title} />
<meta property="og:description" content={data.description} />
<meta
  property="og:image"
  content={new URL(data.imgUrl, "https://meetup.day").toString()}
/>

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content={data.url} />
<meta property="twitter:title" content={data.title} />
<meta property="twitter:description" content={data.description} />
<meta property="twitter:image" content={data.imgUrl} />
<meta property="twitter:site" content="@meetup_day" />
<meta property="twitter:creator" content="@alexanderschau" />
