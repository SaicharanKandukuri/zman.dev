import { do_redirect } from '$lib/redirect.js'

export async function GET({}) {
    const UDROID_URL = new URL(
        "https://github.com/RandomCoderOrg/ubuntu-on-android"
    )
    
    throw do_redirect(UDROID_URL)
}
