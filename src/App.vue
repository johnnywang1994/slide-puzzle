<template>
  <div id="app">
    <div class="puzzle-wrapper" :key="`puzzle_${hash}`">
      <VueSlidePuzzle
        :src="imageSrc"
        @card-drop="onUserMovePuzzle"
        @card-touchend="onUserMovePuzzle"
      />
    </div>
    <p>* User steps: {{ count }}</p>

    <!-- Control -->
    <div class="panel">
      <label class="upload-label" touchstart="">
        <span>Upload</span>
        <input type="file" @change="onFileUpload" />
      </label>
      <div class="reset-btn" @click="resetPuzzle" touchstart="">
        <span>Reset</span>
      </div>
    </div>
    <h1>Vue Slide Puzzle</h1>
    <p>
      A simple component for creating a puzzlize image
      <br>
      <a href="https://github.com/johnnywang1994/vue-slide-puzzle" target="_blank">vue-slide-puzzle documentation</a>.
    </p>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Vue Core Docs</a></li>
      <li><a href="https://github.com/johnnywang1994/slide-puzzle" target="_blank" rel="noopener">Live Demo Source Code(Github)</a></li>
    </ul>

    <!-- Footer -->
    <footer>
      Copyright &copy; 2020-present, Johnny Wang
    </footer>
  </div>
</template>

<script>
import { VueSlidePuzzle } from 'vue-slide-puzzle'
import 'vue-slide-puzzle/dist/VueSlidePuzzle.css';
import ImageUpload from './components/imageUpload'

export default {
  name: 'App',
  mixins: [ImageUpload],
  components: {
    VueSlidePuzzle,
  },
  data() {
    return {
      uploadSetting: {
        number: 1,
        size: 10485760, // 10mb
      },
      hash: 1, // hash to trigger puzzle reload
      count: 0,
    };
  },
  computed: {
    imageSrc() {
      if (this.files[0]) {
        return this.files[0].src;
      }
      return `https://vuejs.org/images/logo.png`;
    },
  },
  methods: {
    resetPuzzle() {
      this.hash = Math.random();
      this.count = 0;
    },
    onUserMovePuzzle() {
      this.count++;
    },
    onFileUpload(e) {
      this.files = [];
      this.uploadFile(e);
      this.resetPuzzle();
    }
  },
};
</script>

<style lang="scss">
@mixin activeScale {
  cursor: pointer;
  transition: transform 0.2s, filter 0.2s;
  &:active {
    transform: scale(0.95);
    filter: brightness(0.5);
  }
}

@mixin noTouchOrSelect {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

@mixin btn_style {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 40px;
  font-weight: 700;
  border-radius: 10px;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;

  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }

  .puzzle-wrapper {
    width: 300px;
    height: 300px;
    margin: auto;
    .slide-puzzle {
      background: transparent;
      .card {
        border: 1px solid black;
        &.pin {
          background: #888 !important;
        }
      }
    }
  }

  .panel {
    margin: 8px 0;
    .upload-label {
      position: relative;
      color: #fff;
      border: 1px solid rgb(0, 123, 206);
      background: rgb(0, 153, 255);
      margin-right: 4px;
      @include btn_style;
      @include activeScale;
      @include noTouchOrSelect;
      > input {
        position: absolute;
        width: 0;
        height: 0;
        opacity: 0;
        cursor: pointer;
      }
    }
    .reset-btn {
      color: #fff;
      border: 1px solid rgb(0, 163, 128);
      background: rgb(10, 206, 163);
      @include btn_style;
      @include activeScale;
      @include noTouchOrSelect;
    }
  }

  footer {
    position: fixed;
    bottom: 0;
    width: 100%;
    color: #fff;
    padding: 4px 0;
    font-weight: 700;
    background: #333;
  }
}
</style>
