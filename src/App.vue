<template>
  <el-container style="min-height: 100vh;">
    <el-header style="display: flex; align-items: center; justify-content: space-between;">
      <h2>Управление учетными записями</h2>
      <el-button type="primary" @click="addAccount">Добавить +</el-button>
    </el-header>
    <el-main>
      <AccountList />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { useAccountsStore } from './stores/accounts'
import AccountList from './components/AccountList.vue'

const store = useAccountsStore()
store.load()
const addAccount = () => store.add()
</script> 