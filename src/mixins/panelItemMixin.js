export default {
  props: {
    limit: {
      type: Number,
      required: true,
    },
    dataList: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    beforeEnter(el) {
      el.classList.add('active');
    },
    enter(el) {
      let index = el.dataset.index % this.limit;
      let delay;
      if (index <= 5) {
        delay = index * 160;
      } else {
        delay = index * 140;
      }
      setTimeout(() => {
        el.classList.remove('active');
      }, delay);
    },
  },
};
