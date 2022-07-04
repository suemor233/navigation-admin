import { NIcon } from 'naive-ui'
import type { Component } from 'vue'
import { h } from 'vue'

import { Icon } from '@vicons/utils'

export default function (icon: Component) {
  return () =>
    h(NIcon, null, {
      default: () =>
        h(
          <Icon color="green" size="20">
            <icon />
          </Icon>,
        ),
    })
}
