<template>
  <div v-if="shouldShowPagination">
    <div class="join">
      <button v-show="enabledPrevPageButton" @click="fetchPrevPage" class="join-item btn">«</button>

      <button
        v-for="button in paginationButtons"
        :key="button.page"
        :ref="'paginationButton' + button.page"
        type="button"
        class="join-item btn"
        :class="{'btn-disabled': button.active || button.disabled}"
        @click="changePage(button.page)"
      >
        {{ button.text }}
      </button>

      <button v-show="enabledNextPageButton" @click="fetchNextPage" class="join-item btn" >»</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    totalPages: {
      required: true,
    },
    currentPage: {
      required: true,
    },
  },
  emits: ['changePage'],
  data() {
    return {
      paginationButtons: [],
      blockChangePage: false,
    }
  },
  computed: {
    enabledNextPageButton() {
      return this.currentPage < this.totalPages
    },
    enabledPrevPageButton() {
      return this.currentPage > 1
    },
    shouldShowPagination() {
      return this.totalPages > 1
    },
  },
  watch: {
    totalPages() {
      this.definePaginationButtons()
    },
    currentPage() {
      this.blockChangePage = false
      this.definePaginationButtons()
    },
  },
  mounted() {
    this.definePaginationButtons()
  },
  methods: {
    fetchPrevPage() {
      if (this.enabledPrevPageButton) {
        this.changePage(this.currentPage - 1)
      }
    },
    fetchNextPage() {
      if (this.enabledNextPageButton) {
        this.changePage(this.currentPage + 1)
      }
    },
    changePage(page) {
      if (!this.blockChangePage && page !== this.currentPage) {
        this.blockChangePage = true;
        this.$emit('changePage', page)
      }
    },
    definePaginationButtons() {
      const totalPages = this.totalPages
      let startPage = this.currentPage - 2
      let endPage = this.currentPage + 2
      const buttons = []
      if (startPage <= 0) {
        endPage -= (startPage - 1)
        startPage = 1
      }
      if (endPage > totalPages) {
        endPage = totalPages
      }
      if (startPage > 1) {
        buttons.push({
          disabled: false,
          page: 1,
          text: '1',
        })
        buttons.push({
          disabled: true,
          page: 0,
          text: '...',
        })
      }
      for (let i = startPage; i <= endPage; i++) {
        const active = (i === this.currentPage)
        buttons.push({
          disabled: false,
          page: i,
          text: i,
          active: active,
        })
      }
      if (endPage < totalPages) {
        buttons.push({
          disabled: true,
          page: 0,
          text: '...',
        })
        buttons.push({
          disabled: false,
          page: totalPages,
          text: totalPages,
        })
      }
      this.paginationButtons = buttons
    },
  },
}
</script>