<template>
  <b-container fluid="xl">
    <a href="https://github.com/brantje/emudeck-compatibility-list" target="_blank" style="position: absolute; right: 0;"><img decoding="async" loading="lazy" width="149" height="149" src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149" class="attachment-full size-full" alt="Fork me on GitHub" data-recalc-dims="1"></a>
    <h1>Emudeck compatibility list</h1>
    <b-row>
      <b-col sm="12" md="3" xl="1"> </b-col>
    </b-row>

    <b-alert v-if="loadError" show variant="danger">
      Could not load compatibility data. Please try refreshing the page.
    </b-alert>

    <Filters
      :filters="filters"
      :consoles="consoles"
      :emulators="emulators"
    ></Filters>

    <RomList :roms="roms" :filters="filters" :loading="loading" />
  </b-container>
</template>

<script>
import RomList from "./components/RomList.vue";
import Filters from "./components/Filters.vue";
import axios from "axios";
export default {
  name: "appECL",
  components: {
    RomList: RomList,
    Filters: Filters,
  },
  data() {
    return {
      roms: [],
      consoles: [],
      emulators: [],
      loading: false,
      loadError: false,
      filters: {
        name: "",
        console: [],
        emulator: [],
        boots: null,
        playable: null,
      },
    };
  },
  mounted() {
    this.loading = true;
    axios
      .get(
        "https://opensheet.elk.sh/1fRqvAh_wW8Ho_8i966CCSBgPJ2R_SuDFIvvKsQCv05w/Database"
      )
      .then((response) => {
        const roms = response.data.map((item) => {
          const game = item.Game || "";

          return {
            timestamp: item.Timestamp,
            console: item.Console,
            game,
            gameLower: game.toLowerCase(),
            emulator: item.Emulator,
            boots: item["Boots"] === "Yes",
            playable: item["Playable"] === "Yes",
            notes: item.Notes,
          };
        });

        this.roms = roms;
        this.consoles = [...new Set(roms.map((item) => item.console))].sort();
        this.emulators = [...new Set(roms.map((item) => item.emulator))].sort();
        this.loadError = false;
      })
      .catch((err) => {
        console.log(err);
        this.loadError = true;
      })
      .finally(() => {
        this.loading = false;
      });
  },
};
</script>

<style></style>
