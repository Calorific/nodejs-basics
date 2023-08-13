const list = document.querySelector('.js-notes')

list.addEventListener('click', async e => {
  const dataset = e.target.dataset

  if (dataset.type === 'remove') {
    remove(dataset.id).then(() => e.target.closest('li').remove())
  }

  else if (dataset.type === 'showEdit') {
    showEdit(e.target)
  }

  else if (dataset.type === 'edit') {
    const newTitle = await edit(dataset.id)
    if (newTitle)
      e.target.closest('li').querySelector(`[data-textId="${e.target.dataset.id}"]`).innerText = newTitle
    closeEdit(e.target)
  }

  else if (dataset.type === 'closeEdit') {
    closeEdit(e.target)
  }
})

function showEdit(target) {
  const li = target.closest('li')
  li.querySelector('.js-note').style.display = 'none'
  li.querySelector('.js-edit').style.display = 'flex'
}

function closeEdit(target) {
  const li = target.closest('li')
  li.querySelector(`input`).value = li.querySelector(`[data-textId="${target.dataset.id}"]`).textContent
  li.querySelector('.js-note').style.display = 'flex'
  li.querySelector('.js-edit').style.display = 'none'
}

async function remove(id) {
  await fetch(`/${id}`, { method: 'DELETE' })
}

async function edit(id) {
  const newTitle = list.querySelector(`input[name="edit-${id}"]`).value
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