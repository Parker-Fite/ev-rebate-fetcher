async function getRebates() {
  const res = await fetch('http://localhost:3000/get-incentives', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  });
  const data = await res.json();
  document.getElementById('output').textContent = JSON.stringify(data, null, 2);
}
