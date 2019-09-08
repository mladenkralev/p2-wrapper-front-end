<template>
  <div class="wrapper" id="app">
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      rel="stylesheet"
      type="text/css"
    />
    <link
      href="https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css"
      rel="stylesheet"
      type="text/css"
    />

    <link
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.css"
      rel="stylesheet"
      type="text/css"
    />

    <sidebar @mainViewChanged="containerType=$event" />

    <div id="content">
      <!--------------------------------------------- 
                        MAIN AREA 
      ----------------------------------------------->
      <div class="custom-container w-100 h-100 container-fluid d-inline-block">
        <!-- ############# REPOSITORIES #############-->
        <div v-if="containerType === 'repositories'">
          <repositories-view
            @repositoryExists="noRepositories=$event"
            :noRepositories="noRepositories"
            :containerType="containerType"
          />
        </div>
        <!-- ############# PROFILES #############-->
        <div v-else-if="containerType === 'profiles'">
          <profiles-view  
            @profileExists="noProfiles=$event"
            :noRepositories="noRepositories" 
            :noProfiles="noProfiles" 
            :containerType="containerType"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      containerType: "repositories",
      noRepositories: true,
      noProfiles: true,
      tabRepositoryIndex: 0
    };
  },
  methods: {
    test() {
      console.log("deniiiii");
    }
  }
};
</script>

<style>
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";
body {
  font-family: "Poppins", sans-serif;
  background: #fafafa;
}

p {
  font-family: "Poppins", sans-serif;
  font-size: 1.1em;
  font-weight: 300;
  line-height: 1.7em;
  color: #999;
}

a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

.navbar {
  padding: 15px 10px;
  background: #fff;
  border: none;
  border-radius: 0;
  margin-bottom: 5px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.navbar-btn {
  box-shadow: none;
  outline: none !important;
  border: none;
}

.line {
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed #ddd;
  margin: 40px 0;
}

i,
span {
  display: inline-block;
}

/* ---------------------------------------------------
    CONTENT STYLE
----------------------------------------------------- */

#content {
  width: 100%;
  padding: 0px;
  min-height: 100vh;
  transition: all 0.3s;
}

/* ---------------------------------------------------
    MEDIAQUERIES
----------------------------------------------------- */

body {
  overflow: hidden;
}

.custom-container {
  min-height: 250px;
  padding: 0px;
}

.main-row {
  background-color: #cfd9fa;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  min-height: 75vh;
  display: inline-block;
  width: 100%;
}

.main-area-no-content {
  height: 85vh;
  padding-top: 40vh;
  display: inline-block;
}

.main-area-repository-summary {
  height: 85vh;
  display: inline-flex;
  min-width: 40vh;
  width: 100%;
}

.footer {
  height: 15vh;
}

.footer-row {
  margin-top: 20px;
  background-color: #b3d9ff;
}

#no-repository {
  display: -webkit-inline-box;
}

#no-repository-button {
  margin-right: 5px;
}
#no-repository-text {
  margin: 5px;
}

#no-profile {
  display: -webkit-inline-box;
}

#no-profile-button {
  margin-right: 5px;
}
#no-profile-text {
  margin: 5px;
}
#arrow-right {
  margin: 0px;
}

#arrow-left {
  margin: 0px;
}

#chart {
  margin-top: 1vh;
  width: 60vh;
  margin-left: 1vh;
  margin-right: 1vh;
  border-radius: 5px;
  background-color: white;
}

.column-table {
  margin-top: 1vh;
  margin-right: 1vh;
  min-width: 50vh;
  width: 100%;
}

.chart-main-container-repository-padding {
  margin-top: 1vh;
  margin-left: 0vh;
  padding: 0;
}

#height-20vh {
  height: 20vh;
  max-height: 20vh;
}

.my-custom-scrollbar {
  position: relative;
  height: 200px;
  overflow: auto;
}

.table-wrapper-scroll-y {
  display: block;
}

.summary-main-table {
  width: 90vh;
  min-width: 90vh;
  width: 100%;
}

#height-100-percentage {
  height: 100;
}

#overview {
  border: 2px solid #73ad21;
  height: 15vh;
}
.mobile {
  color: #333;
}
.nav li:hover a {
  border: none;
  background: none;
  color: #00adee;
}
.provided-capability {
  /* background: linear-gradient(45deg, rgba(153,255,148,1) 0%, rgba(248,255,122,1) 100%); */
  background: #e2ff95;
  font-family: "Poppins", sans-serif;
}

.require-capability {
  background: #ffb495;
  font-family: "Poppins", sans-serif;
}
</style>

