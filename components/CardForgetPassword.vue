<template>
	<div class="w-9/12 mx-auto">
		<h1 class="font-bold text-2xl mb-8">Enter your email</h1>
		<form @submit.prevent="submit">
			<div>
				<label for="field-email" class="mb-1 text-gray-600">Email Address</label>
				<div class="flex border-b border-solid border-gray-400">
					<input 
						class="border-none outline-none w-full py-3"
						ref="fieldEmail"
	            		v-model="form.email"
	            		type="email" 
	            		id="field-email"
	            		:disabled="loading"
					>
					<img src="/images/email.svg" width="28px">
				</div>
			</div>
			<div 
				v-if="error"
				class="pt-5 text-center text-red-600 font-semibold"
			>
				{{ error }}
			</div>
			<div 
				v-if="success"
				class="pt-5 text-center text-green-600 font-semibold"
			>
				{{ success }}
			</div>
			<div class="my-6">
				<input 
					v-if="!success"
					class="bg-primary block w-full text-white py-3 font-semibold"
					type="submit"
					:disabled="loading"
					:value="loading ? 'Loading' : 'Submit'"
				>
				<nuxt-link 
					v-else
					class="bg-primary block w-full text-white py-3 font-semibold text-center"
					:to="{
						name: 'index'
					}"
				>Go to login</nuxt-link>
			</div>
		</form>
		<footer class="text-center lg:text-left lg:-ml-10 mt-12 mb-6 font-semibold text-gray-900">
			<a href="#">Facebook</a>
			<span>|</span>
			<a href="#">Twitter</a>
			<span>|</span>
			<a href="#">Instagram</a>
		</footer>
	</div>
</template>

<script>
	import axios from 'axios';

	export default {
		data: () => ({
			form: {
				email: '',
			},
			error: '',
			success: '',
			loading: false,
		}),
		methods: {
			submit(){

				this.error = false;
				this.success = false

				const { email } = this.form;

				if( !email ){
					this.error = "The email address is mandatory.";
					this.$refs.fieldEmail.focus();
					return false;
				}

				this.loading = true;

				this.$axios.post('https://api.vovo.chat/auth/forgot-password', {
					email
                })
                .then(res => {
                	this.success = "Email sent.";
                	this.loading = false
                })
				.catch(err => {

					if( err.response && err.response.data &&
						err.response.data.data &&
						err.response.data.data[0] &&
						err.response.data.data[0].messages && 
						err.response.data.data[0].messages[0] &&
						err.response.data.data[0].messages[0].message ){
						this.error = err.response.data.data[0].messages[0].message;
					}
					else {
						this.error = "Internal error, try again later.";
					}
				
					this.loading = false
				})
			}
		}
	}
</script>