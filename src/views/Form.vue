<template style="background-color: red">
  <v-container style="background-color: white">
    <v-row class="text-center">
      <v-col cols="12">
        <v-img src="../assets/img_entrepot.png"></v-img>
      </v-col>

      <v-col class="mb-4">
        <p class="font-weight-bold mb-3">
          Faites remonter des informations {{currentGoogleId}}
        </p>

      </v-col>

      <v-col
        class="mb-5"
        cols="12"
      >
  <v-form
    ref="form"
    lazy-validation
  >
  <v-alert
      :value="alert"
      color="pink"
      dark
      border="top"
      icon="mdi-home"
      transition="scale-transition"
    >
      Vos informations ont été transmises</v-alert>
    <v-text-field
      v-model="name"
      :counter="10"
      label="Nom"
      required
    ></v-text-field>

    <v-text-field
      v-model="motif"
      label="Motif"
      required
    ></v-text-field>

    

    <v-btn
      color="success"
      class="mr-4"
      @click="valider()"
    >
      Valider
    </v-btn>
    <v-btn
      color="grey"
      class="mr-4"
      @click="vider()"
    >
      Annuler
    </v-btn>

  </v-form>

        
      </v-col>

      

          
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import {mapState} from 'vuex'
  export default {
    name: 'HelloWorld',

    data: () => ({
     name: '',
     motif: '',
     alert: false
    }),
    beforeCreate(){
      
    },
    
  computed:{
      ...mapState('formulairesStore', ['currentGoogleId'])
  },
    methods: {
        
        vider(){
          console.log(this.currentGoogleId)
          this.name = ""
          this.motif = ""
        },
        valider(){
          if(this.name == "" && this.motif == ""){
            console.log("vide")
          } else {
            axios.post("http://localhost:12346/formulaires/write", {
                nom: this.name,
                motif: this.motif,
                googleId: this.currentGoogleId
            }).then(res => {
                console.log(res)
                this.alert = true
                setTimeout(() => {
                  this.alert = false
                }, 3000);
                this.vider()
            }).catch(err => {
              console.log(err)
              alert(err)
            })
          }
            
        },
        $_GET(param) {
        var vars = {};
        window.location.href.replace( location.hash, '' ).replace( 
          /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
          function( m, key, value ) { // callback
            vars[key] = value !== undefined ? value : '';
          }
        );

        if ( param ) {
          return vars[param] ? vars[param] : null;	
        }
        return vars;
      }
    }
  }
</script>
