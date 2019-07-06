<template>
  <div class="admin-new">
    <div class="container">
      <ASelect
        style='width: 300px'
        @change="setActiveCountry($event)"
      >
        <ASelectOption
          v-for="country in countries"
          :value="country.id"
          :key="country.id"
        >
          {{ country.name }}
        </ASelectOption>
      </ASelect>

      <div class="edited-country" v-if="countryData.name">
        <AInput placeholder="Name" v-model="countryData.name" />
        <ASelect v-model="countryData.continent" style='width: 300px'>
          <ASelectOption :value="continent" v-for="continent in continentList" :key="continent">{{ continent }}</ASelectOption>
        </ASelect>
        <ADatePicker placeholder="Start date" v-model="countryData.startDate" />
        <ADatePicker placeholder="End date" v-model="countryData.endDate" />
        <AInput placeholder="Cities" v-model="countryData.cities" />
        <AInput placeholder="Total cost" v-model="countryData.totalCost" />
        <AInput placeholder="Price Index" v-model="countryData.priceIndex" />

        <ARadioGroup v-model="countryData.visa">
          <ARadioButton :value="true">Yes</ARadioButton>
          <ARadioButton :value="false">No</ARadioButton>
        </ARadioGroup>

        <AInput placeholder="Cost of visa" v-model="countryData.visaCost" v-if="countryData.visa" />

        <BaseButton filled @click="countryData.accommodation.push({...emptyAccommodation})">
          Add accommodation item
        </BaseButton>
        <BaseButton v-if="countryData.accommodation" filled @click="countryData.accommodation.splice(-1, 1)">
          Remove last accommodation item
        </BaseButton>

        <div class="accommodation" v-if="countryData.accommodation">
          <div class="accommodation-item" v-for="(acc, index) in countryData.accommodation" :key="index">
            <AInput placeholder="City" v-model="acc.city" />
            <AInput placeholder="Price Min" v-model="acc.priceMin" />
            <AInput placeholder="Price Max" v-model="acc.priceMax" />
            <AInput placeholder="Days" v-model="acc.days" />
          </div>
        </div>

        <BaseButton filled @click="flights.push({...emptyFlight})">
          Add flights item
        </BaseButton>
        <BaseButton v-if="countryData.flights" filled @click="countryData.flights.splice(-1, 1)">
          Remove last flight item
        </BaseButton>

        <div class="flights" v-if="countryData.flights">
          <div class="flights-item" v-for="(flight, index) in countryData.flights" :key="index">
            <AInput placeholder="From city" v-model="flight.from" />
            <AInput placeholder="From Code" v-model="flight.fromCode" />
            <AInput placeholder="To City" v-model="flight.to" />
            <AInput placeholder="To Code" v-model="flight.toCode" />
            <AInput placeholder="Price Min" v-model="flight.priceMin" />
            <AInput placeholder="Price Max" v-model="flight.priceMax" />
          </div>
        </div>

        <BaseButton filled @click="countryData.notes.push({...emptyNote})">
          Add notes item
        </BaseButton>
        <BaseButton v-if="countryData.notes" filled @click="countryData.notes.splice(-1, 1)">
          Remove last notes item
        </BaseButton>

        <div class="notes">
          <div class="notes-item" v-for="(note, index) in countryData.notes" :key="index">
            <ATextarea v-model="note.note" :rows="5"></ATextarea>
          </div>
        </div>

        <BaseButton @click="editCountry">Edit country</BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';

  import { CONTINENTS } from '../constants';
  import BaseButton from '@/components/BaseButton'
  import { db, GeoPoint } from '@/db';

  export default {
    name: 'admin-edit',
    components: { BaseButton },
    data() {
      return {
        countries: [],
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
        selectedCountry: '',
        countryData: {}
      }
    },
    firestore() {
      return {
        countries: db.collection('countries')
      };
    },
    computed: {
      country() {
        const country = {...this.countries.find((c) => c.id === this.$store.state.activeCountryId)};

        this.countryData = Object.assign({}, country, {
          startDate: this.moment(this.countryData.startDate),
          endDate: this.moment(this.countryData.endDate)
        });
      }
    },
    methods: {
      ...mapMutations(['setActiveCountry']),

      async editCountry() {
        await db.collection('countries').doc(this.$store.state.activeCountryId).update(Object.assign({}, this.countryData, {
          startDate: this.moment(this.countryData.startDate).format(),
          endDate: this.moment(this.countryData.endDate).format()
        }))
      }
    }
  }
</script>

<style scoped lang="scss">

</style>
