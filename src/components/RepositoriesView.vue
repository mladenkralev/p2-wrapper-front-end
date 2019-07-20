<template>
  <div>
    <template v-if="noRepositories">
      <b-card no-body class="mb-2">
        <b-tabs card>
          <b-tab title="Summary" active>
            <div class="row no-gutters d-flex justify-content-center main-row">
              <div class="col-md-auto text-center">
                <div class="main-area-no-content">
                  <div id="no-repository">
                    <custom-fab :containerType="containerType" @repositoryWasAdded="updateChart()"></custom-fab>
                    <p id="no-repository-text">No repositories found</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="row no-gutters justify-content-md-center footer-row">
              <div id="col-md-auto">
                <div id="footer"></div>
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </b-card>
    </template>
    <template v-else-if="noRepositories === false">
      <b-card no-body>
        <b-tabs v-model="tabRepositoryIndex" card>
          <b-tab title="Summary">
            <div class="container-fluid d-flex flex-column">
              <div class="row no-gutters main-row">
                <div class="main-area-repository-summary">
                  <div id="col-md-6" class>
                    <div class="elevation-1" id="chart">
                      <apexchart type="donut" width="480" :options="chartOptions" :series="series" />
                    </div>
                    <button @click="updateChart()">Refresh</button>

                    <a
                      href="#addP2Profile"
                      data-toggle="modal"
                      data-target="#addP2Profile"
                      id="no-profile-button"
                      class="btn btn-primary btn-info"
                    >
                      <span class="glyphicon glyphicon-plus">+</span>
                    </a>
                    <p id="no-profile-text">No profiles found</p>
                  </div>

                  <div id="col-md-auto" class="column-table">
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
              </div>
              <div class="row no-gutters" id="overview">
                <h1>Some summary</h1>
              </div>
            </div>
          </b-tab>

          <b-tab title="Search in repository">
            <b-card-text>Tab Contents 2</b-card-text>
            <div class="row no-gutters main-row">
              <repository-table :iusSingleRepository="iusSingleRepository"></repository-table>
            </div>
          </b-tab>
        </b-tabs>
      </b-card>
    </template>
  </div>
</template>

<script>
export default {
  props: ["noRepositories", "containerType"],

  data: function() {
    return {
      tabRepositoryIndex:1,

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

      // For RepositorTable Child component
      iusSingleRepository: [
        {
          id: "KitKat",
          providedCapabilities: ["sugar", "illness"],
          requiredCapabilities: ["bad", "people"]
        }
      ],

      //chart
      series: [44, 55, 13, 33],
      chartOptions: {
        pie: {
          donut: {
            size: "95%"
          }
        },
        labels: [1, 2, 3, 4],
        dataLabels: {
          enabled: false
        },

        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: "100%"
              },
              legend: {
                show: false
              }
            }
          }
        ],
        legend: {
          position: "bottom",
          horizontalAlign: "center"
        },
        title: {
          align: "center",
          text: "Installable Units in repositories",
          style: {
            fontSize: "16px",
            color: "#263238"
          }
        }
      }
    };
  },
  methods: {
    repositoryClick(selectedRepository) {
      var vue = this;
      console.log(
        "Sending request to " +
          "http://localhost/api/repository/get?username=mladen&repository=" +
          selectedRepository.repositoryName
      );
      this.axios
        .get(
          "http://localhost/api/repository/get?username=mladen&repository=" +
            selectedRepository.repositoryName
        )
        .then(function(response) {
          //cleans
          var tempLength = vue.iusSingleRepository.length;
          for (var index = 0; index < tempLength; index++) {
            console.log("Clening " + +" index " + index);

            vue.iusSingleRepository.pop();
          }

          var repositories = response.data;
          for (var i = 0; i < repositories.length; i++) {
            console.log(repositories[i].repositoryName);
            console.log(repositories[i].repoSize);
            console.log(repositories[i].installableUnits);

            var repository = repositories[i];
            var tempIus = [];
            for (var j = 0; j < repository.installableUnits.length; j++) {
              console.log(repository.installableUnits[j].artifacts[0].id);

              // //installable units provided capabilities
              var providedCapabilities = [];
              for (
                var k = 0;
                k < repository.installableUnits[j].providedCapabilities.length;
                k++
              ) {
                providedCapabilities.push(
                  repository.installableUnits[j].providedCapabilities[k]
                );
              }

              //required capabilities
              var requiredCapabilities = [];
              for (
                var k = 0;
                k < repository.installableUnits[j].requireCapabilities.length;
                k++
              ) {
                requiredCapabilities.push(
                  repository.installableUnits[j].requireCapabilities[k]
                );
              }

              vue.iusSingleRepository.push({
                id: repository.installableUnits[j].artifacts[0].id,
                providedCapabilities: providedCapabilities,
                requiredCapabilities: requiredCapabilities
              });
              console.log(vue.iusSingleRepository);
            }
          }
        })
        .catch(function(error) {
          console.log("FAILURE!!" + error);
        });
      this.tabRepositoryIndex = 1;
    },

    updateChart() {
      this.noRepositories = false;
      this.$emit("repositoryExists",  this.noRepositories);

      console.log("Updating chart");
      var repoSizes = [];
      var json = null;

      var vue = this;
      vue.chartOptions.labels = [];
      this.axios
        .get("http://localhost/api/repository/list?username=mladen")
        .then(function(response) {
          json = response.data;

          console.log("Response is " + response);
          console.log("Json is" + json);
          var arrayLength = json.createdRepositories.length;
          for (var i = 0; i < arrayLength; i++) {
            var currentRepository = json.createdRepositories[i];
            vue.chartOptions.labels.push(currentRepository.repositoryName);
            repoSizes.push(currentRepository.repoSize);
          }
          vue.series = repoSizes;
          vue.iusAllRepositories = response.data.createdRepositories;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style>
</style>
