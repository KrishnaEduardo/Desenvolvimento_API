// Aqui está funcionando no localhost:5500

function handleCredentialResponse(response) {
  const data = jwt_decode(response.credential)
  NomeCompleto.textContent = "Olá, " + data.name
}
window.onload = function () {
  google.accounts.id.initialize({
    client_id: "645387318029-3seove7dm5if08cvpgtri9cr5dj4qkl9.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });
google.accounts.id.renderButton(
  document.getElementById("divbotao"), {
  theme: "outline",
  size: "large",
  type: "standard",
  locale: "pt-BR"
} 
);
}