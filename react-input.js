
async function fillReactInput(selector, value) {
  let el = await $(selector)[0];
  await setNativeValue(el, value);
  await el.dispatchEvent(new Event('input', {
    bubbles: true
  }));
  await el.dispatchEvent(new Event('blur'));
}

async function setNativeValue(element, value) {
  const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
  const prototype = Object.getPrototypeOf(element);
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;

  if (valueSetter && valueSetter !== prototypeValueSetter) {
    prototypeValueSetter.call(element, value);
  } else {
    valueSetter.call(element, value);
  }
}
