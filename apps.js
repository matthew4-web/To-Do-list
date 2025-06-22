function openModal() {
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('memberModal').style.display = 'block';
  }

  function closeModal() {
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('memberModal').style.display = 'none';
  }

  function addMember() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const number = document.getElementById('number').value;

    if (name && email && number) {
      const members = JSON.parse(localStorage.getItem('members') || '[]');
      members.push({ name, email, number });
      localStorage.setItem('members', JSON.stringify(members));
      closeModal();
      loadMembers();
    }
  }

  function loadMembers() {
    const memberList = document.getElementById('memberList');
    memberList.innerHTML = '';
    const members = JSON.parse(localStorage.getItem('members') || '[]');

    members.forEach((member, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${member.name}</td>
        <td>${member.email}</td>
        <td>${member.number}</td>
        <td>
          <button onclick="editMember(${index})">Edit</button>
          <button onclick="deleteMember(${index})">Delete</button>
        </td>
      `;
      memberList.appendChild(row);
    });
  }

  function deleteMember(index) {
    const members = JSON.parse(localStorage.getItem('members') || '[]');
    members.splice(index, 1);
    localStorage.setItem('members', JSON.stringify(members));
    loadMembers();
  }

  function editMember(index) {
    const members = JSON.parse(localStorage.getItem('members') || '[]');
    const member = members[index];
    const name = prompt("Edit Name", member.name);
    const email = prompt("Edit Email", member.email);
    const number = prompt("Edit Number", member.number);

    if (name && email && number) {
      members[index] = { name, email, number };
      localStorage.setItem('members', JSON.stringify(members));
      loadMembers();
    }
  }

  document.addEventListener("DOMContentLoaded", loadMembers);

     // Simulate user object for demonstration
    if (!localStorage.getItem("user")) {
      localStorage.setItem("user", JSON.stringify({ name: "John Doe" }));
    }

    const user = JSON.parse(localStorage.getItem("user"));
    document.getElementById("username-display").textContent = user?.name || "User";

    function addMember() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const number = document.getElementById("number").value;

  if (name && email && number) {
    const table = document.getElementById("memberList");
    const row = table.insertRow();
    row.innerHTML = `
      <td>${name}</td>
      <td>${email}</td>
      <td>${number}</td>
      <td>
        <button onclick="editMember(this)">Edit</button>
        <button onclick="deleteMember(this)">Delete</button>
      </td>
    `;

    // Clear the form
    document.getElementById("name").value = '';
    document.getElementById("email").value = '';
    document.getElementById("number").value = '';

    closeModal();
  } else {
    alert("Please fill in all fields.");
  }
}

function deleteMember(btn) {
  btn.closest('tr').remove();
}

function editMember(btn) {
  const row = btn.closest('tr');
  const cells = row.getElementsByTagName('td');

  // Populate modal with existing values
  document.getElementById("name").value = cells[0].textContent;
  document.getElementById("email").value = cells[1].textContent;
  document.getElementById("number").value = cells[2].textContent;

  // Remove the row temporarily
  row.remove();

  openModal();
}
