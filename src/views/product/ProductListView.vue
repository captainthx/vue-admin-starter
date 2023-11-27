<script setup lang="ts">
import type { Category, CreateProductRequest, ProductResponse, UpdProductRequest } from '@/service'
import { ConstantPagination } from '@/service/enum'
import { CreateProduct, DeleteProduct, GetProductList, UpdateProduct } from '@/service/product'
import type { ColumnsType, TableProps } from 'ant-design-vue/es/table'
import { computed, createVNode, onBeforeMount, ref } from 'vue'
import { formatDate } from '@/utils/dayjs'
import type { FormInstance, Rule } from 'ant-design-vue/es/form'
import { Form, message, Modal, type UploadProps } from 'ant-design-vue'
import { AxiosError } from 'axios'
import { GetCategoryList } from '@/service/category'
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  LoadingOutlined,
  PlusOutlined
} from '@ant-design/icons-vue'
import { UpLoadImage } from '@/service/file'

const records = ref<number>(0)
const productData = ref<ProductResponse[]>([])
const categoryData = ref<Category[]>([])
const openModal = ref<boolean>(false)
const formRef = ref<FormInstance>()
let modalType: 'add' | 'edit' = 'add'
const fileList = ref<UploadProps['fileList']>([])
const imagUrl = ref<string>('')
const imageName = ref<string>('')
const loading = ref<boolean>(false)
const fileUrl = import.meta.env.VITE_BASE_API + '/v1/image/'
const fromCreateProdcut = ref<CreateProductRequest>({
  id: 0,
  productName: '',
  productImage: '',
  price: 0,
  cost: 0,
  stockQuantity: 0,
  categoryId: 1
})
const formUpdProduct = ref<UpdProductRequest>({
  productId: 0,
  price: 0,
  cost: 0,
  stockQuantity: 0
})
const formCategory = ref<Category>({
  id: 1,
  categoryName: ''
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
    dataIndex: 'id',
    align: 'center'
  },
  {
    title: 'image',
    dataIndex: 'image',
    align: 'center',
    width: 100
  },
  {
    title: 'categoryName',
    dataIndex: 'category.categoryName',
    customRender: ({ record }) => record.category.categoryName,
    align: 'center'
  },
  {
    title: 'stockQuantity',
    dataIndex: 'stockQuantity',
    align: 'center'
  },
  {
    title: 'productName',
    dataIndex: 'productName',
    align: 'center'
  },
  {
    title: 'cost',
    dataIndex: 'cost',
    align: 'center'
  },
  {
    title: 'price',
    dataIndex: 'price',
    align: 'center'
  },
  {
    title: 'cdt',
    dataIndex: 'cdt',
    align: 'center'
  },
  {
    title: 'udt',
    dataIndex: 'udt',
    align: 'center'
  },
  {
    title: 'operate',
    dataIndex: 'operate',
    align: 'center'
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
    },
    {
      min: 1,
      message: 'price should more than 1 ',
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
    },
    {
      min: 1,
      message: 'cost should more than 1 ',
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
    },
    {
      min: 1,
      message: 'stock quantity should more than 1 ',
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

const fetchData = async (categoryId?: number) => {
  try {
    const res = await GetProductList({
      categoryId: categoryId,
      page: defaultPagination.value.current as ConstantPagination.DEFAULT_PAGE,
      size: defaultPagination.value.pageSize as ConstantPagination.DEFAULT_LIMIT
    })
    if (res.status == 200) {
      if (res.data.result) {
        productData.value = res.data.result
        records.value = res.data.pagination.records
      }
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
}
const fetchCategory = async () => {
  try {
    const res = await GetCategoryList({
      page: defaultPagination.value.current as ConstantPagination.DEFAULT_PAGE,
      size: defaultPagination.value.pageSize as ConstantPagination.DEFAULT_LIMIT
    })
    if (res.status == 200) {
      if (res.data) {
        categoryData.value = res.data
      }
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
}
const showModal = () => {
  modalType = 'add'
  openModal.value = true
  formRef.value?.resetFields()
}

const showEditModal = (record: ProductResponse) => {
  modalType = 'edit'
  openModal.value = true
  fromCreateProdcut.value = {
    id: record.id,
    productName: record.productName,
    productImage: record.productImage,
    price: record.price,
    cost: record.cost,
    stockQuantity: record.stockQuantity,
    categoryId: record.category.id
  }
  imagUrl.value = getImage(record.productImage)
}
const userForm = Form.useForm
const { validate } = userForm(formRef)
const handleCreateProduct = () => {
  validate()
    .then(async () => {
      try {
        const res = await CreateProduct({
          productName: fromCreateProdcut.value.productName,
          productImage: imageName.value,
          price: fromCreateProdcut.value.price,
          cost: fromCreateProdcut.value.cost,
          stockQuantity: fromCreateProdcut.value.stockQuantity,
          categoryId: fromCreateProdcut.value.categoryId
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
const handleUpdateProduct = async () => {
  console.log(formUpdProduct.value)
  const resutl = fromCreateProdcut.value

  validate().then(async () => {
    try {
      const res = await UpdateProduct({
        productId: resutl.id,
        price: resutl?.price,
        cost: resutl?.cost,
        stockQuantity: resutl?.stockQuantity
      })
      if (res.status == 200) {
        message.success('update product success')
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
}

const handleSubmit = () => {
  if (modalType == 'add') {
    handleCreateProduct()
  } else if (modalType == 'edit') {
    handleUpdateProduct()
  }
}
const showDeleteConfirm = (id: number) => {
  Modal.confirm({
    title: 'delete product?',
    icon: createVNode(ExclamationCircleOutlined),
    content: 'Are you sure delete this product?',
    okText: 'Yes',
    okType: 'danger',
    cancelText: 'No',
    onOk() {
      handleDeleteProduct(id)
    }
  })
}

const handleDeleteProduct = async (id: number) => {
  try {
    const res = await DeleteProduct({
      productId: id
    })
    if (res.status == 200) {
      message.success('delete product success')
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
}

const handleSearchByCategory = (id: number) => {
  fetchData(id)
}
const beforeUpload = (file: File) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!')
  }
  return isJpgOrPng && isLt2M
}
const upload = async (file: File) => {
  const formData = new FormData()
  formData.append('file', file.file)
  loading.value = true
  try {
    const res = await UpLoadImage(formData)
    if (res.status == 200) {
      if (fileList.value) {
        fileList.value.push({
          uid: '-1',
          name: res.data.imageName,
          status: 'done',
          url: fileUrl + res.data.urlPath
        })
      }
      imagUrl.value = getImage(res.data.imageName)
      imageName.value = res.data.imageName
      loading.value = false
    }
  } catch (error) {
    console.log('upload error', error)
    message.error('upload error')
  }
}
const getImage = (name: string) => {
  return fileUrl + name
}

const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
  defaultPagination.value.current = pagination.current as number
  defaultPagination.value.pageSize = pagination.pageSize as number

  fetchData()
  //todo use api to sort and filter
}
onBeforeMount(() => {
  fetchData()
  fetchCategory()
})
</script>

<template>
  <a-layout-content class="content">
    <h2 class="font-semibold text-2xl">product list</h2>
    <div class="grid grid-cols-3">
      <div class="col-end-1 mb-1 w-44">
        <a-select v-model:value="formCategory.id" allowClear placeholder="search by category ">
          <a-select-option class="w-42" v-for="item in categoryData" :key="item" :value="item.id">{{
            item.categoryName
          }}</a-select-option>
        </a-select>
      </div>
      <a-button
        type="primary"
        class="w-20 bg-blue-400 text-white"
        @click="handleSearchByCategory(formCategory.id)"
        >search</a-button
      >
      <div class="col-end-7 mb-1 p-1">
        <a-button @click="showModal">add</a-button>
      </div>
    </div>
    <a-table
      :columns="columns"
      :dataSource="productData"
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
        <template v-if="column.dataIndex == 'operate'">
          <EditOutlined @click="showEditModal(record)" class="pr-2" />
          <DeleteOutlined @click="showDeleteConfirm(record.id)" />
        </template>
        <template v-if="column.dataIndex == 'image'">
          <a-image :src="getImage(record.productImage)" :width="100" />
        </template>
      </template>
    </a-table>

    <a-modal v-model:open="openModal" :title="modalType + 'Product'" :footer="null">
      <a-form
        name="basic"
        :model="fromCreateProdcut"
        ref="formRef"
        :rules="rules"
        :label-col="{ span: 10 }"
        :wrapper-col="{ span: 10 }"
        autocomplete="off"
        class="pt-2 mt-4"
        @submit="handleSubmit"
      >
        <a-form-item label="image">
          <a-upload
            name="avatar"
            v-model:file-list="fileList"
            :showUploadList="false"
            list-type="picture-card"
            :beforeUpload="beforeUpload"
            :customRequest="upload"
            class="avatar-uploader"
          >
            <img v-if="imagUrl" :src="fromCreateProdcut.productImage" alt="avatar" />
            <div v-else>
              <loading-outlined v-if="loading"></loading-outlined>
              <plus-outlined v-else></plus-outlined>
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
        </a-form-item>
        <a-form-item v-if="modalType == 'add'" label="ProductName" name="productName" hasFeedback>
          <a-input v-model:value="fromCreateProdcut.productName" />
        </a-form-item>

        <a-form-item label="Price" name="price" hasFeedback>
          <a-input-number v-model:value="fromCreateProdcut.price" />
        </a-form-item>
        <a-form-item label="Cost" name="cost" hasFeedback>
          <a-input-number v-model:value="fromCreateProdcut.cost" />
        </a-form-item>
        <a-form-item label="StockQuantity" name="stockQuantity" hasFeedback>
          <a-input-number v-model:value="fromCreateProdcut.stockQuantity" />
        </a-form-item>

        <a-form-item v-if="modalType == 'add'" label="Category" name="categoryId" hasFeedback>
          <a-select class="select" v-model:value="fromCreateProdcut.categoryId">
            <a-select-option v-for="item in categoryData" :key="item" :value="item.id">
              {{ item.categoryName }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 20 }">
          <a-button html-type="submit">{{ modalType }}</a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </a-layout-content>
</template>
<style scoped>
.select {
  width: 70%;
}
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
