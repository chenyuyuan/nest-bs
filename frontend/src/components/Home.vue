<template>
<el-container>
 <Header></Header>
 <Footer></Footer>
</el-container>
</template>
<script>
import axios from "axios";

import Header from "./Header"
import Footer from "./Footer"

export default {
  name: "Home",
  components: {
    Header,
    Footer
  },
  
 
};
</script>
