document.addEventListener('click', async e => {
  const dataset = e.target.dataset

  if (dataset.type === 'remove') {
    remove(dataset.id).then(() => e.target.closest('li').remove())
  }

  else if (dataset.type === 'edit') {
    const newTitle = await edit(dataset.id)
    if (newTitle)
      e.target.closest('li').querySelector('span').innerText = newTitle
  }
})

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' })
}

async function edit(id) {
  const newTitle = prompt('Введите новое название')
  if (!newTitle) return ''

  await fetch(`/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title: newTitle })
  })
  return newTitle
}