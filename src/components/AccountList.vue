<template>
  <div>
    <AccountItem
      v-for="account in accounts"
      :key="account.id"
      :account="account"
      @remove="remove(account.id)"
      @update="update"
    />
  </div>
</template>

<script setup lang="ts">
import { useAccountsStore, Account } from '../stores/accounts'
import AccountItem from './AccountItem.vue'

const store = useAccountsStore()
const accounts = store.accounts
const remove = (id: string) => store.remove(id)
const update = (account: Account) => store.update(account)
</script> 