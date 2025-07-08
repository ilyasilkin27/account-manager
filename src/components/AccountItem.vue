<template>
  <el-card style="margin-bottom: 16px;">
    <el-form>
      <el-form-item
        label="Метка"
        :error="account.errors?.labels ? 'Максимум 50 символов' : ''"
      >
        <el-input
          v-model="rawLabels"
          @blur="onBlur"
          placeholder="Введите метки через ;"
        />
        <div class="hint">Метки через ;</div>
      </el-form-item>
      <el-form-item label="Тип записи">
        <el-select v-model="account.type" @change="onTypeChange">
          <el-option label="LDAP" value="LDAP" />
          <el-option label="Локальная" value="Локальная" />
        </el-select>
      </el-form-item>
      <el-form-item
        label="Логин"
        :error="account.errors?.login ? 'Обязательное поле, максимум 100 символов' : ''"
      >
        <el-input v-model="account.login" @blur="onBlur" />
      </el-form-item>
      <el-form-item
        v-if="account.type === 'Локальная'"
        label="Пароль"
        :error="account.errors?.password ? 'Обязательное поле, максимум 100 символов' : ''"
      >
        <el-input
          v-model="account.password"
          type="password"
          @blur="onBlur"
        />
      </el-form-item>
      <el-button type="danger" @click="remove">Удалить</el-button>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAccountsStore, Account } from '../stores/accounts'

const props = defineProps<{ account: Account }>()
const emit = defineEmits(['remove', 'update'])

const store = useAccountsStore()
const rawLabels = ref(props.account.labels.map(l => l.text).join(';'))

const onBlur = () => {
  const validated = store.validate(
    { ...props.account, labels: store.parseLabels(rawLabels.value) },
    rawLabels.value
  )
  emit('update', validated)
}
const onTypeChange = (val: string) => {
  if (val === 'LDAP') {
    props.account.password = null
  }
  onBlur()
}
const remove = () => emit('remove')
</script>

<style scoped>
.hint {
  font-size: 12px;
  color: #888;
}
</style> 