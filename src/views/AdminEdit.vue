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

      <div class="edited-country" v-if="getOneCountry.name">
        <AInput placeholder="Name" v-model="getOneCountry.name" />
        <ASelect v-model="getOneCountry.continent" style='width: 300px'>
          <ASelectOption :value="continent" v-for="continent in continentList" :key="continent">{{ continent }}</ASelectOption>
        </ASelect>
        <ADatePicker
          placeholder="Start date"
          :value="getOneCountry.startDate ? moment(getOneCountry.startDate) : null"
          @change="getOneCountry.startDate = $event"
        />
        <ADatePicker
          placeholder="End date"
          :value="getOneCountry.endDate ? moment(getOneCountry.endDate) : null"
          @change="getOneCountry.endDate = $event"
        />
        <AInput placeholder="Cities" v-model="getOneCountry.cities" />
        <AInput placeholder="Total cost" v-model="getOneCountry.totalCost" />
        <AInput placeholder="Price Index" v-model="getOneCountry.priceIndex" />

        <ARadioGroup v-model="getOneCountry.visa">
          <ARadioButton :value="true">Yes</ARadioButton>
          <ARadioButton :value="false">No</ARadioButton>
        </ARadioGroup>

        <AInput placeholder="Cost of visa" v-model="getOneCountry.visaCost" v-if="getOneCountry.visa" />

        <BaseButton filled @click="getOneCountry.accommodation.push({...emptyAccommodation})">
          Add accommodation item
        </BaseButton>
        <BaseButton v-if="getOneCountry.accommodation" filled @click="getOneCountry.accommodation.splice(-1, 1)">
          Remove last accommodation item
        </BaseButton>

        <div class="accommodation" v-if="getOneCountry.accommodation">
          <div class="accommodation-item" v-for="(acc, index) in getOneCountry.accommodation" :key="index">
            <AInput placeholder="City" v-model="acc.city" />
            <AInput placeholder="Price Min" v-model="acc.priceMin" />
            <AInput placeholder="Price Max" v-model="acc.priceMax" />
            <AInput placeholder="Days" v-model="acc.days" />
          </div>
        </div>

        <BaseButton filled @click="getOneCountry.flights.push({...emptyFlight})">
          Add flights item
        </BaseButton>
        <BaseButton v-if="getOneCountry.flights" filled @click="getOneCountry.flights.splice(-1, 1)">
          Remove last flight item
        </BaseButton>

        <div class="flights" v-if="getOneCountry.flights">
          <div class="flights-item" v-for="(flight, index) in getOneCountry.flights" :key="index">
            <AInput placeholder="From city" v-model="flight.from" />
            <AInput placeholder="From Code" v-model="flight.fromCode" />
            <AInput placeholder="To City" v-model="flight.to" />
            <AInput placeholder="To Code" v-model="flight.toCode" />
            <AInput placeholder="Price Min" v-model="flight.priceMin" />
            <AInput placeholder="Price Max" v-model="flight.priceMax" />
          </div>
        </div>

        <BaseButton filled @click="getOneCountry.notes.push({...emptyNote})">
          Add notes item
        </BaseButton>
        <BaseButton v-if="getOneCountry.notes" filled @click="getOneCountry.notes.splice(-1, 1)">
          Remove last notes item
        </BaseButton>

        <div class="notes">
          <div class="notes-item" v-for="(note, index) in getOneCountry.notes" :key="index">
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
        continentList: CONTINENTS,
        selectedCountry: '',
      }
    },
    computed: {
      ...mapGetters(['getOneCountry']),
      ...mapState(['countries'])
    },
    methods: {
      ...mapActions(['updateCountry', 'removeCountry']),
      ...mapMutations(['setActiveCountry']),

      update() {
        const payload = Object.assign({}, this.getOneCountry, {
          startDate: (!this.getOneCountry.startDate || this.getOneCountry.startDate === 'Invalid date') ? null : this.moment(this.getOneCountry.startDate).format() ,
          endDate: (!this.getOneCountry.endDate || this.getOneCountry.endDate === 'Invalid date') ? null : this.moment(this.getOneCountry.endDate).format()
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
</style>
