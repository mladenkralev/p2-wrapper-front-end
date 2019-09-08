 <template>
  <div>
    <template>
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="searchInstallbleUnits"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
          :headers="headersInstallbleUnits"
          :items="installableUnits"
          :search="searchInstallbleUnits"
          :expand="expand"
          class="elevation-1"
        >
          <template v-slot:items="props">
            <tr @click="props.expanded = !props.expanded">
              <td>{{ props.item.id }}</td>
            </tr>
          </template>

          <template v-slot:expand="props">
            <v-card flat>
              <div v-for="(provided) in props.item.providedCapabilities">
                <v-card-text class="provided-capability">{{provided}}</v-card-text>
              </div>
            </v-card>
            <v-card flat>
              <div v-for="(required) in props.item.requiredCapabilities">
                <v-card-text class="require-capability">{{required}}</v-card-text>
              </div>
            </v-card>
          </template>
          <template v-slot:no-results>
            <v-alert
              :value="true"
              color="error"
              icon="warning"
            >Your search for "{{ searchInInstallableUnits }}" found no results.</v-alert>
          </template>
        </v-data-table>
      </v-card>
    </template>
  </div>
</template>

<script>
export default {
  props: ['installableUnits'],

  data: function() {
    return {
      // SINGLE TABLE CONTENT
      object: [1, 2, 3, 4],
      expand: false,
      searchInstallbleUnits: "",
      headersInstallbleUnits: [{ text: "name", value: "id" }],
    };
  }
};
</script>

