<template>
	<div class="w-9/12 mx-auto">
		<h1 class="font-bold text-2xl mb-8">Enter your new password</h1>
		<form @submit.prevent="submit">
			<div>
				<label for="field-password" class="mb-1 text-gray-600">Password</label>
				<div class="flex border-b border-solid border-gray-400">
					<input 
						class="border-none outline-none w-full py-3"
						ref="fieldPassword"
	            		v-model="form.password"
	            		type="password" 
	            		id="field-password"
	            		:disabled="loading"
					>
				</div>
			</div>
			<div class="mt-5">
				<label for="field-password-confirmation" class="mb-1 text-gray-600">Password Confirmation</label>
				<div class="flex border-b border-solid border-gray-400">
					<input 
						class="border-none outline-none w-full py-3"
						ref="fieldPasswordConfirmation"
	            		v-model="form.passwordConfirmation"
	            		type="password" 
	            		id="field-password-confirmation"
	            		:disabled="loading"
					>
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
					:value="loading ? 'Loading' : 'Reset password'"
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
				password: '',
				passwordConfirmation: '',
			},
			error: '',
			success: '',
			loading: false,
		}),
		methods: {
			submit(){

				this.error = false;
				this.success = false

				const { password, passwordConfirmation } = this.form;

				if( !password ){
					this.error = "The password is mandatory.";
					this.$refs.fieldPassword.focus();
					return false;
				}

				if( !passwordConfirmation ){
					this.error = "The password confirmation is mandatory.";
					this.$refs.fieldPasswordConfirmation.focus();
					return false;
				}

				this.loading = true;

				this.$axios.post('https://api.vovo.chat/auth/reset-password', {
					code: this.$route.query.code, 
					password, 
					passwordConfirmation
                })
                .then(res => {
                	this.success = "Changed password.";
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