<template>
    <main class="space-y-6">
   <section class="max-w mx-auto w-full grid lg:grid-cols-5 gap-6 mt-5">
        <CoreDateInput v-model="startDate" placeholder="Choose the start date" />
        <CoreDateInput v-model="endDate" placeholder="Choose the end date" />
        <FiltersDropdown
          :options="['Today', 'This Week', 'This Month', 'This Year']"
          v-model="selectedAgents"
        />
        <FiltersDropdown
          :options="[
            'All Tenants',
            'This Week',
            'This Month',
            'This Year',
          ]"
          v-model="selectedTenants"
        />
        <FiltersDropdown
          :options="['All properties', 'This Week', 'This Month', 'This Year']"
          v-model="selectedProperties"
        />
      </section>
      
  
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
        <div class="rounded-lg space-y-4">
          <CardsUserStats />
          <CardsDownloadStats />
        </div>
        <div class="rounded-lg">
          <ChartsSignup />
        </div>
      </div>
  
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-8">
        <div class="rounded-lg">
          <ChartsRevenue />
        </div>
        <div class="rounded-lg">
          <ChartsOccupancyRate />
        </div>
      </div>
  
      <section class="max-w mx-auto w-full grid lg:grid-cols-4 gap-6 mt-10">
        <FiltersDropdown
          :options="['Today', 'This Week', 'This Month', 'This Year']"
          v-model="selectedTimeFrame"
        />
        <FiltersDropdown
          :options="['All Agents', 'This Week', 'This Month', 'This Year']"
          v-model="selectedAgents"
        />
        <FiltersDropdown
          :options="[
            'All Property managers',
            'This Week',
            'This Month',
            'This Year',
          ]"
          v-model="selectedManagers"
        />
        <FiltersDropdown
          :options="['All properties', 'This Week', 'This Month', 'This Year']"
          v-model="selectedProperties"
        />
      </section>
      <TablesProperty />
    </main>
  </template>
  
  <script lang="ts" setup>
  const router = useRouter()
  const selectedTimeFrame = ref("Today");
  const selectedAgents = ref('All Agents')
  const selectedManagers = ref('All Property managers')
  const selectedProperties = ref('All properties')
  const selectedTenants = ref('All Tenants')
  const startDate = ref('')
  const endDate = ref('')
  
  </script>