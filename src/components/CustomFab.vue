 <template>
  <div>
    <div v-if="containerType === 'repositories'">
      <b-modal
        centered
        fluid
        title="Create P2 repositories"
        id="addP2Repsitory"
        tabindex="-1"
        role="dialog"
        aria-labelledby="addP2Repsitory"
        aria-hidden="true"
      >
        <div>
          <img src="../images/Drops-128px.gif" hidden v-if="isDisabled" />
          <div class="container-fluid" if="!isDisabled">
            <div class="row">Select bundles for repository:</div>
            <div class="row">
              <div class="custom-file">
                <input
                  type="file"
                  class="custom-file-input"
                  id="modalFiles"
                  ref="modalFiles"
                  multiple
                  v-on:change="onChangedUploadFiles()"
                />
                <label class="custom-file-label" for="file-repository">Choose file</label>
              </div>
            </div>
          </div>
        </div>
        <template slot="modal-footer" slot-scope="{ cancel }">
          <b-button size="sm" @click="cancel()">Cancel</b-button>
          <b-button size="sm" variant="primary" @click="createRepository()">CreateRepository</b-button>
        </template>
      </b-modal>
    </div>

    <div v-if="containerType === 'profiles'">
      <b-modal
        size="xl"
        data-target=".bd-example-modal-lg"
        centered
        fluid
        title="Create P2 profiles"
        id="addP2Profiles"
        tabindex="-1"
        role="dialog"
        aria-labelledby="addP2Profiles"
        aria-hidden="true"
      >
        <div>
          <img src="../images/Drops-128px.gif" hidden v-if="isDisabled" />
          <div class="container-fluid" if="!isDisabled">
            <template>
              <v-app id="inspire">
                <v-card>
                  <v-card-title>
                    <v-text-field
                      append-icon="search"
                      label="Search"
                      v-model="searchAllIus"
                      single-line
                      hide-details
                    ></v-text-field>
                  </v-card-title>
                  <v-data-table
                    v-model="selected"
                    :headers="headersAllIus"
                    :items="iusAllRepositories"
                    :search="searchAllIus"
                    :pagination.sync="pagination"
                    class="elevation-1"
                  >
                    <template slot="headers" slot-scope="props">
                       <tr :active="props.selected" @click="props.selected = !props.selected">
                        <th>
                          <v-checkbox
                            :input-value="props.all"
                            :indeterminate="props.indeterminate"
                            primary
                            hide-details
                            @click.native="toggleAll"
                          ></v-checkbox>
                        </th>
                        <th
                          v-for="header in props.headers"
                          :key="header.text"
                          :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
                          @click="changeSort(header.value)"
                        >
                          <v-icon small>arrow_upward</v-icon>
                          {{ header.text }}
                        </th>
                      </tr>
                    </template>
                    <template slot="items" slot-scope="props">
                      <tr>
                        <td>
                          <v-checkbox hide-details @click.native="toggleOne(props.item)"></v-checkbox>
                        </td>
                        <td>{{ props.item.repositoryName }}</td>
                        <td>{{ props.item.version }}</td>
                      </tr>
                    </template>
                    <template v-slot:no-results>
                      <v-alert
                        :value="true"
                        color="error"
                        icon="warning"
                      >Your search for "{{ searchAllIus }}" found no results.</v-alert>
                    </template>
                  </v-data-table>
                </v-card>
              </v-app>
            </template>
          </div>
        </div>
        <template slot="modal-footer" slot-scope="{ cancel }">
          <b-button size="sm" @click="cancel()">Cancel</b-button>
          <b-button size="sm" variant="primary" @click="createProfile()">Create Profile</b-button>
        </template>
      </b-modal>
    </div>

    <fab
      :position="fabPosition"
      :bg-color="fabColor"
      :actions="fabActions"
      :icon-size="fabSize"
      @cache="cache"
      @invokeModal="invokeModal"
    ></fab>
  </div>
</template>

<script>
import fab from "vue-fab";

export default {
  props: ["containerType"],

  components: {
    fab: fab
  },
  data: function() {
    return {
      //FAB
      fabColor: "#8E44AD",
      fabPosition: "bottom-right",
      fabSize: "small",
      fabActions: [
        { name: "cache", icon: "cached" },
        { name: "invokeModal", icon: "add" }
      ],

      // All ius table
      selected: [],
      searchAllIus: "",
      headersAllIus: [
        {
          text: "name",
          value: "repositoryName"
        },
        {
          text: "version",
          value: "version"
        }
      ],
      iusAllRepositories: [
        {
          repositoryName: "KitKat",
          version: "0.0.0.0"
        }
      ],
      pagination: {
        sortBy: "name"
      }
    };
  },
  computed: {
    isDisabled() {
      if (!this.isModalButtonClicked) {
        console.log("true");
        return true;
      } else {
        console.log("false");
        return false;
      }
    }
  },
  methods: {
    onChangedUploadFiles() {
      this.modalFiles = this.$refs.modalFiles.files;
    },

    cache() {
      console.log("Cache Cleared");
    },
    invokeModal() {
      if (this.containerType === "repositories") {
        this.$bvModal.show("addP2Repsitory");
      } else {
        if (this.containerType === "profiles") {
          this.$bvModal.show("addP2Profiles");
          this.getAllUniqueInstallableUnits();
        }
      }
    },
    createRepository() {
      this.isModalButtonClicked = true;
      let formData = new FormData();

      for (var i = 0; i < this.modalFiles.length; i++) {
        let file = this.modalFiles[i];

        formData.append("files[" + i + "]", file);
      }

      for (var value of formData.values()) {
        console.log(value);
      }

      var vue = this;
      this.axios
        .post(
          "http://localhost:80/api/repository/create/?username=mladen",

          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"
            }
          }
        )
        .then(function() {
          console.log("SUCCESS!!");

          // hide modal and switch the tabs
          vue.$bvModal.hide("addP2Repsitory");
          console.log(vue.$listeners);
          vue.$emit("repositoryWasAdded", true);
        })
        .catch(function(error) {
          console.log("FAILURE!!" + error);
          // hide modal and switch the tabs
          vue.$bvModal.hide("addP2Repsitory");
          vue.$emit("repositoryWasAdded", false);
        });
    },

    getAllUniqueInstallableUnits() {
      var repoSizes = [];
      var json = null;
      var vue = this;

      this.axios
        .get("http://localhost/api/repository/list?username=mladen", {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"
          }
        })
        .then(function(response) {
          //cleans
          var tempLength = vue.iusAllRepositories.length;
          for (var index = 0; index < tempLength; index++) {
            vue.iusAllRepositories.pop();
          }

          for (var i = 0; i < response.data.length; i++) {
            var singleRepository = response.data[i];
            var tempIus = [];

            for (var j = 0; j < singleRepository.installableUnits.length; j++) {
              var tempIuName =
                singleRepository.installableUnits[j].artifacts[0].id;
              var tempIuVersion =
                singleRepository.installableUnits[j].artifacts[0].version
                  .major +
                "." +
                singleRepository.installableUnits[j].artifacts[0].version
                  .minor +
                "." +
                singleRepository.installableUnits[j].artifacts[0].version.micro;

              if (vue.iusAllRepositories.length == 0) {
                // first element
                vue.iusAllRepositories.push({
                  repositoryName: tempIuName,
                  version: tempIuVersion
                });
              } else {
                var isFoundInSavedInstallableUnits = false;
                for (var k = 0; k < vue.iusAllRepositories.length; k++) {
                  var currentSavedIu = vue.iusAllRepositories[k];
                  if (
                    currentSavedIu.repositoryName === tempIuName &&
                    currentSavedIu.version === tempIuVersion
                  ) {
                    isFoundInSavedInstallableUnits = true;
                  }
                }
                if (!isFoundInSavedInstallableUnits) {
                  vue.iusAllRepositories.push({
                    repositoryName: tempIuName,
                    version: tempIuVersion
                  });
                }
              }
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    createProfile() {
      var vue = this;
      var tempInstallableUnits = [];

      for (var index = 0; index < this.selected.length; index++) {
        tempInstallableUnits.push(this.selected[index]);
      }
      var data = { installableUnits: tempInstallableUnits };

      this.axios
        .post(
          "http://localhost:80/api/profile/create?username=mladen&profileName=test1",
          data,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"
            }
          }
        )
        .then(function(response) {
          vue.$emit("profileWasAdded", true);
          vue.$bvModal.hide("addP2Profiles");
          console.log("done");
        })
        .catch(function(error) {
          vue.$emit("profileWasAdded", false);
          vue.$bvModal.hide("addP2Profiles");
          console.log(error);
        });
    },
    toggleOne(item) {
      if (this.selected.some(e => e.repositoryName === item.repositoryName)) {
         console.log("PopUp")
         this.selected.pop(item);
      } else {
        console.log("adding")
        this.selected.push(item);

      }
    },
    toggleAll() {
      console.log("asdasd");
      if (this.selected.length) this.selected = [];
      else this.selected = this.iusAllRepositories.slice();
    },
    changeSort(column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    }
  }
};
</script>
<style>
.application--wrap {
  min-height: 0;
}
</style>
