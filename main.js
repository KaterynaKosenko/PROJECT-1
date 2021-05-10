var notes = [];
var noteId = 0;
const json = localStorage.getItem("notes");
if (json != null) {
  notes = JSON.parse(json);
}
if (notes != null && notes.length > 0) {
  showNotes();
  noteId = notes[notes.length - 1].id + 1;
}

function saveNote() {
  const textInput = document.getElementById("text-input").value;
  const dateInput = document.getElementById("date-input").value;
  const timeInput = document.getElementById("time-input").value;

  if (textInput.length < 1) {
    alert("Note message must contain at least one letter");
    return;
  }

  if (dateInput.length != 10) {
    alert("Please, specify a valid date");
    return;
  }

  const note = {
    id: noteId++,
    text: textInput,
    date: dateInput,
    time: timeInput
  };

  notes.push(note);
  showNotes(true);


  const json = JSON.stringify(notes);
  localStorage.setItem("notes", json);
  clearNote();
}

function showNotes(opacity) {
  const container = document.getElementById("stickers-container");
  container.innerHTML = '';
  for (const note of notes) {
    container.innerHTML += `
        <div id="note`+ note.id + `" class="sticker m-1">
        <button type="button" class="close mt-4 mr-5 close-button" aria-label="Close" onclick="removeNote(this.parentNode.id); return false;">
        <span aria-hidden="true">&times;</span>
        </button>
          <span class="noteText">`+ note.text + `</span>
          <span class="noteDate">`+ note.date + `</span>
          <span class="noteTime">`+ note.time + `</span>
        </div>
        `;
  }

  if (opacity) {
    container.lastElementChild.classList.add("w3-animate-opacity")
  }

}

function clearNote() {
  document.getElementById('text-input').value = "";
  document.getElementById('date-input').value = "";
  document.getElementById('time-input').value = "";
}

function removeNote(noteId) {
  const num = noteId.slice(4);
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id == num) {
      notes.splice(i, 1);
      break;
    }
  }

  showNotes();
  const json = JSON.stringify(notes);
  localStorage.setItem("notes", json);
}