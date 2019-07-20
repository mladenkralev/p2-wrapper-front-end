
<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Summary" active>
          <div class="row no-gutters d-flex justify-content-center main-row">
            <div class="col-md-auto text-center">
              <div class="main-area-no-content">
                <div id="no-profile">
                  <custom-fab :containerType="containerType"></custom-fab>
                  <p id="no-profile-text">No profiles found</p>
                </div>
              </div>
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<script>
export default {
  props: ["noRepositories", "containerType"],

  data: function() {
    return {};
  },
  methods: {}
};
</script>
<style>
</style>
