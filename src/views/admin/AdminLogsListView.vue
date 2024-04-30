<script setup lang="ts">
import type { AdminLogsResponse } from '@/service';
import { ConstantPagination } from '@/service/enum';
import { GetAdminLogsList } from '@/service/manager';
import { operateType } from '@/service/operateLogsType';
import { formatDate } from '@/utils/dayjs';
import { message } from 'ant-design-vue';
import type { ColumnsType } from 'ant-design-vue/es/table';
import { AxiosError } from 'axios';
import { computed, onMounted, ref } from 'vue';

const adminLogsData = ref<AdminLogsResponse[]>([]);
const records = ref<number>(0);

const defaultPagination = computed(() => {
  return {
    total: records.value,
    current: ConstantPagination.DEFAULT_PAGE,
    pageSize: ConstantPagination.DEFAULT_LIMIT
  };
});

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
    title: 'type',
    dataIndex: 'type'
  },
  {
    title: 'previous',
    dataIndex: 'previous',
    ellipsis: true
  },
  {
    title: 'after',
    dataIndex: 'after',
    ellipsis: true
  },
  {
    title: 'atTime',
    dataIndex: 'atTime'
  },
  {
    title: 'cdt',
    dataIndex: 'cdt'
  },
  {
    title: 'udt',
    dataIndex: 'udt'
  }
]);

const getOperateType = (type: number) => operateType[type];

const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
  defaultPagination.value.current = pagination.current as number;
  defaultPagination.value.pageSize = pagination.pageSize as number;

  fetchData();
  //todo use api to sort and filter
};

const fetchData = async () => {
  try {
    const res = await GetAdminLogsList({
      page: defaultPagination.value.current as ConstantPagination.DEFAULT_PAGE,
      size: defaultPagination.value.pageSize as ConstantPagination.DEFAULT_LIMIT
    });
    if (res.status == 200) {
      if (res.data.result) {
        records.value = res.data.pagination.records;
        adminLogsData.value = res.data.result;
      }
    }
  } catch (error) {
    if (typeof error === 'string') {
      message.error('error' + error);
    } else if (error instanceof AxiosError) {
      const axiosError = error as AxiosError;
      const responseData = axiosError.response?.data as { message: string };
      message.error(responseData.message);
    }
  }
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <a-layout-content class="content">
    <h2 class="font-semibold text-2xl">admin logs list</h2>
    <a-table
      :columns="columns"
      :pagination="defaultPagination"
      :dataSource="adminLogsData"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex == 'cdt'">
          {{ formatDate(record.cdt) }}
        </template>
        <template v-if="column.dataIndex == 'udt'">
          {{ formatDate(record.udt) }}
        </template>
        <template v-if="column.dataIndex == 'type'"> {{ getOperateType(record.type) }} </template>
      </template>
    </a-table>
  </a-layout-content>
</template>

<style scoped></style>
@/types @/types/enum
