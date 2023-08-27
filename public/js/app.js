console.log(11111, "Hello!!!!");

const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = "loading...";
  fetch(`/weather?address=${location}`)
    .then((resp) => resp.json())
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        console.log(2222, data);
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
});
