<template>
<div v-if="show" class="w-screen h-screen fixed flex top-0 left-0 z-10 justify-center items-center flex-colum align-middle bg-black bg-opacity-75">
    <form class="bg-white rounded p-3" style="height:fit-content" @submit.prevent="profileEdit">
        <div class="w-full flex justify-between">
            <h2 class="text-2xl mx-3 py-4">Profile Update</h2>
        </div>
        <div class="w-full">
            <div class="w-full flex justify-between p-3 relative">
                <span class="absolute font-bold" style="top:50px">Avatar</span>
                <img :src="form.image" class="w-24 h-24 object-cover rounded-full mx-auto shadow p-1 border border-gray-400" />
                <img src="/icons/camera.svg" width="40px" class="z-10 absolute bottom-0 opacity-25 hover:opacity-50" style="right:20px" />
                <input type="file" class="z-20 absolute bottom-0 opacity-0" style="right:20px;width:40px;" @change="handleImageChang" accept="image/*" />
            </div>
            <div class="w-full flex justify-between p-3">
                <span class="my-auto">First name</span>
                <input type="text" class="border border-gray-400 rounded px-3 py-2" ref="fieldName" v-model="form.first_name" placeholder="Input your name" />
            </div>
            <div class="w-full flex justify-between p-3">
                <span class="my-auto">Last name</span>
                <input type="text" class="border border-gray-400 rounded px-3 py-2" ref="fieldName" v-model="form.last_name" placeholder="Input your name" />
            </div>
            <div class="w-full flex justify-between p-3">
                <span class="my-auto">Website</span>
                <input type="text" class="border border-gray-400 rounded px-3 py-2" ref="fieldWebsite" v-model="form.website" placeholder="Input your website" />
            </div>
            <div class="w-full flex justify-between p-3">
                <span class="my-auto">Email</span>
                <input type="email" class="border border-gray-400 rounded px-3 py-2" ref="fieldEmails" v-model="form.email" placeholder="Input your email" />
            </div>
            <div class="w-full flex justify-between p-3">
                <span class="my-auto pr-4">Mobile Number</span>
                <input type="number" class="border border-gray-400 rounded px-3 py-2" ref="fieldCellnumber" v-model="form.cellnumber" placeholder="Input your cell number" />
            </div>
            <div class="w-full flex justify-center h-8">
                <span v-if="error" class="text-red-500 font-normal">{{ error }}</span>
            </div>
        </div>
        <div class="w-full flex justify-around my-6">
            <input type="submit" class="w-32 text-white font-semibold py-2 px-4 rounded bg-blue-700 hover:bg-blue-800" value="Submit" />
            <input type="button" class="w-32 text-white font-semibold py-2 px-4 rounded bg-gray-600" value="Cancel" @click="showClose" />
        </div>
    </form>
</div>
</template>

<script>
import axios from 'axios';
export default {
    props: {
        show: Boolean,
        info: Object,
        onCancel: Function,

        message: Object,
        index: Number,
        removeMenu: Function,
        loadMenu: Function,
        updateMessage: Function,
    },
    data: () => ({
        form: {
            image: '',
            first_name: '',
            last_name: '',
            website: '',
            email: '',
            cellnumber: 0,
            uploadImageData: [],
        },
        error: '',
        loading: false,
        visible: false
    }),
    computed: {
        user() {
            return this.$store.state.auth.user;
        }
    },
    created() {
        this.form.image = this.user.profile_avatar.formats !== null ? 'https://api.vovo.chat' + this.user.profile_avatar.formats.thumbnail.url : 'https://api.vovo.chat' + localStorage.getItem('authPhoto');
        const name_part = this.info.full_name.split( " " );
        this.form.first_name = name_part[ 0 ];
        this.form.last_name = name_part[ 1 ];
        this.form.website = this.info.website;
        this.form.email = this.info.email;
        this.form.cellnumber = this.info.phone_number;

    },
    methods: {
        showClose() {
            this.onCancel(false);
            this.form.image = this.user.profile_avatar.formats !== null ? 'https://api.vovo.chat' + this.user.profile_avatar.formats.thumbnail.url : 'https://api.vovo.chat' + localStorage.getItem('authPhoto');
            this.form.name = this.info.full_name;
            this.form.website = this.info.website;
            this.form.email = this.info.email;
            this.form.cellnumber = this.info.phone_number;

        },
        async handleImageChang(e) {
            const files = e.target.files;
            this.form.uploadImageData = files;
            const selectedImage = e.target.files[0];
            this.createBase64Image(selectedImage);
        },
        createBase64Image(fileObject) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.form.image = e.target.result;
            };
            reader.readAsDataURL(fileObject);
        },
        async profileEdit() {
            const {
                first_name,
                last_name,
                website,
                email,
                cellnumber
            } = this.form;
            this.error = false;
            if (!first_name) {
                this.$refs.fieldName.focus();
                this.error = "The first name is mandatory.";
                return false;
            }
            if (!last_name) {
                this.$refs.fieldName.focus();
                this.error = "The last name is mandatory.";
                return false;
            }
            if (!website) {
                this.$refs.fieldWebsite.focus();
                this.error = "The website address is mandatory.";
                return false;
            }
            if (!email) {
                this.$refs.fieldEmails.focus();
                this.error = "The email address is mandatory.";
                return false;
            }
            if (!cellnumber) {
                this.$refs.fieldCellnumber.focus();
                this.error = "The cell number is mandatory.";
                return false;
            }
            let infoData = {
                full_name: this.form.first_name + " " + this.form.last_name,
                website,
                email,
                phone_number: this.form.cellnumber
            };
            const formImage = this.form.uploadImageData;
            const formData = new FormData()
            formData.append('ref', 'user')
            formData.append('refId', this.$store.state.auth.user.id)
            formData.append('source', 'users-permissions')
            formData.append('field', 'profile_avatar')

            formData.append('files', formImage[0])

            try {
                let response;
                if (!!formImage[0]) {
                    response = await this.$axios.post('https://api.vovo.chat/upload', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        }
                    })
                    localStorage.setItem("authPhoto", response.data[0].url);
                }

                // const profile_avatar = {
                //     ...this.user.profile_avatar,
                //     url: response.data[0].url
                // };

                //this.$auth.setUser(this.$auth.$state.user.profile_avatar.formats.thumbnail.url, response.data[0].url)
                response = await this.$axios.put('https://api.vovo.chat/bots/profile', infoData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': this.$auth.getToken('local')
                    }

                })
                location.reload()
            } catch (e) {
                console.dir(e)
            }
        }

    },
};
</script>
