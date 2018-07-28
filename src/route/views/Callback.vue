<template>
  <page-content>
    <div class="main-content">
      <p>Een moment geduld, je wordt zo door gestuurd.</p>
    </div>
  </page-content>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('auth/handleAuthentication')
      .then(() => {
        this.$router.push({ name: 'count' });
      })
      .catch(err => console.error(err));
  }
}
</script>

<style>

</style>
