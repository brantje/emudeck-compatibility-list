<template>
  <b-row>
    <b-col>
      <b-form inline class="mb-3">
        <b-form-input
          id="title-search-input"
          v-model="filterInput.name"
          debounce="150"
          placeholder="Search for title.."
          class="mb-2 mr-sm-2 mb-sm-0"
        ></b-form-input>
        <b-dropdown
          id="console-filter-dropdown"
          text="Console"
          ref="consoleDropdown"
          class="m-2 max-height"
        >
          <b-dropdown-form>
            <b-form-group v-for="console in consoles" :key="console">
              <b-form-checkbox
                inline
                class="mb-3 text-left"
                v-model="filterInput.console"
                :id="`console-${console}`"
                :value="console"
              >
                {{ console }}
              </b-form-checkbox>
            </b-form-group>
          </b-dropdown-form>
        </b-dropdown>
        <b-dropdown
          id="emulator-filter-dropdown"
          text="Emulator"
          ref="emulatorDropdown"
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
                :id="`emulator-${emulator}`"
                :value="emulator"
              >
                {{ emulator }}
              </b-form-checkbox>
            </b-form-group>
          </b-dropdown-form>
        </b-dropdown>
        <b-input-group prepend="Boots" class="mb-2 mr-sm-2 mb-sm-0">
          <b-form-select
            id="boots-filter-select"
            placeholder=" - "
            v-model="filterInput.boots"
            :options="yesNoOptions"
          >
          </b-form-select>
        </b-input-group>
        <b-input-group prepend="Playable" class="mb-2 mr-sm-2 mb-sm-0">
          <b-form-select
            id="playable-filter-select"
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
  props: {
    filters: Object,
    consoles: Array,
    emulators: Array,
  },
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
  },
};
</script>
<style>
.max-height .dropdown-menu {
  max-height: 250px;
  overflow-y: auto;
}
</style>
