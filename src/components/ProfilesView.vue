
<template>
  <div>
    <template v-if="noProfiles">
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Summary" active>
            <div class="row no-gutters d-flex justify-content-center main-row">
              <div class="col-md-auto text-center">
                <div class="main-area-no-content">
                  <div id="no-profile">
                    <custom-fab :containerType="containerType" @profileWasAdded="updateChart()"></custom-fab>
                    <p id="no-profile-text">No profiles found</p>
                  </div>
                </div>
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </b-card>
    </template>
    <template v-else-if="noProfiles === false">
      <b-card no-body>
        <b-tabs v-model="tabProfileTabIndex" card>
          <b-tab title="Summary" active>
            <div class="row no-gutters d-flex justify-content-center main-row">
              <div class="col-md-auto text-center">
                <div class>
                  <div id="no-profile">
                    <custom-fab :containerType="containerType" @profileWasAdded="updateChart()"></custom-fab>
                    <div class="profile-table">
                      <template>
                        <v-card>
                          <v-card-title>
                            <v-text-field
                              v-model="searchAllProfiles"
                              append-icon="search"
                              label="Search"
                              single-line
                              hide-details
                            ></v-text-field>
                          </v-card-title>
                          <v-data-table
                            :headers="headersAllProfiles"
                            :items="iusAllProfiles"
                            :search="searchAllProfiles"
                            class="elevation-1"
                            :rows-per-page-items="[10]"
                          >
                            <template v-slot:items="props">
                              <tr @click="profileClick(props.item)">
                                <td>{{ props.item.profileName }}</td>
                                <td class="text-xs-left">{{ props.item.profileSize }}</td>
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
                </div>
              </div>
            </div>
          </b-tab>
          <b-tab title="Search in profiles" title-item-class="disabledTab">
            <b-card-text>Profles content</b-card-text>
            <div class="row no-gutters main-row">
              <installable-units-table :installableUnits="iusSingleProfile"></installable-units-table>
            </div>
          </b-tab>
        </b-tabs>
      </b-card>
    </template>
  </div>
</template>

<script>
export default {
  props: ["noRepositories", "noProfiles", "containerType"],

  data: function() {
    return {

      tabProfileTabIndex: 0,
      // All profiles table
      searchAllProfiles: "",
      headersAllProfiles: [
        {
          text: "name",
          value: "profileName"
        },
        { text: "size", value: "profileSize" }
      ],
      iusAllProfiles: [
        {
          profileName: "KitKat",
          profileSize: 518
        }
      ],
      // For RepositorTable Child component
      iusSingleProfile: [
        {
          id: "KitKat",
          providedCapabilities: ["sugar", "illness"],
          requiredCapabilities: ["bad", "people"]
        }
      ]
    };
  },
  conputed: {

  },
  methods: {
    updateChart() {
      this.noProfiles = false;
      console.log("Updating Profile chart " + this.noProfiles);
      this.$emit("profileExists", this.noProfiles);

      let formData = new FormData();
      var vue = this;

      this.axios
        .get(
          "http://localhost/api/profile/list?username=mladen",

          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"
            }
          }
        )
        .then(function(response) {
          var json = response.data;

          console.log("Response is " + response);
          console.log("Json is" + json);

          vue.iusAllProfiles = response.data;
          console.log(vue.iusAllProfiles);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    profileClick(selectedProfile) {
      var vue = this;
      let formData = new FormData();
      
      console.log(
        "Sending request to " +
          "http://localhost/api/profile/list?username=mladen&profile=" +
          selectedProfile.profileName
      );
      this.axios
        .get(
          "http://localhost/api/profile/list?username=mladen&profile=" +
            selectedProfile.profileName,

          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, OPTIONS"
            }
          }
        )
        .then(function(response) {
          vue.tabProfileTabIndex=1;
          //cleans
          var tempLength = vue.iusSingleProfile.length;
          for (var index = 0; index < tempLength; index++) {
            console.log("Clening " + +" index " + index);

            vue.iusSingleProfile.pop();
          }

          var profiles = response.data;
          for (
            var iteratorProfiles = 0;
            iteratorProfiles < profiles.length;
            iteratorProfiles++
          ) {
            console.log(profiles[iteratorProfiles].repositoryName);
            console.log(profiles[iteratorProfiles].repoSize);
            console.log(profiles[iteratorProfiles].installableUnits);

            var currentProfile = profiles[iteratorProfiles];
            var tempIus = [];
            for (
              var iteratorIUs = 0;
              iteratorIUs < currentProfile.installableUnits.length;
              iteratorIUs++
            ) {
              console.log(
                currentProfile.installableUnits[iteratorIUs].artifacts[0].id
              );

              //installable units provided capabilities
              var providedCapabilities = [];
              for (
                var iteratorSingleIu = 0;
                iteratorSingleIu <
                currentProfile.installableUnits[iteratorIUs]
                  .providedCapabilities.length;
                iteratorSingleIu++
              ) {
                providedCapabilities.push(
                  currentProfile.installableUnits[iteratorIUs]
                    .providedCapabilities[iteratorSingleIu]
                );
              }
              console.log(providedCapabilities);

              var requiredCapabilities = [];
              for (
                var iteratorSingleIu = 0;
                iteratorSingleIu <
                currentProfile.installableUnits[iteratorIUs].requireCapabilities
                  .length;
                iteratorSingleIu++
              ) {
                requiredCapabilities.push(
                  currentProfile.installableUnits[iteratorIUs]
                    .requireCapabilities[iteratorSingleIu]
                );
              }
              console.log(requiredCapabilities);

              // push it
              vue.iusSingleProfile.push({
                id:
                  currentProfile.installableUnits[iteratorIUs].artifacts[0].id,
                providedCapabilities: providedCapabilities,
                requiredCapabilities: requiredCapabilities
              });
              console.log(vue.iusSingleProfile);
            }
          }
        })
        .catch(function(error) {
          console.log("FAILURE!!" + error);
        });
    
    }
  },

  created() {
    var vue = this;
    // checks for repositories
    this.axios.get("http://localhost/api/profile/list?username=mladen")
        .then(function(response) {
          var arrayLength = response.data.length;
          if(arrayLength != 0 ) {
            vue.updateChart();
          }
        })
        .catch(function(error) {
            this.noRepositories = true;
        });
    },
};
</script>
<style>
.profile-table {
  margin-top: 2vh;
  margin-right: 2vh;
  margin-left: 2vh;
  min-width: 145vh;
  height: 100%;
}
.disabledTab{
    pointer-events: none;
}
</style>
