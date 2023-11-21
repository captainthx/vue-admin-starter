import type { ColumnsType } from 'ant-design-vue/es/table'
import { ref } from 'vue'

export const columns = ref<ColumnsType>([
  {
    title: 'id',
    dataIndex: 'id'
  },
  {
    title: 'categoryId',
    dataIndex: 'category.id',
    customRender: (_, record) => record.category.id
  },
  {
    title: 'categoryName',
    dataIndex: 'category.categoryName',
    customRender: (_, record) => record.category.categoryName
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
