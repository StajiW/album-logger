import { AuthError } from './errors'
import { supabase } from './supabase'
import { formUrl } from './util'

export default class Spotify {
    static async searchAlbums(query: string): Promise<any> {
        const { data, error } = await supabase.auth.getSession()

        if (error) throw new AuthError(error.message)
        if (!data.session?.provider_token) throw new AuthError('provider_token undefined')

        const providerToken = data.session?.provider_token
        
        const res = await fetch(formUrl('https://api.spotify.com/v1/search', {
            q: query,
            type: 'album',
            limit: '5'
        }), {
            headers: {
                Authorization: `Bearer ${providerToken}`
            }
        })

        const json = await res.json()

        return json.albums.items
    }
}