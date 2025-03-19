// Lưu tên người dùng
function saveName() {
    let name = document.getElementById("nameInput").value;
    localStorage.setItem("userName", name);
    document.getElementById("welcomeMessage").innerText = "Xin chào, " + name + "!";
}

// Thay đổi ảnh đại diện
function changeAvatar() {
    let file = document.getElementById("avatarInput").files[0];

    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            let imageUrl = e.target.result;
            document.getElementById("avatar").src = imageUrl;
            localStorage.setItem("avatar", imageUrl);
        };
        reader.readAsDataURL(file);
    }
}

// Hiển thị thông tin khi tải trang
window.onload = function() {
    let savedName = localStorage.getItem("userName");
    if (savedName) {
        document.getElementById("welcomeMessage").innerText = "Xin chào, " + savedName + "!";
    }

    let savedAvatar = localStorage.getItem("avatar");
    if (savedAvatar) {
        document.getElementById("avatar").src = savedAvatar;
    }

    displayNotes();
};

// Sổ ghi chú
function addNote() {
    let noteInput = document.getElementById("noteInput");
    let noteText = noteInput.value;

    if (noteText === "") return;

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(noteText);
    localStorage.setItem("notes", JSON.stringify(notes));

    noteInput.value = "";
    displayNotes();
}

function displayNotes() {
    let noteList = document.getElementById("noteList");
    noteList.innerHTML = "";

    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    notes.forEach((note, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${note} <button onclick="deleteNote(${index})">Xóa</button>`;
        noteList.appendChild(li);
    });
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}
