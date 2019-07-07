<template>
  <div class="admin-edit">
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

      <div class="edited-country" v-if="selectedCountry.name">
        <AInput placeholder="Name" v-model="selectedCountry.name" />
        <ASelect v-model="selectedCountry.continent" style='width: 300px'>
          <ASelectOption :value="continent" v-for="continent in continentList" :key="continent">{{ continent }}</ASelectOption>
        </ASelect>
        <ADatePicker
          placeholder="Start date"
          :value="selectedCountry.startDate ? moment(selectedCountry.startDate) : null"
          @change="selectedCountry.startDate = $event"
        />
        <ADatePicker
          placeholder="End date"
          :value="selectedCountry.endDate ? moment(selectedCountry.endDate) : null"
          @change="selectedCountry.endDate = $event"
        />
        <AInput placeholder="Cities" v-model="selectedCountry.cities" />
        <AInput placeholder="Total cost" v-model="selectedCountry.totalCost" />
        <AInput placeholder="Price Index" v-model="selectedCountry.priceIndex" />

        <ARadioGroup v-model="selectedCountry.visa">
          <ARadioButton :value="true">Yes</ARadioButton>
          <ARadioButton :value="false">No</ARadioButton>
        </ARadioGroup>

        <AInput placeholder="Cost of visa" v-model="selectedCountry.visaCost" v-if="selectedCountry.visa" />

        <BaseButton filled @click="selectedCountry.accommodation.push({...emptyAccommodation})">
          Add accommodation item
        </BaseButton>
        <BaseButton v-if="selectedCountry.accommodation" filled @click="selectedCountry.accommodation.splice(-1, 1)">
          Remove last accommodation item
        </BaseButton>

        <div class="accommodation" v-if="selectedCountry.accommodation">
          <div class="accommodation-item" v-for="(acc, index) in selectedCountry.accommodation" :key="index">
            <AInput placeholder="City" v-model="acc.city" />
            <AInput placeholder="Price Min" v-model="acc.priceMin" />
            <AInput placeholder="Price Max" v-model="acc.priceMax" />
            <AInput placeholder="Days" v-model="acc.days" />
          </div>
        </div>

        <BaseButton filled @click="selectedCountry.flights.push({...emptyFlight})">
          Add flights item
        </BaseButton>
        <BaseButton v-if="selectedCountry.flights" filled @click="selectedCountry.flights.splice(-1, 1)">
          Remove last flight item
        </BaseButton>

        <div class="flights" v-if="selectedCountry.flights">
          <div class="flights-item" v-for="(flight, index) in selectedCountry.flights" :key="index">
            <AInput placeholder="From city" v-model="flight.from" />
            <AInput placeholder="From Code" v-model="flight.fromCode" />
            <AInput placeholder="To City" v-model="flight.to" />
            <AInput placeholder="To Code" v-model="flight.toCode" />
            <AInput placeholder="Price Min" v-model="flight.priceMin" />
            <AInput placeholder="Price Max" v-model="flight.priceMax" />
          </div>
        </div>

        <BaseButton filled @click="selectedCountry.notes.push({...emptyNote})">
          Add notes item
        </BaseButton>
        <BaseButton v-if="selectedCountry.notes" filled @click="selectedCountry.notes.splice(-1, 1)">
          Remove last notes item
        </BaseButton>

        <div class="notes">
          <div class="notes-item" v-for="(note, index) in selectedCountry.notes" :key="index">
            <ATextarea v-model="note.note" :rows="5"></ATextarea>
          </div>
        </div>

        <BaseButton @click="update">Edit country</BaseButton>
      </div>

      <div class="remove">
        DELETE:

        <ASelect
          style='width: 300px'
          @change="countryToRemove = $event"
        >
          <ASelectOption
            v-for="country in countries"
            :value="country.id"
            :key="country.id"
          >
            {{ country.name }}
          </ASelectOption>
        </ASelect>

        <BaseButton @click="remove">Remove country</BaseButton>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapActions, mapGetters, mapState } from 'vuex';

  import { CONTINENTS } from '../constants';
  import BaseButton from '@/components/BaseButton'
  import { db, GeoPoint } from '@/db';

  export default {
    name: 'admin-edit',
    components: { BaseButton },
    data() {
      return {
        countryToRemove: '',
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
        continentList: CONTINENTS
      }
    },
    computed: {
      ...mapGetters(['selectedCountry']),
      ...mapState(['countries'])
    },
    methods: {
      ...mapActions(['updateCountry', 'removeCountry']),
      ...mapMutations(['setActiveCountry']),

      update() {
        const payload = Object.assign({}, this.selectedCountry, {
          startDate: (!this.selectedCountry.startDate || this.selectedCountry.startDate === 'Invalid date') ? null : this.moment(this.selectedCountry.startDate).format() ,
          endDate: (!this.selectedCountry.endDate || this.selectedCountry.endDate === 'Invalid date') ? null : this.moment(this.selectedCountry.endDate).format()
        });

        this.updateCountry(payload);
      },
      remove() {
        this.removeCountry(this.countryToRemove);
      }
    }
  }
</script>

<style scoped lang="scss">
  .admin-edit {
    overflow-y: auto;
  }

  .flights-item,
  .accommodation-item {
    margin-bottom: 20px;
  }
</style>
