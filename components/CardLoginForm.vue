<template>
	<div class="w-9/12 mx-auto">
		<h1 class="font-bold text-2xl mb-8">Build your chatbot and make things easier</h1>
		<form @submit.prevent="login">
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
			<div class="mt-5">
				<label for="field-password" class="mb-1 text-gray-600">Password</label>
				<div class="flex border-b border-solid border-gray-400">
					<input
						ref="fieldPassword"
						class="border-none outline-none w-full py-3"
		            	v-model="form.password"
		            	:type="visible ? 'text' : 'password'" 
		            	id="field-password"
		            	:disabled="loading"
					>
					<img
						@click="visible = !visible" 
						class="cursor-pointer"
						src="/images/eye.svg" 
						width="28px"
					>
				</div>
			</div>
			<div 
				v-if="error"
				class="pt-5 text-center text-red-600 font-semibold"
			>
				{{ error }}
			</div>
			<div class="my-6">
				<input 
					class="bg-primary block w-full text-white py-3 font-semibold"
					type="submit"
					:disabled="loading"
					:value="loading ? 'Loading' : 'Login'"
				>
			</div>
		</form>
		<div class="text-gray-800 text-sm text-center">
			Don't have on account? 
			<a
				class="underline"
				href="#"
			>Sign Up</a>
		</div>
		<div class="text-gray-800 text-sm text-center">
			<nuxt-link
				class="underline"
				:to="{
					name: 'forgetpassword'
				}"
			>Forgot password?</nuxt-link>
		</div>
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
            password: ''
        },
        error: '',
        loading: false,
        visible: false
    }),
    methods: {
        login() {

            this.error = false;

            const {
                email,
                password
            } = this.form;

            if (!email) {
                this.error = "The email address is mandatory.";
                this.$refs.fieldEmail.focus();
                return false;
            }

            if (!password) {
                this.error = "The password is mandatory.";
                this.$refs.fieldPassword.focus();
                return;
            }

            this.loading = true;

            this.$auth.loginWith('local', {
                    data: {
                        identifier: email,
                        password
                    }
                })
				.catch(err => {
					if( err.response && err.response.status == 400 ){
						this.error = "Identifier or password invalid.";
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