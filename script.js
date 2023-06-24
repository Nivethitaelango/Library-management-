// Simulated student and admin credentials
const studentCredentials = { username: "student", password: "student123", name: "Student" };
const adminCredentials = { username: "admin", password: "admin123" };

// Check if user is logged in
function checkLoggedIn() {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  if (isLoggedIn === "true") {
    const userType = sessionStorage.getItem("userType");
    if (userType === "student") {
      document.getElementById("loginContainer").style.display = "none";
      document.getElementById("adminContainer").style.display = "none";
      document.getElementById("studentContainer").style.display = "block";
      document.getElementById("studentName").textContent = studentCredentials.name;
    } else if (userType === "admin") {
      document.getElementById("loginContainer").style.display = "none";
      document.getElementById("studentContainer").style.display = "block";
      document.getElementById("adminContainer").style.display = "block";
    }
  } else {
    document.getElementById("loginContainer").style.display = "block";
    document.getElementById("studentContainer").style.display = "none";
    document.getElementById("adminContainer").style.display = "none";
  }
}

// Handle login form submission
document.getElementById("loginForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form from submitting

  const userType = document.querySelector("input[name='userType']:checked").value;
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const username = usernameInput.value;
  const password = passwordInput.value;

  if (userType === "student" && username === studentCredentials.username && password === studentCredentials.password) {
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("userType", "student");
    checkLoggedIn();
  } else if (userType === "admin" && username === adminCredentials.username && password === adminCredentials.password) {
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("userType", "admin");
    checkLoggedIn();
  } else {
    alert("Invalid credentials. \nfor student: username:student\n password:student123.\n\n for admin: username:admin\n password admin123");
  }

  usernameInput.value = "";
  passwordInput.value = "";
});

// Handle book addition form submission
document.getElementById("bookForm").addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent form from submitting

  const titleInput = document.getElementById("bookTitle");
  const authorInput = document.getElementById("authorName");
  const title = titleInput.value;
  const author = authorInput.value;

  const table = document.getElementById("bookTable").getElementsByTagName("tbody")[0];
  const row = table.insertRow(table.rows.length);
  const titleCell = row.insertCell(0);
  const authorCell = row.insertCell(1);
  const countCell = row.insertCell(2);
  const deleteCell = row.insertCell(3);

  titleCell.innerHTML = title;
  authorCell.innerHTML = author;
  countCell.innerHTML = "1";
  deleteCell.innerHTML = '<button class="deleteBtn">Delete</button>';

  titleInput.value = "";
  authorInput.value = "";

  updateTotalBooksCount();
});

// Handle book deletion
document.getElementById("bookTable").addEventListener("click", function(event) {
  if (event.target.classList.contains("deleteBtn")) {
    const row = event.target.parentNode.parentNode;
    row.parentNode.removeChild(row);
    updateTotalBooksCount();
  }
});

// Update total books count
function updateTotalBooksCount() {
  const totalBooks = document.querySelectorAll("#bookTable tbody tr").length;
  document.getElementById("totalBooks").textContent = totalBooks;
}

// Simulated data for all books
const allBooks = [
  { title: "Book 1", author: "Author 1" },
  { title: "Book 2", author: "Author 2" },
  { title: "Book 3", author: "Author 3" }
];

// Display all books for students
function displayAllBooks() {
  const table = document.getElementById("allBooksTable").getElementsByTagName("tbody")[0];

  for (let i = 0; i < allBooks.length; i++) {
    const row = table.insertRow(table.rows.length);
    const titleCell = row.insertCell(0);
    const authorCell = row.insertCell(1);

    titleCell.innerHTML = allBooks[i].title;
    authorCell.innerHTML = allBooks[i].author;
  }
}

checkLoggedIn();

if (sessionStorage.getItem("userType") === "student") {
  displayAllBooks();
}

  
  
