export default {
  data() {
    return {
      files: [],
      uploadSetting: {
        number: 3,
        size: 2097152, //(bytes) 2mb
      },
    };
  },
  methods: {
    uploadFile(e) {
      const vm = this;
      const files = e.target.files;
      const { number, size } = vm.uploadSetting;
      // Number exceeed
      if (vm.files.length + files.length > number) {
        vm._resetFiles(e);
        vm.uploadNumberError();
        return;
      }
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // Size exceed
        if (file.size > size) {
          vm._resetFiles(e);
          vm.uploadSizeError();
          break;
        }
        vm._imageToDataUrl(file, function(imageUrl) {
          file.src = imageUrl;
          vm.files.push(file);
        });
      }
    },
    removeFile(index) {
      this.files.splice(index, 1);
    },
    uploadSizeError() {
      alert('File size too large！');
    },
    uploadNumberError() {
      alert('File number exceeded！');
    },
    _resetFiles(e) {
      e.target.value = ''; // Chrome
      e.target.type = ''; // IE
      e.target.type = 'file';
    },
    _imageToDataUrl(file, callback) {
      let reader = new FileReader();
      reader.onload = function(e) {
        callback(e.target.result);
      };
      reader.readAsDataURL(file);
    },
  }
};