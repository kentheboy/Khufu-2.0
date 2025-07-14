<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl font-bold mb-6">Reservation List</h1>
      <UButtonGroup orientation="horizontal">
        <UButton
          color="neutral"
          :variant="displayPeriodUom === 'monthly' ? 'subtle' : 'outline'"
          label="Monthly"
          @click="setDisplayPeriodUom('monthly')"
        />
        <UButton
          color="neutral"
          :variant="displayPeriodUom === 'weekly' ? 'subtle' : 'outline'"
          label="Weekly"
          @click="setDisplayPeriodUom('weekly')"
        />
      </UButtonGroup>
    </div>
    <CalendarView
      :show-date="showDate"
      :display-period-uom="displayPeriodUom.value"
      class="theme-default holiday-us-traditional holiday-us-official"
    >
      <template #header="{ headerProps }">
        <CalendarViewHeader :header-props @input="setShowDate" />
      </template>
    </CalendarView>
  </div>
</template>
<script setup>
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar";

import "/node_modules/vue-simple-calendar/dist/vue-simple-calendar.css";
// The next two lines are optional themes
import "/node_modules/vue-simple-calendar/dist/css/default.css";
import "/node_modules/vue-simple-calendar/dist/css/holidays-us.css";


import { ref } from "vue";

const showDate = ref(new Date());
const displayPeriodUom = ref("monthly"); // This can be set to 'week', 'month', etc.

function setShowDate(d) {
  showDate.value = d;
}
function setDisplayPeriodUom(uom) {
  displayPeriodUom.value = uom;
}

</script>
<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
  height: 67vh;
  width: 90vw;
  margin-left: auto;
  margin-right: auto;
}
</style>
