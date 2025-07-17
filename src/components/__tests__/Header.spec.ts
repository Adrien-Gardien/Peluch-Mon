import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Header from '../Header.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

describe('Header', () => {
  it('tu peux être monté stpppppp', () => {
    const pinia = createPinia()
    const router = createRouter({
      history: createWebHistory(),
      routes: [{ path: '/', component: { template: '<div></div>' } }],
    })
    const wrapper = mount(Header, {
      global: {
        plugins: [pinia, router],
        stubs: ['router-link'],
      },
    })
    expect(wrapper.exists()).toBe(true)
  })
}) 