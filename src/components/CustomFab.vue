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
                <v-card>
                  <v-card-title>
                    <v-text-field
                      v-model="searchAllRepositories"
                      append-icon="search"
                      label="Search"
                      single-line
                      hide-details
                    ></v-text-field>
                  </v-card-title>
                  <v-data-table
                    :headers="headersAllRepositories"
                    :items="iusAllRepositories"
                    :search="searchAllRepositories"
                    class="elevation-1"
                  >
                    <template v-slot:items="props">
                      <tr @click="repositoryClick(props.item)">
                        <td>{{ props.item.repositoryName }}</td>
                        <td class="text-xs-left">{{ props.item.repoSize }}</td>
                      </tr>
                    </template>
                    <template v-slot:no-results>
                      <v-alert
                        :value="true"
                        color="error"
                        icon="warning"
                      >Your search for "{{ search }}" found no results.</v-alert>
                    </template>
                  </v-data-table>
                </v-card>
              </template>
          </div>
        </div>
        <template slot="modal-footer" slot-scope="{ cancel }">
          <b-button size="sm" @click="cancel()">Cancel</b-button>
          <b-button size="sm" variant="primary" @click="createRepository()">CreateRepository</b-button>
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
      // All repositories table
      searchAllRepositories: "",
      headersAllRepositories: [
        {
          text: "name",
          value: "repositoryName"
        },
        { text: "size", value: "repoSize" }
      ],
      iusAllRepositories: [
        {
          repositoryName: "KitKat",
          repoSize: 518
        }
      ],

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
          this.getAvailableRepositories();
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

    getAvailableRepositories() {
      var repoSizes = [];
      var json = null;
      var vue = this;

      this.axios
        .get("http://localhost/api/repository/list?username=mladen")
        .then(function(response) {
          json = response.data;

          var arrayLength = json.createdRepositories.length;
          for (var i = 0; i < arrayLength; i++) {
            var currentRepository = json.createdRepositories[i];
          }
          vue.iusAllRepositories = response.data.createdRepositories;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

  }
};
</script>