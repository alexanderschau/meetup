export async function get({ data }) {
  return new Response(
    process.env.IMAGE_API_KEY + " .... " + import.meta.env.IMAGE_API_KEY
  );
}
