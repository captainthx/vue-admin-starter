<script setup lang="ts">
import type { HistoryLoginResponse } from '@/service';
import { HistoryLogin } from '@/service/account';
import { ConstantPagination } from '@/service/enum';
import { message } from 'ant-design-vue';
import { computed, onBeforeMount, ref } from 'vue';
import { formatDate } from '@/utils/dayjs';
import type { ColumnsType, TableProps } from 'ant-design-vue/es/table';

const defaultPagination = computed(() => {
  return {
    total: records.value,
    pageSize: ConstantPagination.DEFAULT_LIMIT,
    current: ConstantPagination.DEFAULT_PAGE
  };
});

const columns = ref<ColumnsType>([
  {
    title: 'id',
    dataIndex: 'id',
    sorter: true,
    align: 'center'
  },
  {
    title: 'uid',
    dataIndex: 'uid',
    align: 'center'
  },
  {
    title: 'device',
    dataIndex: 'device',
    filters: [
      {
        text: 'Unknown',
        value: 'Unknown'
      },
      {
        text: 'Windows',
        value: 'Windows'
      },
      {
        text: 'iPhone',
        value: 'iPhone'
      },
      {
        text: 'Android',
        value: 'Android'
      }
    ],
    align: 'center',
    onFilter: (value, record) => record.device.indexOf(value) === 0
  },
  {
    title: 'ipv4',
    dataIndex: 'ipv4',
    align: 'center'
  },
  {
    title: 'cdt',
    dataIndex: 'cdt',
    sorter: (a, b) => a.cdt - b.cdt,
    align: 'center'
  },
  {
    title: 'udt',
    dataIndex: 'udt',
    sorter: (a, b) => a.cdt - b.cdt,
    align: 'center'
  }
]);
const historyData = ref<HistoryLoginResponse[]>([]);
const records = ref<number>(0);

const fetchData = async () => {
  try {
    const res = await HistoryLogin({
      page: defaultPagination.value.current as ConstantPagination.DEFAULT_PAGE,
      size: defaultPagination.value.pageSize as ConstantPagination.DEFAULT_LIMIT
    });
    if (res.status == 200) {
      if (res.data.result) {
        historyData.value = res.data.result;

        records.value = res.data.pagination.records;
      }
    }
    if (res.status != 200) {
      message.error('load data error', res.status);
    }
  } catch (error) {
    console.log(error);
  }
};

const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
  defaultPagination.value.current = pagination.current as number;
  defaultPagination.value.pageSize = pagination.pageSize as number;
  fetchData();
  //todo use api to sort and filter
};

const selectTagColor = (tag: string) => {
  switch (tag) {
    case 'Unknown':
      return 'default';
    case 'Windows':
      return 'processing';
    case 'iPhone':
      return 'success';
    case 'Android':
      return 'warning';
    default:
      return 'default';
  }
};

onBeforeMount(() => {
  fetchData();
});
</script>

<template>
  <a-layout-content class="content">
    <h2>login logs</h2>

    <div style="display: flex; flex-flow: row-reverse">
      <a-button type="primary">add</a-button>
    </div>
    <a-table
      :dataSource="historyData"
      :columns="columns"
      :pagination="defaultPagination"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex == 'udt'">
          {{ formatDate(record.udt) }}
        </template>
        <template v-if="column.dataIndex == 'cdt'">
          {{ formatDate(record.cdt) }}
        </template>
        <template v-if="column.dataIndex == 'device'">
          <a-tag :color="selectTagColor(record.device)"> {{ record.device }}</a-tag>
        </template> </template
      >>
    </a-table>
  </a-layout-content>
</template>
@/types @/types/enum
