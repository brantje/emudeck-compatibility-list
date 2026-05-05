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
            show-empty
            class="table"
            :busy="loading"
            :items="filteredList"
            :fields="fields"
            :per-page="perPage"
            :current-page="currentPage"
            primary-key="timestamp"
          >
            <template #table-busy>
              <div class="text-center text-light my-2">Loading ROMs...</div>
            </template>
            <template #cell(boots)="data">
              <span v-if="data.item.boots">Yes</span>
              <span v-else>No</span>
            </template>
            <template #cell(playable)="data">
              <span v-if="data.item.playable"> Yes </span>
              <span v-else>No</span>
            </template>
          </b-table>
          <b-pagination
            v-if="filteredList.length > perPage"
            v-model="currentPage"
            :total-rows="filteredList.length"
            :per-page="perPage"
            align="center"
          ></b-pagination>
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
      currentPage: 1,
      perPage: 50,
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
    loading: Boolean,
  },
  watch: {
    filters: {
      deep: true,
      handler() {
        this.currentPage = 1;
      },
    },
  },
  computed: {
    filteredList() {
      const filters = this.filters;
      const name = filters.name.trim().toLowerCase();
      const selectedConsoles = new Set(filters.console);
      const selectedEmulators = new Set(filters.emulator);
      const hasConsoleFilter = selectedConsoles.size > 0;
      const hasEmulatorFilter = selectedEmulators.size > 0;
      const bootsFilter = filters.boots;
      const playableFilter = filters.playable;

      return this.roms.filter((item) => {
        if (name && !(item.gameLower || "").includes(name)) return false;
        if (hasConsoleFilter && !selectedConsoles.has(item.console)) return false;
        if (hasEmulatorFilter && !selectedEmulators.has(item.emulator)) return false;
        if (bootsFilter !== null && item.boots !== bootsFilter) return false;
        if (playableFilter !== null && item.playable !== playableFilter) return false;

        return true;
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
