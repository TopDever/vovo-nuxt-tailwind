<template>
  <div class="styling">
    <div v-if="!bot">
      <SpinnerLoading></SpinnerLoading>
    </div>
    <div v-else>
      <div class="flex" :style="saveFlag ? 'padding-bottom: 92px;' : ''">
        <div class="w-1/5 py-2 shadow-lg" style="height: 100vh">
          <div class="py-3 px-4">
            <label class="label" for="upload_company_logo">
              Upload Company Logo
            </label>
            <input
              id="upload_company_logo"
              type="file"
              class="hidden"
              ref="upload_company_logo"
              @change="handleCompanyLogo"
            />
            <div
              @click="$refs.upload_company_logo.click()"
              class="cursor-pointer my-4 text-gray-800 w-24 h-24 rounded-full bg-gray-400 mx-auto flex justify-center items-center"
            >
              <img
                v-if="logo"
                class="rounded-full w-24 h-24 fill-current"
                :src="logo"
                alt=""
              />
              <img
                v-else
                class="w-6 fill-current"
                src="/icons/upload.svg"
                alt=""
              />
            </div>
          </div>

          <div class="py-3 px-4">
            <input
              v-model="bot.bot_companyname"
              type="text"
              class="border-0 border-b border-gray-600 text-base p-2 w-full outline-none focus:border-gray-800"
              placeholder="Company name"
            />
          </div>

          <div
            class="py-3 px-4 mt-5 pt-5 border-t border-gray-400 border-solid"
          >
            <label class="label" for="bot_avatar">
              Bot Avatar
            </label>
            <input
              id="bot_avatar"
              type="file"
              class="hidden"
              ref="bot_avatar"
              @change="handleBotAvatar"
            />
            <div
              @click="$refs.bot_avatar.click()"
              class="cursor-pointer my-4 text-gray-800 w-24 h-24 rounded-full bg-gray-400 mx-auto flex justify-center items-center"
            >
              <img
                v-if="avatar"
                class="rounded-full w-24 h-24 fill-current"
                :src="avatar"
                alt=""
              />
              <img
                v-else
                class="w-6 fill-current"
                src="/icons/upload.svg"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="bg-gray-200 px-40 py-12 select-none" style="width: 100%;">
          <div class="shadow-lg" style="width: 70%;margin: auto;">
            <div
              class="flex py-4 px-5 max-w-full"
              :style="{
                background: colors.backgroundHeader.hex8,
                height: `${header_height * 1.5}px`,
              }"
            >
              <div class="flex justify-between w-full">
                <div class="flex items-center">
                  <img
                    v-if="logo"
                    class="rounded-full w-12 h-12 border-gray-400 border shadow"
                    :src="logo"
                    alt=""
                  />
                  <span
                    v-else
                    class="rounded-full w-12 h-12 bg-gray-500"
                  ></span>
                  <span class="pl-5 font-medium text-xl">
                    {{ bot.bot_companyname || "Company name" }}
                  </span>
                </div>
              </div>
              <div class="flex gap-4">
                <img class="w-4" src="/icons/substract.svg" alt="" />
                <img class="w-4" src="/icons/cancel.svg" alt="" />
              </div>
            </div>
            <div
              class="flex py-4 px-5 flex-col overflow-auto"
              :style="{
                background: colors.backgroundBody.hex8,
                height: `${body_height * 6}px`,
              }"
            >
              <div class="flex">
                <div class="text-center" style="min-width: 66px;">
                  <img
                    v-if="avatar"
                    class="rounded-full w-12 h-12 border-gray-400 border shadow"
                    :src="avatar"
                    alt=""
                  />
                  <span
                    v-else
                    class="rounded-full w-12 h-12 bg-gray-500 block"
                  ></span>
                </div>
                <div class="flex flex-col gap-3">
                  <div
                    class="bg-white px-3 py-2 text-xl rounded shadow font-normal"
                  >
                    Hi, Welcome to our site
                  </div>
                  <div
                    class="bg-white px-3 py-2 text-xl rounded shadow font-normal"
                  >
                    How can I help you today?
                  </div>
                </div>
              </div>
              <div class="w-8/12 ml-auto mt-6">
                <button
                  class="m-1 rounded py-2 px-3 border-2 border-blue-500 bg-white text-xl"
                  type="button"
                >
                  Plan a Trip
                </button>
                <button
                  class="m-1 rounded py-2 px-3 border-2 border-blue-500 bg-white text-xl"
                  type="button"
                >
                  Modify Booking
                </button>
                <button
                  class="m-1 rounded py-2 px-3 border-2 border-blue-500 bg-white text-xl"
                  type="button"
                >
                  Reward Program
                </button>
              </div>
            </div>
            <div class="w-full bg-white">
              <div class="flex items-center">
                <input
                  class="py-5 text-xl px-5 w-full outline-none font-normal"
                  type="text"
                  placeholder="Type your message here..."
                  :style="{
                    height: `${message_height * 1.25}px`,
                  }"
                />
                <img class="w-8 opacity-75 mx-4" src="/icons/send.svg" alt="" />
              </div>
              <div class="flex gap-3 py-5">
                <img
                  class="w-8 opacity-75 mx-4"
                  src="/icons/paper-clip.svg"
                  alt=""
                />
                <img class="w-8 opacity-75 mx-4" src="/icons/mute.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="shadow-lg" style="width: 16%;">
          <div class="py-3 px-4 pb-6">
            <div class="font-semibold text-lg mb-6">Header Design</div>
            <label class="label">
              Background color
            </label>
            <div class="flex gap-3 items-center mt-3 text-gray-600">
              <div
                class="cursor-pointer w-8 h-8 border border-gray-600 border-solid"
                :style="{
                  background: colors.backgroundHeader.hex8,
                }"
                @click="showPicker('backgroundHeader', $event)"
              ></div>
              {{ colors.backgroundHeader.hex8 }}
            </div>
            <div
              v-show="picker.backgroundHeader"
              v-click-outside="hidePicker('backgroundHeader')"
              class="absolute"
            >
              <Sketch v-model="colors.backgroundHeader"></Sketch>
            </div>
          </div>

          <div class="flex gap-1 justify-between">
            <div class="p-4 w-full">
              <label class="label">
                Height
              </label>
              <div class="flex gap-5 items-center mt-3 justify-around">
                <div>{{ header_height }}%</div>
                <div class="flex flex-col gap-2">
                  <div class="cursor-pointer" @click="up('header_height')">
                    <img class="w-5" src="/icons/up-arrow.svg" alt="" />
                  </div>
                  <div class="cursor-pointer" @click="down('header_height')">
                    <img
                      class="w-5 transform rotate-180"
                      src="/icons/up-arrow.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- <div
                            class="w-1/2 p-4"
                        >
                            <label
                                class="label"
                            >
                                Width
                            </label>
                            <div
                                class="flex gap-5 justify-center items-center mt-3"
                            >
                                <div>{{ header_width }}%</div>
                                <div class="flex flex-col gap-2">
                                    <div
                                        class="cursor-pointer"
                                        @click="up( 'header_width' )"
                                    >
                                        <img
                                            class="w-5"
                                            src="/icons/up-arrow.svg" 
                                            alt=""
                                        >
                                    </div>
                                    <div
                                        class="cursor-pointer"
                                        @click="down( 'header_width' )"
                                    >
                                        <img
                                            class="w-5 transform rotate-180"
                                            src="/icons/up-arrow.svg" 
                                            alt=""
                                        >
                                    </div>
                                </div>
                            </div>
                        </div> -->
          </div>

          <div class="border-t border-solid border-gray-400 py-3 px-4 pb-6">
            <div class="font-semibold text-lg mb-6">Body Design</div>
            <label class="label">
              Background color
            </label>
            <div class="flex gap-3 items-center mt-3 text-gray-600">
              <div
                class="cursor-pointer w-8 h-8 border border-gray-600 border-solid"
                :style="{
                  background: colors.backgroundBody.hex8,
                }"
                @click="showPicker('backgroundBody', $event)"
              ></div>
              {{ colors.backgroundBody.hex8 }}
            </div>
            <div
              v-show="picker.backgroundBody"
              v-click-outside="hidePicker('backgroundBody')"
              class="absolute"
            >
              <Sketch v-model="colors.backgroundBody"></Sketch>
            </div>
          </div>
          <div
            class="border-b border-solid border-gray-400 flex gap-1 justify-between"
          >
            <div class="p-4 w-full">
              <label class="label">
                Height
              </label>
              <div class="flex gap-5 items-center mt-3 justify-around">
                <div>{{ body_height }}%</div>
                <div class="flex flex-col gap-2">
                  <div class="cursor-pointer" @click="up('body_height')">
                    <img class="w-5" src="/icons/up-arrow.svg" alt="" />
                  </div>
                  <div class="cursor-pointer" @click="down('body_height')">
                    <img
                      class="w-5 transform rotate-180"
                      src="/icons/up-arrow.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- `<div
                            class="w-1/2 p-4"
                        >
                            <label
                                class="label"
                            >
                                Width
                            </label>
                            <div
                                class="flex gap-5 justify-center items-center mt-3"
                            >
                                <div>{{ body_width }}%</div>
                                <div class="flex flex-col gap-2">
                                    <div
                                        class="cursor-pointer"
                                        @click="up( 'body_width' )"
                                    >
                                        <img
                                            class="w-5"
                                            src="/icons/up-arrow.svg" 
                                            alt=""
                                        >
                                    </div>
                                    <div
                                        class="cursor-pointer"
                                        @click="down( 'body_width' )"
                                    >
                                        <img
                                            class="w-5 transform rotate-180"
                                            src="/icons/up-arrow.svg" 
                                            alt=""
                                        >
                                    </div>
                                </div>
                            </div>
                        </div>` -->
          </div>
          <div class="py-3 p-4">
            <div class="font-semibold text-lg">Message Area</div>
          </div>
          <div class="flex gap-1 justify-between">
            <div class="p-4 w-full">
              <label class="label">
                Height
              </label>
              <div class="flex gap-5 items-center mt-3 justify-around">
                <div>{{ message_height }}%</div>
                <div class="flex flex-col gap-2">
                  <div class="cursor-pointer" @click="up('message_height')">
                    <img class="w-5" src="/icons/up-arrow.svg" alt="" />
                  </div>
                  <div class="cursor-pointer" @click="down('message_height')">
                    <img
                      class="w-5 transform rotate-180"
                      src="/icons/up-arrow.svg"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <!-- <div
                            class="w-1/2 p-4"
                        >
                            <label
                                class="label"
                            >
                                Width
                            </label>
                            <div
                                class="flex gap-5 justify-center items-center mt-3"
                            >
                                <div>{{ body_width }}%</div>
                                <div class="flex flex-col gap-2">
                                    <div
                                        class="cursor-pointer"
                                        @click="up( 'body_width' )"
                                    >
                                        <img
                                            class="w-5"
                                            src="/icons/up-arrow.svg" 
                                            alt=""
                                        >
                                    </div>
                                    <div
                                        class="cursor-pointer"
                                        @click="down( 'body_width' )"
                                    >
                                        <img
                                            class="w-5 transform rotate-180"
                                            src="/icons/up-arrow.svg" 
                                            alt=""
                                        >
                                    </div>
                                </div>
                            </div>
                        </div> -->
          </div>
        </div>
      </div>
      <div
        class="fixed left-0 right-0 bottom-0 bg-white py-5 px-3 border-t border-gray-400"
        v-if="saveFlag"
      >
        <div class="mx-auto flex justify-center gap-4">
          <button
            :disabled="loading"
            @click="save"
            type="button"
            class="w-40 flex items-center justify-between p-3 text-white rounded font-medium bg-blue-800 hover:bg-blue-600"
          >
            <span class="flex items-center">
              <img class="w-4 mr-2" src="/icons/save-disk.svg" alt="" />
              {{ loading ? "SAVING" : "SAVE" }}
            </span>
            <img class="w-4 ml-6" src="/icons/arrow-right-white.svg" alt="" />
          </button>
          <nuxt-link
            :disabled="loading"
            :to="{
              name: 'index',
            }"
            class="w-40 border border-gray-400 flex items-center justify-between p-3 rounded font-medium bg-white hover:bg-gray-200"
          >
            <span>
              CANCEL
            </span>
            <img class="w-4 ml-6" src="/icons/arrow-right.svg" alt="" />
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Sketch } from "vue-color";
import ClickOutside from "vue-click-outside";
import SpinnerLoading from "@/components/Spinner";

export default {
  components: {
    Sketch,
    SpinnerLoading,
  },
  data: () => ({
    picker: {
      backgroundHeader: false,
      backgroundBody: false,
    },
    colors: {
      backgroundHeader: {
        hex8: "#FFFFFF",
      },
      backgroundBody: {
        hex8: "#EFF3F7",
      },
    },
    header_height: 50,
    body_height: 50,
    message_height: 50,
    logo: "",
    avatar: "",
    bot: false,
    loading: false,
    logoFiles: false,
    avatarFiles: false,
    saveFlag: false,
  }),
  mounted() {
    this.$axios
      .get(`${this.baseAPI}/bots/${this.$route.params.id}`, {})
      .then((res) => {
        this.bot = res.data;
        this.avatar = `https://api.vovo.chat${res.data.bot_avatar.url}`;
        this.logo = `https://api.vovo.chat${res.data.bot_headerlogo.url}`;
        this.colors = {
          backgroundHeader: {
            hex8: res.data.bot_style.background_color_header,
          },
          backgroundBody: {
            hex8: res.data.bot_style.background_color_body,
          },
        };
        this.header_height = res.data.bot_style.header_height;
        this.body_height = res.data.bot_style.body_height;
        this.message_height = res.data.bot_style.message_height;
      })
      .catch((err) => {
        this.$toast.show("Failed to load bot data.", {
          position: "top-right",
          type: "error",
          duration: 2500,
        });

        setTimeout(() => {
          this.$router.go(-1);
        }, 2000);
      });
  },
  methods: {
    save() {
      const bot_data = {
        ...this.bot,
        bot_style: {
          background_color_header: this.colors.backgroundHeader.hex8,
          background_color_body: this.colors.backgroundBody.hex8,
          header_height: this.header_height,
          body_height: this.body_height,
          message_height: this.message_height,
        },
      };

      this.loading = true;

      this.$axios
        .put(`${this.baseAPI}/bots/${this.$route.params.id}`, bot_data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.$auth.getToken("local"),
          },
        })
        .then(async (res) => {
          await this.uploadImage(this.logoFiles, "bot_headerlogo", "logo");
          await this.uploadImage(this.avatarFiles, "bot_avatar", "avatar");
          this.$toast.show("Saved", {
            position: "top-center",
            type: "success",
            duration: 1000,
          });
          this.saveFlag = false;
        })
        .catch((err) => {
          this.$toast.show("Failed to save bot data", {
            position: "top-right",
            type: "error",
            duration: 2500,
          });
        })
        .then(() => {
          this.loading = false;
        });
    },
    showPicker(picker, e) {
      if (e) e.stopPropagation();
      this.picker[picker] = !this.picker[picker];
      this.saveFlag = true;
    },
    hidePicker(picker) {
      return () => {
        if (this.picker[picker]) {
          this.picker[picker] = false;
        }
      };
    },
    up(type) {
      if (this[type] < 100) {
        this[type] += 10;
        this.saveFlag = true;
      }
    },
    down(type) {
      if (this[type] > 0) {
        this[type] -= 10;
        this.saveFlag = true;
      }
    },
    handleCompanyLogo(e) {
      const files = e.target.files;
      this.logoFiles = files;
      this.createBase64Image(files[0], "logo");
      this.saveFlag = true;
    },
    handleBotAvatar(e) {
      const files = e.target.files;
      this.avatarFiles = files;
      this.createBase64Image(files[0], "avatar");
      this.saveFlag = true;
    },

    createBase64Image(fileObject, prop) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this[prop] = e.target.result;
      };
      reader.readAsDataURL(fileObject);
    },

    async uploadImage(files, field, prop) {
      if (!files || files.length === 0) return;

      const formData = new FormData();

      formData.append("ref", "bot");
      formData.append("refId", this.bot.id);
      formData.append("field", field);
      formData.append("files", files[0]);

      try {
        let response = await this.$axios.post(
          "https://api.vovo.chat/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        this[prop] = `https://api.vovo.chat${response.data[0].url}`;
      } catch (e) {
        this.$toast.show("The file couldn't be loaded.", {
          position: "bottom-right",
        });
      }
    },
  },
  directives: {
    ClickOutside,
  },
};
</script>

<style lang="postcss" scoped>
.styling .label {
  @apply font-semibold text-sm;
}
</style>
