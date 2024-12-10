<template>
  <main>
    <section v-if="loading">
      <div class="rounded-md p-4 w-full mx-auto">
        <div class="animate-pulse flex space-x-4">
          <div class="h-44 w-full bg-slate-200 rounded col-span-1"></div>
        </div>
      </div>
    </section>
    <div
      v-else-if="allImages && !loading"
      class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 p-6 lg:p-0"
    >
      <!-- Main Image (Large image on the left side) -->
      <div>
        <CoreImageZoom
          :class="'cursor-pointer border-4 w-full object-cover'"
          :src="allImages[0]"
          :style="{ height: '350px' }"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <!-- Display the first 4 images from the array with fixed sizes -->
        <CoreImageZoom
          v-for="(image, index) in rightImages"
          :key="index"
          :src="image"
          :alt="'Image ' + (index + 2)"
          :style="{ height: '170px' }"
          class="rounded-lg w-full h-[200px] object-cover"
        />

        <!-- 'View all' overlay for the last image if there are more than 5 images -->
        <!-- @click="navigateToAllImages" -->
        <div
          @click="openCarousel"
          v-if="remainingImagesCount > 0"
          class="relative cursor-pointer"
        >
          <CoreImageZoom
            :src="allImages[4]"
            alt="Image 5"
            :style="{ height: '170px' }"
            class="rounded-lg w-full h-[200px] object-cover"
          />
          <div
            class="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white text-lg font-bold rounded-lg"
          >
            View all +{{ remainingImagesCount }}
          </div>
        </div>
      </div>
    </div>
    <div>
      <CoreCarouselModal v-if="isCarouselOpen" :property="propertyObj" />
    </div>
    <!-- <CoreCarouselModal v-if="isCarouselOpen" :property="propertyObj" /> -->
  </main>
</template>

<script setup lang="ts">
import { useRouter } from "nuxt/app";
import { useImageExtractor } from "@/composables/core/useExtractImages";
const { extractImages } = useImageExtractor();
const allImages = computed(() => extractImages(props.propertyObj));

const props = defineProps<Props>();

const isCarouselOpen = ref(false);
const property = { /* your property data */ };

// Function to open the carousel modal
const openCarousel = () => {
  isCarouselOpen.value = true;
};

// Accept the images as a prop
interface Props {
  images: string[];
  loading: boolean;
  propertyObj: Object;
}

const router = useRouter();

// Right images: slice out images for the smaller grid
const rightImages = computed(() => props.images.slice(1, 4));

// Calculate the remaining count for the "View all +X" overlay
const remainingImagesCount = computed(() => props.images.length - 5);

// Function to handle "View all" navigation
const navigateToAllImages = () => {
  router.push(`/dashboard/property/${props.propertyObj.id}/image-gallery`);
};
</script>
