<script setup lang="ts">
import type { CreateProductRequest, ProductResponse } from '@/service'
import { ConstantPagination } from '@/service/enum'
import { CreateProduct, GetProductList } from '@/service/product'
import type { ColumnsType } from 'ant-design-vue/es/table'
import { computed, onBeforeMount, ref } from 'vue'
import { formatDate } from '@/utils/dayjs'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'
import { Form, message } from 'ant-design-vue'
import { AxiosError } from 'axios'

const records = ref<number>(0)
const productData = ref<ProductResponse[]>([])
const openModal = ref<boolean>(false)
const formRef = ref<FormInstance>()
const formState = ref<CreateProductRequest>({
  productName: '',
  price: 0,
  cost: 0,
  stockQuantity: 0,
  categoryId: 0
})
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
const rules: Record<string, Rule[]> = {
  productName: [
    {
      required: true,
      message: 'Please input your product name!',
      trigger: 'blur'
    },
    {
      min: 4,
      message: 'product name should be 4 ',
      trigger: 'blur'
    }
  ],
  price: [
    {
      required: true,
      message: 'Please input your price!',
      trigger: 'blur',
      type: 'number'
    }
  ],
  cost: [
    {
      required: true,
      message: 'Please input your cost!',
      trigger: 'blur',
      type: 'number'
    }
  ],
  stockQuantity: [
    {
      required: true,
      message: 'Please input your stockQuantity!',
      trigger: 'blur',
      type: 'number'
    }
  ],
  categoryId: [
    {
      required: true,
      message: 'Please input your categoryId!',
      trigger: 'blur',
      type: 'number'
    }
  ]
}

const fetchData = async () => {
  try {
    const res = await GetProductList({
      page: defaultPagination.value.current as ConstantPagination.DEFAULT_PAGE,
      size: defaultPagination.value.pageSize as ConstantPagination.DEFAULT_LIMIT
    })
    productData.value = res.data.result
  } catch (error) {
    console.log(error)
  }
}

const showModal = () => {
  openModal.value = true
}
const userForm = Form.useForm
const { validate } = userForm(formRef)
const handleCreateproduct = () => {
  validate()
    .then(async () => {
      try {
        const res = await CreateProduct({
          productName: formState.value.productName,
          price: formState.value.price,
          cost: formState.value.cost,
          stockQuantity: formState.value.stockQuantity,
          categoryId: formState.value.categoryId
        })
        if (res.status == 200) {
          message.success('create product success')
          openModal.value = false
          formRef.value?.resetFields()
          fetchData()
        }
      } catch (error) {
        if (typeof error === 'string') {
          message.error('error' + error)
        } else if (error instanceof AxiosError) {
          const axiosError = error as AxiosError
          const responseData = axiosError.response?.data as { message: string }
          message.error(responseData.message)
        }
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

onBeforeMount(() => {
  fetchData()
})
</script>

<template>
  <a-layout-content class="content">
    <div class="grid grid-cols-6">
      <a-button class="col-end-10 col-span-2" @click="showModal">add</a-button>
    </div>
    <h2 class="font-semibold text-2xl">product list</h2>
    <a-table :columns="columns" :dataSource="productData" :pagination="defaultPagination">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex == 'udt'">
          {{ formatDate(record.udt) }}
        </template>
        <template v-if="column.dataIndex == 'cdt'">
          {{ formatDate(record.cdt) }}
        </template>
      </template>
    </a-table>

    <a-modal v-model:open="openModal" title="CreateProduct" :footer="null">
      <a-form
        name="basic"
        :model="formState"
        ref="formRef"
        :rules="rules"
        :label-col="{ span: 10 }"
        :wrapper-col="{ span: 10 }"
        autocomplete="off"
        class="pt-2 mt-4"
        @submit="handleCreateproduct"
      >
        <a-form-item ref="productName" label="ProductName" name="productName" hasFeedback>
          <a-input v-model:value="formState.productName" />
        </a-form-item>

        <a-form-item label="Price" name="price" hasFeedback>
          <a-input-number :min="1" v-model:value="formState.price" />
        </a-form-item>
        <a-form-item label="Cost" name="cost" hasFeedback>
          <a-input-number :min="1" v-model:value="formState.cost" />
        </a-form-item>
        <a-form-item label="StockQuantity" name="stockQuantity" hasFeedback>
          <a-input-number :min="1" v-model:value="formState.stockQuantity" />
        </a-form-item>
        <a-form-item label="Category" name="categoryId" hasFeedback>
          <a-input-number :min="1" v-model:value="formState.categoryId" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 18 }">
          <a-button html-type="submit">Submit</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-layout-content>
</template>
