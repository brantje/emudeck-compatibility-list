<template>
  <b-row>
    <b-col>
      <b-form inline class="mb-3">
        <b-form-input
          id="input-1"
          v-model="filterInput.name"
          placeholder="Search for title.."
          class="mb-2 mr-sm-2 mb-sm-0"
        ></b-form-input>
        <b-dropdown
          id="dropdown-form"
          text="Console"
          ref="dropdown"
          class="m-2 max-height"
        >
          <b-dropdown-form>
            <b-form-group v-for="console in consoles" :key="console">
              <b-form-checkbox
                inline
                class="mb-3 text-left"
                v-model="filterInput.console"
                :id="console"
                :value="console"
              >
                {{ console }}
              </b-form-checkbox>
            </b-form-group>
          </b-dropdown-form>
        </b-dropdown>
        <b-dropdown
          id="dropdown-form"
          text="Emulator"
          ref="dropdown"
          class="m-2 max-height"
        >
          <b-dropdown-form>
            <b-form-group
              v-for="emulator in emulators"
              :key="emulator"
              style="width: 150px"
            >
              <b-form-checkbox
                inline
                class="mb-3 text-left"
                v-model="filterInput.emulator"
                :id="emulator"
                :value="emulator"
              >
                {{ emulator }}
              </b-form-checkbox>
            </b-form-group>
          </b-dropdown-form>
        </b-dropdown>
        <b-input-group prepend="Boots" class="mb-2 mr-sm-2 mb-sm-0">
          <b-form-select
            id="inline-form-input-username"
            placeholder=" - "
            v-model="filterInput.boots"
            :options="yesNoOptions"
          >
          </b-form-select>
        </b-input-group>
        <b-input-group prepend="Playable" class="mb-2 mr-sm-2 mb-sm-0">
          <b-form-select
            id="inline-form-input-username"
            placeholder=" - "
            v-model="filterInput.playable"
            :options="yesNoOptions"
          >
          </b-form-select>
        </b-input-group>
      </b-form>
    </b-col>
  </b-row>
</template>
<script>
export default {
  name: "Filters",
  props: ["filters", "roms"],
  data() {
    return {
      yesNoOptions: [
        { value: null, text: "Yes / No" },
        { value: true, text: "Yes" },
        { value: false, text: "No" },
      ],
    };
  },
  computed: {
    filterInput: {
      get: function () {
        return this.filters;
      },
      set: function (newValue) {
        this.$emit("update:filters", newValue);
      },
    },
    consoles() {
      return [...new Set(this.roms.map((item) => item.console))];
    },
    emulators() {
      return [...new Set(this.roms.map((item) => item.emulator))];
    },
  },
};
</script>
<style>
.max-height .dropdown-menu {
  max-height: 250px;
  overflow-y: auto;
}
</style>