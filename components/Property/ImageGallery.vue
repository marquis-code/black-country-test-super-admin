<template>
<main>
  <div v-if="allImages" class="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6 p-6 lg:p-0">
    <!-- Main Image -->
    <div>
      <img :src=" allImages[0]" alt="Main Image" class="rounded-lg w-full" />
    </div>

    <!-- Smaller Images on the right -->
    <div class="grid grid-cols-2 gap-4">
      <!-- Display the first 4 images from the array -->
      <img
        v-for="(image, index) in rightImages"
        :key="index"
        :src="image"
        :alt="'Image ' + (index + 2)"
        class="rounded-lg w-full"
      />

      <!-- 'View all' overlay for the last image if there are more than 5 images -->
      <div v-if="remainingImagesCount > 0" class="relative cursor-pointer" @click="navigateToAllImages">
        <img
          :src=" allImages[4]"
          alt="Image 5"
          class="rounded-lg w-full"
        />
        <div class="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white text-lg font-bold rounded-lg">
          View all +{{ remainingImagesCount }}
        </div>
      </div>
    </div>
  </div>
  <img v-else src="@/assets/img/image-placeholder.jpg" alt="placeholder" class="rounded-lg w-full" />
</main>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue';
  import { useRouter } from 'nuxt/app';
  import { useImageExtractor } from '@/composables/core/useExtractImages'; 

  const props = defineProps<Props>();
  
  const { extractImages } = useImageExtractor();
  const allImages = computed(() => extractImages(props.propertyObj));
  
  // Accept the images as a prop
  interface Props {
    images: string[];
    propertyObj: Object
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
  