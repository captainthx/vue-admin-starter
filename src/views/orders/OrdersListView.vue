<script setup lang="ts">
import type { OrdersResponse } from '@/service'
import { ConstantPagination } from '@/service/enum'
import { Getorders } from '@/service/orders'
import { formatDate } from '@/utils/dayjs'
import { message, type TableProps } from 'ant-design-vue'
import type { ColumnsType } from 'ant-design-vue/es/table'
import { computed, ref, onBeforeMount } from 'vue'

const records = ref<number>(0)
const ordersData = ref<OrdersResponse[]>([])

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
    title: 'uid',
    dataIndex: 'uid'
  },
  {
    title: 'productId',
    dataIndex: 'productId'
  },
  {
    title: 'ordersId',
    dataIndex: 'ordersId'
  },

  {
    title: 'amount',
    dataIndex: 'amount'
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
    const res = await Getorders({
      page: defaultPagination.value.current as ConstantPagination.DEFAULT_PAGE,
      size: defaultPagination.value.pageSize as ConstantPagination.DEFAULT_LIMIT
    })
    if (res.status == 200) {
      if (res.data.result) {
        ordersData.value = res.data.result
        records.value = res.data.pagination.records
      }
    }
    if (res.status != 200) {
      message.error('load data error', res.status)
    }
  } catch (error) {
    message.error('Failed to fetch data')
  }
}

const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
  defaultPagination.value.current = pagination.current as number
  defaultPagination.value.pageSize = pagination.pageSize as number
  fetchData()
  //todo use api to sort and filter
}

onBeforeMount(() => {
  fetchData()
})
</script>

<template>
  <a-layout-content class="content">
    <h2 class="font-semibold text-2xl">orders list</h2>
    <a-table
      :columns="columns"
      :dataSource="ordersData"
      :pagination="defaultPagination"
      @Change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex == 'udt'">
          {{ formatDate(record.udt) }}
        </template>
        <template v-if="column.dataIndex == 'cdt'">
          {{ formatDate(record.cdt) }}
        </template>
      </template>
    </a-table>
  </a-layout-content>
</template>

<style scoped></style>
