# AlmostVanillaJS

**AlmostVanillaJS** is a tiny collection of utilities for modern, framework-free web development keeping your apps lightweight, declarative, and ergonomic without reaching for a full framework.

Current tools:

* **MountUnmount.js**: lifecycle hooks for DOM elements

More utilities may come!

---

# MountUnmount.js

Add **lifecycle hooks** to any DOM element, similar to framework `mounted()` / `destroyed()` hooks.

This module:

- Fires `mount` on every existing element
- Fires `mount` on newly-added elements
- Fires `unmount` before elements are removed

Supports:

* `onmount=""` / `onunmount=""` attributes
* `element.onmount = fn`
* Listening to CustomEvents (`mount` / `unmount`)

---

## Usage

### Start the lifecycle observer

```js
import {startMountUnmount,stopMountUnmount} from 'https://cdn.jsdelivr.net/gh/acitd/AlmostVanillaJS/src/MountUnmount.js';
startMountUnmount();
```

---

### Add hooks with attributes

```html
<div
  onmount="console.log('mounted', this)"
  onunmount="console.log('unmounted', this)"
>Hello World</div>
```

---

### Or assign functions in JS

```js
const el=document.createElement('div');
el.onmount=function(){
	console.log('mounted', this);
};
el.onunmount=function(){
	console.log('unmounted', this);
};
document.body.appendChild(el);

```

---

### Or listen for events

```js
document.addEventListener('mount', e => {
  console.log('Mounted via event:', e.detail.element);
});

document.addEventListener('unmount', e => {
  console.log('Unmounted via event:', e.detail.element);
});
```
---

## Stopping the system

```js
stopMountUnmount();
```

---

# Why?

Frameworks give you lifecycle & visibility tools. the platform does not.  
AlmostVanillaJS brings **just enough magic** without taking control of your app.

---

# License
Author: Alex Costantino (acitd.com)  
MIT - do whatever, just don’t remove attribution.
