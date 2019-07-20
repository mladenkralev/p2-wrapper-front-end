<template>
    <div id="sidebar" ref="sidebar">
      <div class="sidebar-header">
        <template v-if="isToggleOn">
          <h3>
            P2 Wrapper
            <button type="button" v-on:click="togleOff()" class="btn btn-light">
              <h4 id="arrow-right">&#8249;&#8249;</h4>
            </button>
          </h3>
        </template>
        <template v-else-if="isToggleOn === false">
          <strong id="collapsed">
            PW
            <button type="button" v-on:click="togleOn()" class="btn btn-light">
              <h4 id="arrow-left">&#8250;&#8250;</h4>
            </button>
          </strong>
        </template>
      </div>

      <ul class="list-unstyled components">
        <li v-on:click="viewRepositories()">
          <a href="#">
            <i class="fas fa-briefcase"></i>
            Repos
          </a>
        </li>
        <li v-on:click="viewProfile()">
          <a href="#">
            <i class="fas fa-briefcase"></i>
            Profiles
          </a>
        </li>
        <li class="active">
          <a
            href="#homeSubmenu"
            data-toggle="collapse"
            aria-expanded="false"
            class="dropdown-toggle"
          >
            <i class="fas fa-home"></i>
            Home
          </a>
          <ul class="collapse list-unstyled" id="homeSubmenu">
            <li>
              <a href="#">Home 1</a>
            </li>
            <li>
              <a href="#">Home 2</a>
            </li>
            <li>
              <a href="#">Home 3</a>
            </li>
          </ul>
        </li>
        <li>
          <a href="#">
            <i class="fas fa-paper-plane"></i>
            Contact
          </a>
        </li>
      </ul>
    </div>
</template>

<script>
export default {
  props: ['iusSingleRepository'],

  data: function() {
    return {
        containerType: "repositories",
        isToggleOn: true,
    };
  },
  methods: {
    viewRepositories() {
      this.containerType = "repositories";
      this.$emit("mainViewChanged" , this.containerType)
    },
    viewProfile() {
      this.containerType = "profiles";
      this.$emit("mainViewChanged" , this.containerType)
    },
     togleOff() {
      this.$refs.sidebar.classList.add("active");
      this.isToggleOn = false;
    },
    togleOn() {
      this.$refs.sidebar.classList.remove("active");
      this.isToggleOn = true;
    },
  }
};
</script>
<style>
/* ---------------------------------------------------
    SIDEBAR STYLE
----------------------------------------------------- */

.wrapper {
  display: flex;
  align-items: stretch;
}

#sidebar {
  min-width: 250px;
  max-width: 250px;
  background: #b3b3ff;
  color: #fff;
  transition: all 0.3s;
}

#sidebar.active {
  min-width: 80px;
  max-width: 80px;
  text-align: center;
}

#sidebar.active .sidebar-header h3,
#sidebar.active .CTAs {
  display: none;
}

#sidebar.active .sidebar-header #collapsed {
  display: block;
}

#sidebar ul li a {
  text-align: left;
}

#sidebar.active ul li a {
  padding: 20px 10px;
  text-align: center;
  font-size: 0.85em;
}

#sidebar.active ul li a i {
  margin-right: 0;
  display: block;
  font-size: 1.8em;
  margin-bottom: 5px;
}

#sidebar.active ul ul a {
  padding: 10px !important;
}

#sidebar.active .dropdown-toggle::after {
  top: auto;
  bottom: 10px;
  right: 50%;
  -webkit-transform: translateX(50%);
  -ms-transform: translateX(50%);
  transform: translateX(50%);
}

#sidebar .sidebar-header {
  padding: 20px;
  background: #b3b3ff;
}

#sidebar .sidebar-header #collapsed {
  display: none;
  font-size: 1.8em;
}

#sidebar ul.components {
  padding: 20px 0;
}

#sidebar ul li a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
}

#sidebar ul li a:hover {
  color: #b3b3ff;
  background: #fff;
}

#sidebar ul li a i {
  margin-right: 10px;
}

#sidebar ul li.active > a,
a[aria-expanded="true"] {
  color: #fff;
  background: #b3b3ff;
}

a[data-toggle="collapse"] {
  position: relative;
}

.dropdown-toggle::after {
  display: block;
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
}

ul ul a {
  font-size: 0.9em !important;
  padding-left: 30px !important;
  background: #b3b3ff;
}

ul.CTAs {
  padding: 20px;
}

ul.CTAs a {
  text-align: center;
  font-size: 0.9em !important;
  display: block;
  border-radius: 5px;
  margin-bottom: 5px;
}

a.download {
  background: #fff;
  color: #7386d5;
}

a.article,
a.article:hover {
  background: #b3b3ff !important;
  color: #fff !important;
}
@media (max-width: 768px) {
  #sidebar {
    min-width: 80px;
    max-width: 80px;
    text-align: center;
    margin-left: -80px !important;
  }
  .dropdown-toggle::after {
    top: auto;
    bottom: 10px;
    right: 50%;
    -webkit-transform: translateX(50%);
    -ms-transform: translateX(50%);
    transform: translateX(50%);
  }
  #sidebar.active {
    margin-left: 0 !important;
  }
  #sidebar .sidebar-header h3,
  #sidebar .CTAs {
    display: none;
  }
  #sidebar .sidebar-header #collapsed {
    display: block;
  }
  #sidebar ul li a {
    padding: 20px 10px;
  }
  #sidebar ul li a span {
    font-size: 0.85em;
  }
  #sidebar ul li a i {
    margin-right: 0;
    display: block;
  }
  #sidebar ul ul a {
    padding: 10px !important;
  }
  #sidebar ul li a i {
    font-size: 1.3em;
  }
  #sidebar {
    margin-left: 0;
  }
  #sidebarCollapse span {
    display: none;
  }
}
#loading-enable {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 500px;
  margin-top: -250px; /* Half the height */
  margin-left: -250px; /* Half the width */
}

#loading-disabled {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 500px;
  height: 500px;
  margin-top: -250px; /* Half the height */
  margin-left: -250px; /* Half the width */
}
</style>
