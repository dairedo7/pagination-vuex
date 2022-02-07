<template>
  <ul class="post">
    <div class="container">
      <div class="generated-post" v-for="post in displayedPosts" :key="post.id">
        <div class="container">
          <li class="post__item">
            <h2 class="post__title">{{ post.title.slice(0, 30) }}</h2>
            <p class="post__author"><b>Author : </b>Daniel Hopkins</p>
            <p class="post__body" v-if="!readMore[post.id]">
              {{ post.body.slice(0, 120) }}

              <button @click="showMore(post.id)" v-if="!readMore[post.id]" class="btn readMoreBtn">
                Show more
              </button>
            </p>
            <button @click="removeBtn(post.id)" class="btn post__remove-btn" type="button">
              Remove
            </button>
            <p class="more" v-if="readMore[post.id]">
              {{ post.body }}
            </p>
            <button @click="showLess(post.id)" v-if="readMore[post.id]" class="btn readMoreBtn">
              Show less
            </button>
          </li>
        </div>
        <!-- <Pagination /> -->
      </div>
      <div class="clearfix btn-group col-md-2 offset-md-5">
        <button
          type="button"
          class="btn btn-sm btn-outline-warning"
          v-if="page != 1"
          @click="page--"
        >
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
    </div>
  </ul>
</template>

<script>
export default {
  name: 'postsList',
  props: {
    posts_data: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      readMore: {},

      page: 1,
      perPage: 10,
      pages: [],
    };
  },

  methods: {
    setPages() {
      let numberOfPages = Math.ceil(this.posts_data.length / this.perPage);
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
    removeBtn(id) {
      let index = this.posts_data.map(item => item.id).indexOf(id);
      this.posts_data.splice(index, 1);
    },
    showMore(id) {
      this.$set(this.readMore, id, true);
    },
    showLess(id) {
      this.$set(this.readMore, id, false);
    },
  },
  watch: {
    posts_data() {
      this.setPages();
    },
  },
  computed: {
    displayedPosts() {
      return this.paginate(this.posts_data);
    },
  },
};
</script>

<style scoped lang="scss">
$mainColor: #000;
$secondaryColor: #fff;
$orangeColor: #ff6c00;
$cardBackgroundColor: #f7f7f7;
$timing-function: cubic-bezier(0.4, 0, 0.2, 1);
$trans-duration: 250ms;
$mobile: 480px;
$tablet: 768px;
$desktop: 1280px;
* {
  font-family: Open Sans;
  line-height: 1.33;
  letter-spacing: 0.09em;
}
h2 {
  margin: 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.container {
  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
}
.post {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-bottom: 75px;
  &__item {
    position: relative;
    padding: 10px;
    @media screen and (min-width: $mobile) {
      .post__item {
        width: 325px;
      }
    }
    @media screen and (min-width: $tablet) {
      width: 330px;
    }
    @media screen and (min-width: $desktop) {
      width: 285px;
    }
    max-width: 350px;
    height: 350px;
    border: 1px inset rgb(236, 221, 221);
    border-radius: 25px;
    background: $cardBackgroundColor;
    text-align: center;
    margin-top: 40px;
    &:hover,
    &:focus {
      border: outset;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
    }
  }
}
.post {
  &__title {
    margin-top: 10px;
    font-size: 28px;
    line-height: 1.17;
    color: $orangeColor;
  }
  &__author {
    font-size: 20px;
    line-height: 1.17;
  }
}
.btn {
  cursor: pointer;
  text-transform: uppercase;
  transition: $timing-function $trans-duration;
  transition-property: color background-color;
}
.readMoreBtn {
  display: block;
  margin: 0 auto;
  margin-top: 15px;
  height: 20px;
  border-radius: 25px;
  border: 1px solid orange;
  font-style: normal;
  font-weight: 600;
  font-size: 8px;
  color: $mainColor;
  background: transparent;
  &:hover,
  &focus {
    background-color: $secondaryColor;
  }
}
.post__remove-btn {
  position: absolute;
  width: 93px;
  height: 30px;
  margin: -1px 35px;
  bottom: 18px;
  border-radius: 25px;
  border: 1px solid orange;
  font-style: normal;
  font-weight: 600;
  font-size: 10px;
  color: $mainColor;
  background: $secondaryColor transparent;
  &:hover,
  &:focus {
    color: $secondaryColor;
    background-color: $orangeColor;
  }
}
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