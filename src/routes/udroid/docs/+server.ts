import { do_redirect } from "$lib/redirect";

export async function GET({}) {
    const url = new URL("https://udroid-rc.gitbook.io/udroid-wiki/udroid-landing/readme")
    throw do_redirect(url)
}
