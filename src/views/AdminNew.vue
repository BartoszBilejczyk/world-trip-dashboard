<template>
  <div class="admin-new">
    <div class="container">
      <AInput placeholder="Name" v-model="newCountry.name" />
      <ASelect v-model="newCountry.continent" style='width: 300px'>
        <ASelectOption :value="continent" v-for="continent in continentList" :key="continent">{{ continent }}</ASelectOption>
      </ASelect>
      <ADatePicker placeholder="Start date" v-model="newCountry.startDate" />
      <ADatePicker placeholder="End date" v-model="newCountry.endDate" />
      <AInput placeholder="Cities" v-model="newCountry.cities" />
      <AInput placeholder="Total cost" v-model="newCountry.totalCost" />
      <AInput placeholder="Price Index" v-model="newCountry.priceIndex" />

      <ARadioGroup v-model="newCountry.visa">
        <ARadioButton :value="true">Yes</ARadioButton>
        <ARadioButton :value="false">No</ARadioButton>
      </ARadioGroup>

      <AInput placeholder="Cost of visa" v-model="newCountry.visaCost" v-if="newCountry.visa" />

      <BaseButton filled @click="newCountry.accommodation.push({...emptyAccommodation})">
        Add accommodation item
      </BaseButton>
      <BaseButton v-if="newCountry.accommodation.length" filled @click="newCountry.accommodation.splice(-1, 1)">
        Remove last accommodation item
      </BaseButton>

      <div class="accommodation" v-if="newCountry.accommodation && newCountry.accommodation.length">
        <div class="accommodation-item" v-for="(acc, index) in newCountry.accommodation" :key="index">
          <AInput placeholder="City" v-model="acc.city" />
          <AInput placeholder="Price Min" v-model="acc.priceMin" />
          <AInput placeholder="Price Max" v-model="acc.priceMax" />
          <AInput placeholder="Days" v-model="acc.days" />
        </div>
      </div>

      <BaseButton filled @click="newCountry.flights.push({...emptyFlight})">
        Add flights item
      </BaseButton>
      <BaseButton v-if="newCountry.flights.length" filled @click="newCountry.flights.splice(-1, 1)">
        Remove last flight item
      </BaseButton>

      <div class="flights" v-if="newCountry.flights && newCountry.flights.length">
        <div class="flights-item" v-for="(flight, index) in newCountry.flights" :key="index">
          <AInput placeholder="From city" v-model="flight.from" />
          <AInput placeholder="From Code" v-model="flight.fromCode" />
          <AInput placeholder="To City" v-model="flight.to" />
          <AInput placeholder="To Code" v-model="flight.toCode" />
          <AInput placeholder="Price Min" v-model="flight.priceMin" />
          <AInput placeholder="Price Max" v-model="flight.priceMax" />
        </div>
      </div>

      <BaseButton filled @click="newCountry.notes.push({...emptyNote})">
        Add notes item
      </BaseButton>
      <BaseButton v-if="newCountry.notes.length" filled @click="newCountry.notes.splice(-1, 1)">
        Remove last notes item
      </BaseButton>

      <div class="notes">
        <div class="notes-item" v-for="(note, index) in newCountry.notes" :key="index">
          <ATextarea v-model="note.note" :rows="5"></ATextarea>
        </div>
      </div>

      <BaseButton @click="add">Add country</BaseButton>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  import { CONTINENTS } from '../constants';
  import BaseButton from '@/components/BaseButton'

  export default {
    name: 'admin-new',
    components: { BaseButton },
    data() {
      return {
        emptyAccommodation: {
          city: '',
          priceMin: '',
          priceMax: '',
          days: ''
        },
        emptyFlight: {
          from: '',
          fromCode: '',
          to: '',
          toCode: '',
          priceMin: '',
          priceMax: ''
        },
        emptyNote: {
          note: ''
        },
        continentList: CONTINENTS,
        newCountry: {
          createdAt: this.moment().format(),
          name: '',
          continent: '',
          startDate: null,
          endDate: null,
          cities: '',
          visa: false,
          visaCost: '',
          accommodation: [],
          flights: [],
          totalCost: '',
          priceIndex: '',
          notes: []
        }
      }
    },
    methods: {
      ...mapActions(['addCountry']),

      add() {
        const payload = Object.assign({}, this.newCountry, {
          startDate: this.newCountry.startDate ? this.moment(this.newCountry.startDate).format() : null,
          endDate: this.newCountry.endDate ? this.moment(this.newCountry.endDate).format() : null
        });

        this.addCountry(payload);
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
