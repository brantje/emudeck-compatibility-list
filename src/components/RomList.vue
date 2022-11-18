<template>
  <b-row>
    <b-col>
      <b-row class="mb-2">
        <b-col> {{ filteredList.length }} roms found </b-col>
        <b-col>
          <a href="https://docs.google.com/forms/d/e/1FAIpQLScavGFOuGpEVpyHdRVcPjdrCEquG9ItBaloa8Q0XaiNlu_Afg/viewform" class="btn btn-success float-right" target="_blank">
            Add game
          </a>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table
            striped
            dark
            class="table"
            :items="filteredList"
            :fields="fields"
          >
            <template #cell(boots)="data">
              <span v-if="data.item.boots">Yes</span>
              <span v-else>No</span>
            </template>
            <template #cell(playable)="data">
              <span v-if="data.item.playable"> Yes </span>
              <span v-else>No</span>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "RomList",
  data() {
    return {
      fields: [
        {
          key: "game",
          sortable: true,
        },
        {
          key: "console",
          sortable: true,
        },
        {
          key: "emulator",
          sortable: true,
        },
        {
          key: "boots",
          sortable: true,
        },
        {
          key: "playable",
          sortable: true,
        },
        {
          key: "notes",
          sortable: false,
        },
      ],
    };
  },
  props: {
    roms: Array,
    filters: Object,
  },
  methods: {
    multipleExist(arr, values) {
      return values.every((value) => {
        return arr.includes(value);
      });
    },
  },
  computed: {
    filteredList() {
      let items = this.roms;
      if (this.filters.name.length > 0) {
        items = items.filter((item) => {
          return (
            item.game.toLowerCase().indexOf(this.filters.name.toLowerCase()) !=
            -1
          );
        });
      }

      if (this.filters.console.length > 0) {
        items = items.filter((item) => {
          return this.filters.console.indexOf(item.console) != -1;
        });
      }

      if (this.filters.emulator.length > 0) {
        items = items.filter((item) => {
          return this.filters.emulator.indexOf(item.emulator) != -1;
        });
      }

      if (this.filters.boots !== null) {
        items = items.filter((item) => {
          return item.boots === this.filters.boots;
        });
      }

      if (this.filters.playable !== null) {
        items = items.filter((item) => {
          return item.playable === this.filters.playable;
        });
      }

      return items;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
