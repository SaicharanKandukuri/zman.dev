import { redirect } from "@sveltejs/kit"

function do_redirect(url: URL) {
    return redirect(303, url)
}

export { do_redirect }
