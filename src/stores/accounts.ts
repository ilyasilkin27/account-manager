import { defineStore } from 'pinia'

export type AccountType = 'LDAP' | 'Локальная'

export interface Account {
  id: string
  labels: { text: string }[]
  type: AccountType
  login: string
  password: string | null
  errors?: {
    labels?: boolean
    type?: boolean
    login?: boolean
    password?: boolean
  }
}

function parseLabels(input: string): { text: string }[] {
  return input
    .split(';')
    .map(l => l.trim())
    .filter(Boolean)
    .map(text => ({ text }))
}

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as Account[],
  }),
  actions: {
    load() {
      const raw = localStorage.getItem('accounts')
      if (raw) this.accounts = JSON.parse(raw)
    },
    save() {
      localStorage.setItem('accounts', JSON.stringify(this.accounts))
    },
    add() {
      this.accounts.push({
        id: crypto.randomUUID(),
        labels: [],
        type: 'LDAP',
        login: '',
        password: null,
        errors: {},
      })
      this.save()
    },
    remove(id: string) {
      this.accounts = this.accounts.filter(acc => acc.id !== id)
      this.save()
    },
    update(account: Account) {
      const idx = this.accounts.findIndex(a => a.id === account.id)
      if (idx !== -1) {
        this.accounts[idx] = { ...account }
        this.save()
      }
    },
    validate(account: Account, rawLabels: string): Account {
      const errors: Account['errors'] = {}
      if (rawLabels.length > 50) errors.labels = true
      if (!account.login || account.login.length > 100) errors.login = true
      if (account.type === 'Локальная') {
        if (!account.password || account.password.length > 100) errors.password = true
      }
      return { ...account, errors }
    },
    parseLabels,
  },
}) 