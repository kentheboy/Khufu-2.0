<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  level: {
    type: Number,
    default: 0
  }
});

const { t } = useI18n();
const expandedItems = ref([]);

const toggleItem = (item, event) => {
  // Stop event propagation to prevent parent menu items from toggling
  if (event) {
    event.stopPropagation();
  }
  
  // Toggle the expanded state
  const index = expandedItems.value.indexOf(item.value || item.label);
  if (index === -1) {
    expandedItems.value.push(item.value || item.label);
  } else {
    expandedItems.value.splice(index, 1);
  }
  
  // Execute the command if it exists
  if (item.command && !item.children) {
    item.command();
  }
};

const isExpanded = (item) => {
  return expandedItems.value.includes(item.value || item.label);
};
</script>

<template>
  <ul class="tree-menu" :class="`level-${level}`">
    <li v-for="(item, index) in items" :key="`${level}-${index}`" class="tree-item">
      <div 
        class="tree-item-content" 
        :class="{ 'has-children': item.children, 'expanded': isExpanded(item) }"
        @click="toggleItem(item, $event)"
      >
        <div class="item-icon">
          <UIcon v-if="item.icon" :name="item.icon" class="menu-icon" />
        </div>
        <span class="item-label">{{ item.label }}</span>
        <div v-if="item.children" class="item-chevron">
          <UIcon name="i-heroicons-chevron-down" class="chevron-icon" />
        </div>
      </div>
      
      <transition 
        name="submenu-animation"
        @before-enter="el => { el._parent = el.parentNode; el._height = '0px'; }"
        @enter="el => { el._height = el.scrollHeight + 'px'; requestAnimationFrame(() => { el.style.height = el._height }); }"
        @after-enter="el => { el.style.height = 'auto'; }"
        @before-leave="el => { el.style.height = el.scrollHeight + 'px'; requestAnimationFrame(() => {}); }"
        @leave="el => { el.style.height = '0px'; }"
      >
        <div v-if="item.children && isExpanded(item)" class="submenu-container">
          <TreeMenu :items="item.children" :level="level + 1" />
        </div>
      </transition>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.tree-menu {
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
}

.tree-item {
  width: 100%;
  margin-bottom: 2px;
}

.tree-item-content {
  display: flex;
  align-items: center;
  padding: 10px 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
  
  &.has-children {
    justify-content: space-between;
  }
}

.item-icon {
  margin-right: 8px;
  display: flex;
  align-items: center;
}

.item-label {
  flex: 1;
}

.item-chevron {
  display: flex;
  align-items: center;
  
  .chevron-icon {
    transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  }
}

.expanded .item-chevron .chevron-icon {
  transform: rotate(180deg);
}

.submenu-container {
  overflow: hidden;
  height: 0;
  transform-origin: top;
  will-change: height, opacity, transform;

  .tree-menu {
    padding-left: 16px;
    margin-top: 4px;
  }
}

.submenu-animation-enter-active,
.submenu-animation-leave-active {
  transition: height 0.5s cubic-bezier(0.19, 1, 0.22, 1),
              opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1),
              transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  transform: translateY(0);
  opacity: 1;
}

.submenu-animation-enter-from {
  opacity: 0;
  transform: translateY(-50px);
}

.submenu-animation-leave-to {
  opacity: 0;
  transform: translateY(-50px);
}

.level-0 > .tree-item > .tree-item-content {
  font-weight: 500;
}
</style>
