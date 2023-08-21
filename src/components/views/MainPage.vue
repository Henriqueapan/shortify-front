<script setup>
  import Card from "primevue/card"
  import InputText from "primevue/inputtext";
  import Button from "primevue/button";
  import {ref} from "vue";
  import API from "@/api"

  const inputUrl = ref("");

  const shortUrl = ref(null);

  const isInvalidUrl = ref(false);

  const invalidUrlErrorMessage =
      "Invalid URL. Make sure your URL is in the follow format: scheme://host/path?query#fragment\n Example: " +
      "https://www.google.com"

  // cardPassThrough is used to control the style of the Card component`s inner elements with the pt prop
  // this was used to allow for better flex control inside the component
  const cardPassThrough = {
    body: {
      style: {
        'box-sizing': 'border-box',
        'padding-left': '0',
        'padding-right': '0',
        'padding-bottom': '0'
      }
    },
    content: {
      style: {
        'height': '100%',
        'padding-bottom': '0'
      }
    }
  }

  const shortify = async () => {
    try {
      const response = await API.axios.post("/shorten", {
        "long_url": inputUrl.value
      });
      shortUrl.value = response.data.link;
      isInvalidUrl.value = false;
    } catch (httpError) {
      console.error("Request error", httpError);
      isInvalidUrl.value = true;
    }
  }
</script>

<template>
  <div class="text-center sm:text-7xl text-6xl mt-8 mb-8 font-semibold text-color-accent">SHORTIFY</div>

  <div id="main-card--wrapper" class="flex justify-content-center">
    <Card id="main-card" :pt="cardPassThrough">
      <template #content>

        <div class="flex flex-column h-full" id="main-card--content">

          <div class="px-3">

            <div class="field mb-3">
              <label class="font-semibold text-xl w-full">URL
              <InputText
                  v-model="inputUrl"
                  placeholder="https://long-url.com"
                  :class="`w-full mt-1 h-3rem text-lg ${isInvalidUrl ? 'p-invalid' : ''}`"
              ></InputText>
              </label>
              <small class="p-error" id="text-error" style="white-space: pre-line;">{{ isInvalidUrl ? invalidUrlErrorMessage : '&nbsp;' }}</small>
            </div>

            <div class="field text-center pb-2">
              <Button label="SHORTIFY URL" class="confirm-button font-spacing" @click="shortify" rounded size="large"></Button>
            </div>

          </div>

          <div v-if="shortUrl" class="w-full flex align-items-center justify-content-center py-3 sm:py-4" id="main-card--result">
            <div class="text-center font-medium">
              <Button class="text-3xl xs-text-2xl sm:text-5xl text-white font-medium" link :href="shortUrl">{{ shortUrl }}</Button>
            </div>
          </div>

        </div>

      </template>
    </Card>
  </div>
</template>

<style scoped>

.p-card .p-card-body {
  padding: 0 !important;
}

@media (max-width: 320px) {
  .xs-text-2xl {
    font-size: 1.5rem !important;
  }
}

#main-card {
  max-height: 360px;
  flex-basis: 860px;
  margin: 0 24px 0 24px;
  border: solid 3px;
  border-color: var(--tertiary);
  background-color: var(--secondary)
}

#main-card--result {
  background-color: var(--accent);
  border-top: 3px solid;
  border-top-color: var(--tertiary);
  border-radius: 0 0 4px 4px;
}
</style>