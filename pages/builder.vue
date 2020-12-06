<template>
	<div>
		<div class="bg-yellow-600 text-white font-bold text-lg py-2 text-center">
			Chatbot Builder
		</div>
		<div>
			<div
				class="text-center text-base font-semibold text-red-500 my-5"
				v-if="error"
			>
				Couldn't load data, try later.
			</div>
			<div 
				v-else-if="loading"
			>
				<SpinnerLoading></SpinnerLoading>
			</div>
			<div
				v-else
				class="shadow-lg rounded-lg mx-auto w-8/12 mt-4"
			>
				<div
					class="bg-blue-400 text-white font-semibold py-2 text-center rounded-t-lg"
				>
					New Bot
				</div>
				<div
					class="bg-white p-5"
				>
					<div>
						<div
							class="flex items-center justify-center flex-col"
						>
							<label>
								<span class="pr-3">Bot Name</span>
								<input
									:disabled="isSubmitting"
									v-model="form.bot_name"
									type="text" 
									class="border-gray-300 border border-solid rounded shadow p-1 w-64"
								>
							</label>
							<label class="mt-5">
								<span class="pr-3">Template</span>
								<select
									:disabled="isSubmitting"
									v-model="form.bot_template"
									class="border-gray-300 border border-solid rounded shadow p-1 w-64"
									@change="loadTemplate"
								>
									<option 
										v-for="(template, index) in templates"
										:key="index"
										:value="template.id"
									>{{ template.name }}</option>
								</select> 
							</label>
						</div>
					</div>
				</div>
				<div class="text-center py-3">
					<button
						@click="save"
						:disabled="template_error || !form.bot_name || isSubmitting"
 						class="bg-blue-600 text-white py-1 rounded-full text-sm px-3"
 						:class="{
 							'opacity-50 cursor-not-allowed': !template || template_error || !form.bot_name,
 							'hover:bg-blue-700': template && !template_error && form.bot_name
 						}"
 					>
						{{ isSubmitting ? 'Creating...' : 'Create' }}
					</button>
				</div>
			</div>	
		</div>
	</div>
</template>

<script>
	import SpinnerLoading from '@/components/Spinner'

	export default {
		components: {
			SpinnerLoading
		},
		data: () => ({
			loading: true,
			error: false,
			template_error: false,
			template: false,
			templates: [],
			bot_id: '',
			form: {
				bot_name: '',
				bot_template: ''
			},
			isSubmitting: false,
		}),
		mounted(){
			Promise.all([
				this.$axios.get('https://api.vovo.chat/bots/next'),
				this.$axios.post('https://api.vovo.chat/graphql', {
					query: `
						{
							templates { 
								id 
								name 
								business_catergory 
								pricing_tier 
								platform_type
							}
						}
					`
				})
			])
			.then(res => {
				this.loading = false;
				this.bot_id = res[0].data;
				this.templates = res[1].data.data.templates
			})
			.catch(res => {
				this.loading = false;
				this.error = true;
			})
		},
		methods: {
			loadTemplate(){
				if( this.form.bot_template ){
					this.template_error = false;
					this.$axios.post('https://api.vovo.chat/graphql', {
						query: `
							{
								templates(where: { id: ${ this.form.bot_template } }) { 
									id 
									name 
									menu { 
										menu {
											label 
											description 
											action 
											messaging 
											intents 
											webhook
										} 
									} 
								} 
							}
						`
					})
					.then(res => {
						this.template = res.data.data.templates[0].menu.menu
					})
					.catch(res => {
						this.$toast.error("Couldn't load template data, try again.", {
							position: "bottom-right"
						});
						this.template_error = true;
					})
				}
			},
			async save(){
				if( this.form.bot_name && this.template ){

					this.isSubmitting = true;

					try {
						await this.$axios.post(`https://api.vovo.chat/bots/${this.bot_id}`, {
							name: this.form.bot_name,
							status: true
						})
						
						await this.$axios.put(`https://api.vovo.chat/menus/${this.bot_id}`, this.template)

						this.isSubmitting = false;

						this.$toast.success("Saved!", {
							position: "bottom-right",
							duration: 1000
						});

						setTimeout(() => {
							this.$router.push({
								name: 'bot-id',
								params: {
									id: this.bot_id
								}
							})
						}, 2000)

					} catch ( e ){
						this.$toast.error("It couldn't be saved, try again.", {
							position: "bottom-right"
						});
						
						this.isSubmitting = false;
					}
				}
			}
		}
	}
</script>