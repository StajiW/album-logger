<script setup lang="ts">
import { supabase } from './scripts/supabase'
import Spotify from './scripts/spotify'

async function signIn() {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'spotify',
		options: {
			redirectTo: import.meta.env.VITE_SPOTIFY_REDIRECT_URL
		}
	})

	if (error) console.error(error)
	else console.log(data)
}

async function signOut() {
	const { error } = await supabase.auth.signOut()

	if (error) console.error(error)
}

async function trySearch() {
	console.log(await Spotify.searchAlbums('Miles davis kind of blue'))
}

trySearch()
</script>

<template>
<button id='signIn' @click='signIn()'>Sign In</button>
<button id='signOut' @click='signOut()'>Sign Out</button>
</template>

<style scoped>
</style>
