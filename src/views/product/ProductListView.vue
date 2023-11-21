<script setup lang="ts">
import type { ProductResponse } from '@/service'
import { ConstantPagination } from '@/service/enum'
import { GetProductList } from '@/service/product'
import type { ColumnsType } from 'ant-design-vue/es/table'
import { computed, onBeforeMount, ref } from 'vue'
import { formatDate } from '@/utils/dayjs'

const records = ref<number>(0)
const productData = ref<ProductResponse[]>([])
const defaultPagination = computed(() => {
  return {
    total: records.value,
    pageSize: ConstantPagination.DEFAULT_LIMIT,
    current: ConstantPagination.DEFAULT_PAGE
  }
})

const columns = ref<ColumnsType>([
  {
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: 'categoryId',
    dataIndex: 'category.id',
    customRender: ({ record }) => record.category.id
  },
  {
    title: 'categoryName',
    dataIndex: 'category.categoryName',
    customRender: ({ record }) => record.category.categoryName
  },
  {
    title: 'stockQuantity',
    dataIndex: 'stockQuantity'
  },
  {
    title: 'productName',
    dataIndex: 'productName'
  },
  {
    title: 'cost',
    dataIndex: 'cost'
  },
  {
    title: 'cdt',
    dataIndex: 'cdt'
  },
  {
    title: 'udt',
    dataIndex: 'udt'
  }
])

const fetchData = async () => {
  try {
    const res = await GetProductList({
      page: defaultPagination.value.current as ConstantPagination.DEFAULT_PAGE,
      size: defaultPagination.value.pageSize as ConstantPagination.DEFAULT_LIMIT
    })
    productData.value = res.data.result
    console.log(productData.value.map((item) => item.category.id))
  } catch (error) {
    console.log(error)
  }
}

onBeforeMount(() => {
  fetchData()
})
</script>

<template>
  <a-layout-content class="content">
    <h2>product list</h2>

    <a-table :columns="columns" :dataSource="productData" :pagination="defaultPagination"></a-table>

    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex == 'udt'">
        {{ formatDate(record.udt) }}
      </template>
      <template v-if="column.dataIndex == 'cdt'">
        {{ formatDate(record.cdt) }}
      </template>
    </template> </a-layout-content
  >>
</template>
