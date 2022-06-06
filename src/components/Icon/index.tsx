import { Icon } from "@vicons/utils";
import { NIcon } from "naive-ui";
import { Component, h } from "vue";

export function renderIcon(icon: Component) {
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