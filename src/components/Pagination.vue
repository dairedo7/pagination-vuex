<template>
  <div class="clearfix btn-group col-md-2 offset-md-5">
    <button type="button" class="btn btn-sm btn-outline-warning" v-if="page != 1" @click="page--">
      Previous
    </button>
    <button
      type="button"
      class="btn btn-sm btn-outline-warning"
      v-for="pageNumber in pages.slice(page - 1, page + 5)"
      :key="pageNumber.id"
      @click="page = pageNumber"
    >
      {{ pageNumber }}
    </button>
    <button
      type="button"
      @click="page++"
      v-if="page < pages.length"
      class="btn btn-sm btn-outline-warning"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    setPages() {
      let numberOfPages = Math.ceil(this.posts.length / this.perPage);
      for (let index = 1; index <= numberOfPages; index++) {
        this.pages.push(index);
      }
    },
    paginate(posts) {
      let page = this.page;
      let perPage = this.perPage;
      let from = page * perPage - perPage;
      let to = page * perPage;

      return posts.slice(from, to);
    },

    created() {
      this.getPosts();
    },
    computed: {
      displayedPosts() {
        return this.paginate(this.posts);
      },
    },
  },
};
</script>

<style lang="scss">
$mobile: 480px;
$tablet: 768px;
$desktop: 1280px;

.btn-group,
.btn-group-vertical {
  display: inline-flex;
  justify-content: center;
  vertical-align: middle;
  bottom: -30px;
  @media screen and (min-width: $tablet) {
    left: -135px;
  }
  @media screen and (min-width: 992px) {
    position: absolute;
    bottom: -57px;
    left: 0;
  }
}
</style>