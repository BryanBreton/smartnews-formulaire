<template>
<div class="all">
  <v-container >
    
    <v-row class="text-center">
      <v-card class="mx-auto outlined align-center pa-4 mx-auto carte">
        <v-card-title>
          <v-img src="../assets/logoU.jpeg"></v-img>
          Choisissez votre Formulaire
        </v-card-title>
        <v-card-text>
          <div class="form blue rounded-lg ma-6" v-for="form in formulaires" :key="form" @click="redirect(form.idGoogleSheet)">
            {{form.range}}
          </div>
        </v-card-text>
      </v-card>

      

          
    </v-row>
  </v-container>
</div>
  
</template>

<script>
import axios from 'axios'
import ipv4 from 'node-ipv4'
  export default {
    name: 'Home',

    data: () => ({
      formulaires: [],
      ipHexa: ''
    }),

    beforeCreate(){
      axios.get('http://localhost:12346/sites/MyIP').then(res => {
        console.log(res.data);
        ipv4.parse(res.data, 16, (err, subnet) => {
        if (err) return console.error(err);
        console.log(subnet);
        this.ipHexa = subnet.address.hexadecimal
      }); 
      })
      
      axios.get('http://localhost:12346/sites/ip/'+this.ipHexa).then(resp => {
        console.log(resp.data)
        this.formulaires = resp.data
        console.log(this.formulaires.length);
        if(this.formulaires.length === 1){
          this.$store.dispatch('formulairesStore/setCurrentGoogleId', this.formulaires[0].idGoogleSheet)
          this.$router.push('About')
        }
      })
    },
    methods: {
        redirect(id){
          this.$store.dispatch('formulairesStore/setCurrentGoogleId', id)
          this.$router.push('About')
          console.log(id);
        }
        
    }
  }
</script>
<style>
.carte{
  width: 100%;
}
.all{
  height: 100%;
  background-color: #1E90FF;
}
</style>
