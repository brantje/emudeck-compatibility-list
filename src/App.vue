<template>
  <b-container fluid="xl">
    <a href="https://github.com/brantje/emudeck-compatibility-list" target="_blank" style="position: absolute; right: 0;"><img decoding="async" loading="lazy" width="149" height="149" src="https://github.blog/wp-content/uploads/2008/12/forkme_right_darkblue_121621.png?resize=149%2C149" class="attachment-full size-full" alt="Fork me on GitHub" data-recalc-dims="1"></a>
    <h1>Emudeck compatibility list</h1>
    <b-row>
      <b-col sm="12" md="3" xl="1"> </b-col>
    </b-row>
    <Filters :filters="filters" :roms="roms"></Filters>

    <RomList :roms="roms" :filters="filters" />
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
    axios
      .get(
        "https://opensheet.elk.sh/1fRqvAh_wW8Ho_8i966CCSBgPJ2R_SuDFIvvKsQCv05w/Database"
      )
      .then((response) => {
        const items = response.data;
        const roms = [];
        // Make sure the internal data structure is always the same
        // Just in case sheet changes.
        for (let item of items) {
          roms.push({
            timestamp: item.Timestamp,
            console: item.Console,
            game: item.Game,
            emulator: item.Emulator,
            boots: item["Boots"] === "Yes",
            playable: item["Playable"] === "Yes",
            notes: item.Notes,
          });
        }
        this.roms = roms;
      })
      .catch((err) => {
        console.log(err);
        // Manage the state of the application if the request
        // has failed
      });
  },
};
</script>

<style></style>
